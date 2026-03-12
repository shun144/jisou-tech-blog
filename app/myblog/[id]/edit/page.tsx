"use client";

import Header from "@/components/header";
import { MicrocmsData } from "@/domain/Blog";
import EditorForm from "@/features/editor/components/editor-form";
import EditorTitle from "@/features/editor/components/editor-title";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Loading from "@/app/myblog/[id]/loading";

export default function page() {
  const [microcmsData, setMicrocmsData] = useState<MicrocmsData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const markdownRef = useRef<string>("");
  const titleRef = useRef<string>("");

  const params = useParams();
  const id = params.id as string | undefined;

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/microcms/${id}`);
        const body = (await res.json()) as MicrocmsData;
        setMicrocmsData(body);
        markdownRef.current = body.contentMarkdown ?? "";
        titleRef.current = body.title ?? "";
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

  const handleSavePublished = async () => {
    try {
      fetch(`/api/microcms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current,
          contentMarkdown: markdownRef.current,
        }),
      });
      toast.success("公開しました");
    } catch (error) {
      console.error(error);
      toast.error("公開に失敗しました");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    titleRef.current = event.currentTarget.value;
  };

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
            onChange={handleTitleChange}
            initialTitle={microcmsData?.title}
          />
          <div className="flex-1 flex">
            <EditorForm
              initialMarkdownValue={microcmsData?.contentMarkdown}
              markdownRef={markdownRef}
            />
          </div>
        </div>
      </main>
    </>
  );
}
