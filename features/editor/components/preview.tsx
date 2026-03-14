"use client";
import Loading from "@/components/loading";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import remarkBreaks from "remark-breaks";
import EditorTitle from "./editor-title";
import { useEffect, useRef, useState } from "react";
import { Myblog } from "@/features/myblogs/domain/myblog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor/nohighlight"), {
  ssr: false,
  loading: () => <Loading />,
});

interface Props {
  myblogData: ReturnType<Myblog["toPlainObject"]>;
}

const Preview = ({ myblogData }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(500);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setEditorHeight(height);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <EditorTitle initialTitle={myblogData.title} readOnly />
      <div className="flex-1" ref={containerRef} data-color-mode="light">
        <MDEditor
          value={myblogData.content}
          height={editorHeight}
          preview="preview"
          hideToolbar
          previewOptions={{
            remarkPlugins: [[remarkBreaks]],
          }}
          visibleDragbar={false}
        />
      </div>
    </div>
  );
};

export default Preview;
