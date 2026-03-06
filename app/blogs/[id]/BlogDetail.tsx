"use client";
import { MicrocmsData } from "@/domain/Blog";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id as string;

  const [microcmsData, setMicrocmsData] = useState<MicrocmsData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/microcms/${id}`);
        const body = (await res.json()) as MicrocmsData;
        setMicrocmsData(body);
      } catch (error) {
        console.error(error);
        setMicrocmsData(null);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [id]);

  if (!isLoaded && microcmsData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-base-content/30" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/40 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-base-content/40 hover:text-base-content transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          トップページに戻る
        </Link>

        {/* アイキャッチ */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <img
            src={microcmsData!.eyecatch.url}
            alt={microcmsData!.title}
            className="w-full h-100 object-cover"
          />
        </div>

        {/* メタ情報 */}
        <div className="flex items-center gap-2 text-base-content/40 mb-3">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time className="text-xs font-mono tracking-wide">
            {formatDate(microcmsData!.createdAt)}
          </time>
        </div>

        {/* タイトル */}
        <h1 className="text-2xl font-bold leading-snug text-base-content mb-8">
          {microcmsData!.title}
        </h1>

        <div className="divider" />

        {/* 本文 */}
        <div
          className="prose prose-neutral max-w-none
            prose-headings:font-bold prose-headings:text-base-content
            prose-p:text-base-content/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-sm
            prose-code:text-sm prose-code:bg-base-200 prose-code:px-1 prose-code:rounded
            prose-pre:bg-base-200 prose-pre:rounded-xl
            prose-blockquote:border-primary/40 prose-blockquote:text-base-content/60
          "
          dangerouslySetInnerHTML={{ __html: microcmsData!.content }}
        />
      </div>
    </div>
  );
}
