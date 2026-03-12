"use client";
import Loading from "@/app/myblog/[id]/loading";
import { useEditor } from "@/features/editor/hooks/use-editor";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { PreviewType } from "@uiw/react-md-editor/nohighlight";
import dynamic from "next/dynamic";
import { RefObject } from "react";
import remarkBreaks from "remark-breaks";

const MDEditor = dynamic(() => import("@uiw/react-md-editor/nohighlight"), {
  ssr: false,
  loading: () => <Loading />,
});

interface Props {
  initialMarkdownValue?: string;
  previewType?: PreviewType;
  hideToolbar?: boolean;
  markdownRef: RefObject<string>;
}

const EditorForm = ({
  initialMarkdownValue,
  previewType,
  hideToolbar = false,
  markdownRef,
}: Props) => {
  const { handlePaste, handleDrop, markdownValue, setMarkdownValue } =
    useEditor(markdownRef, initialMarkdownValue);

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
        preview={previewType}
        hideToolbar={hideToolbar}
        previewOptions={{
          remarkPlugins: [[remarkBreaks]],
        }}
        visibleDragbar={false}
      />
    </div>
  );
};

export default EditorForm;
