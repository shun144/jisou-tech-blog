"use client";
import { storage } from "@/infrastructure/firebase/config";
import { validateUploadImage } from "@/utils/validate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useEditor = (
  markdownRef: RefObject<string>,
  initialMarkdownValue?: string,
) => {
  const [markdownValue, setMarkdownValue] = useState<string | undefined>(
    initialMarkdownValue,
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPosRef = useRef<number>(0);

  // テキストエリアのカーソル位置を常に追跡する
  useEffect(() => {
    let cleanup: (() => void) | null;

    // コンポーネントマウント後にMDエディタがマウントされるため通常のuseEffectでは
    // querySelectorでキャッチできない
    const observer = new MutationObserver(() => {
      const tx = document.querySelector<HTMLTextAreaElement>(
        ".w-md-editor-text-input",
      );
      if (tx) {
        textareaRef.current = tx;
        observer.disconnect();
        const handleSelectionChange = () =>
          (cursorPosRef.current = tx.selectionStart ?? 0);
        tx.addEventListener("keyup", handleSelectionChange);
        tx.addEventListener("click", handleSelectionChange);
        cleanup = () => {
          tx.removeEventListener("keyup", handleSelectionChange);
          tx.removeEventListener("click", handleSelectionChange);
        };
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const fileName = `image/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }, []);

  const insertImageWithOptimisticUpdate = useCallback(
    async (file: File) => {
      try {
        validateUploadImage(file);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        return;
      }

      const placeholderId = crypto.randomUUID();
      const placeholder = `![uploading...](uploading-${placeholderId})`;
      const pos = cursorPosRef.current;

      // プレースホルダー挿入
      setMarkdownValue((prev) => {
        const val = prev ?? "";
        const next = val.slice(0, pos) + placeholder + "\n" + val.slice(pos);
        markdownRef.current = next;
        return next;
      });

      const posWithPlaceholder = pos + placeholder.length + 1;

      requestAnimationFrame(() => {
        if (!textareaRef.current) return;
        textareaRef.current.setSelectionRange(
          posWithPlaceholder,
          posWithPlaceholder,
        );
        textareaRef.current.focus();
      });

      try {
        const url = await uploadImage(file);
        const imageMd = `![image](${url})`;
        const placeholderIndex = markdownRef.current.indexOf(placeholder);

        // アップロード成功時
        setMarkdownValue((prev) => {
          const val = prev ?? "";
          const next = val.replace(placeholder, imageMd);
          markdownRef.current = next;
          return next;
        });

        requestAnimationFrame(() => {
          if (!textareaRef.current) return;
          const diff = imageMd.length - placeholder.length;
          const replacePos =
            posWithPlaceholder > placeholderIndex
              ? posWithPlaceholder + diff
              : posWithPlaceholder;
          textareaRef.current.setSelectionRange(replacePos, replacePos);
          textareaRef.current.focus();
        });
      } catch {
        // アップロード失敗時
        setMarkdownValue((prev) => {
          const val = prev ?? "";
          const next = val.replace(placeholder, "");
          markdownRef.current = next;
          return next;
        });
      }
    },
    [uploadImage],
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent) => {
      const file = e.clipboardData?.files[0];
      if (!file) return;
      e.preventDefault();
      await insertImageWithOptimisticUpdate(file);
    },
    [insertImageWithOptimisticUpdate],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      const file = e.dataTransfer?.files[0];
      if (!file) return;
      e.preventDefault();
      await insertImageWithOptimisticUpdate(file);
    },
    [insertImageWithOptimisticUpdate],
  );

  return {
    handlePaste,
    handleDrop,
    markdownValue,
    markdownRef,
    setMarkdownValue,
  };
};
