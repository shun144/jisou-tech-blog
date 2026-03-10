"use client";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { memo } from "react";
import remarkBreaks from "remark-breaks";
import { useEditor } from "./useEditor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor/nohighlight"), {
  ssr: false,
  loading: () => <div>initializing...</div>,
});

const MarkdownEditor = () => {
  const {
    handlePaste,
    handleDrop,
    markdownValue,
    markdownRef,
    setMarkdownValue,
  } = useEditor();

  return (
    <div
      data-color-mode="light"
      onPaste={handlePaste}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full flex-1"
    >
      <MDEditor
        value={markdownValue}
        onChange={(value) => {
          markdownRef.current = value ?? "";
          setMarkdownValue(value);
        }}
        height={"100%"}
        previewOptions={{
          remarkPlugins: [[remarkBreaks]],
        }}
        visibleDragbar={false} // リサイズバーを非表示
      />
    </div>
  );
};

export default memo(MarkdownEditor);
