"use client";
import { storage } from "@/lib/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";

export const useEditor = () => {
  const [markdownValue, setMarkdownValue] = useState<string | undefined>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPosRef = useRef<number>(0);
  const markdownRef = useRef<string>("");

  // テキストエリアのカーソル位置を常に追跡する
  useEffect(() => {
    let cleanup: (() => void) | null;

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
      if (!file.type.startsWith("image/")) return;
      const placeholderId = crypto.randomUUID();
      const placeholder = `![uploading...](uploading-${placeholderId})`;
      const pos = cursorPosRef.current;

      setMarkdownValue((prev) => {
        const val = prev ?? "";
        return val.slice(0, pos) + placeholder + "\n" + val.slice(pos);
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
        setMarkdownValue((prev) => (prev ?? "").replace(placeholder, imageMd));

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
        setMarkdownValue((prev) => (prev ?? "").replace(placeholder, ""));
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
