"use client";
import Loading from "@/app/myblog/[id]/loading";
import { MicrocmsData } from "@/domain/Blog";
import { useEffect, useRef, useState } from "react";
import EditorForm from "@/features/editor/components/editor-form";
import EditorTitle from "@/features/editor/components/editor-title";

interface Props {
  id: string;
}

export default function myblogView({ id }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [microcmsData, setMicrocmsData] = useState<MicrocmsData | null>(null);
  const markdownRef = useRef<string>("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/microcms/${id}`);
        const body = (await res.json()) as MicrocmsData;
        setMicrocmsData(body);
      } catch (error) {
        setMicrocmsData(null);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [id]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <EditorTitle initialTitle={microcmsData?.title} readOnly />
      <div className="flex-1 flex">
        <EditorForm
          initialMarkdownValue={microcmsData?.contentMarkdown}
          markdownRef={markdownRef}
          previewType="preview"
          hideToolbar={true}
        />
      </div>
    </div>
  );
}
