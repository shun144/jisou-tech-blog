"use client";
import Loading from "@/components/loading";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import remarkBreaks from "remark-breaks";
import EditorTitle from "./editor-title";
import { type Myblog } from "@/features/myblogs/domain/myblog";
import Header from "@/components/header";
import { savePublished } from "@/features/editor/actions/save-action";
import { toast } from "sonner";
import { useEditor } from "@/features/editor/hooks/use-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor/nohighlight"), {
  ssr: false,
  loading: () => <Loading />,
});

interface Props {
  myblogData: ReturnType<Myblog["toPlainObject"]>;
}

const Editor = ({ myblogData }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(500);
  const titleRef = useRef(myblogData.title);

  const { handlePaste, handleDrop, markdownValue, setMarkdownValue } =
    useEditor(myblogData.content);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setEditorHeight(height);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSavePublished = async () => {
    const updateData = {
      ...myblogData,
      title: titleRef.current,
      content: markdownValue,
    };
    const { success, message } = await savePublished(updateData);
    if (success) {
      toast.success(message);
      return;
    }
    toast.error(message);
  };

  const handleChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      titleRef.current = event.target.value;
    },
    [],
  );

  const handleChangeContent = useCallback((value?: string) => {
    setMarkdownValue(value ?? "");
  }, []);

  return (
    <>
      <Header>
        <div className="flex gap-4">
          <button
            onClick={handleSavePublished}
            className="px-4 py-1.5 text-sm font-mono bg-emerald-600 hover:bg-emerald-500 text-white transition-colors rounded-sm cursor-pointer"
          >
            公開
          </button>
        </div>
      </Header>
      <main className="flex-1 max-w-7xl mx-auto py-6 w-full flex flex-col">
        <div className="flex-1 flex flex-col">
          <EditorTitle
            initialTitle={myblogData.title}
            onChange={handleChangeTitle}
          />
          <div
            className="flex-1"
            ref={containerRef}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            data-color-mode="light"
          >
            <MDEditor
              value={markdownValue}
              height={editorHeight}
              onChange={(value) => handleChangeContent(value)}
              previewOptions={{
                remarkPlugins: [[remarkBreaks]],
              }}
              visibleDragbar={false}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Editor;
