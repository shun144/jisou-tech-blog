"use client";
import { uploadImage } from "@/features/editor/actions/upload-image-action";
import { validateUploadImage } from "@/utils/validate";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useEditor = (initialMarkdownValue: string) => {
  const [markdownValue, setMarkdownValue] =
    useState<string>(initialMarkdownValue);
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
      setMarkdownValue(
        (prev) => prev.slice(0, pos) + placeholder + "\n" + prev.slice(pos),
      );

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

        let placeholderIndex = -1;
        // アップロード成功時
        setMarkdownValue((prev) => {
          placeholderIndex = prev.indexOf(placeholder);
          return prev.replace(placeholder, imageMd);
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
        setMarkdownValue((prev) => prev.replace(placeholder, ""));
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
    setMarkdownValue,
  };
};
