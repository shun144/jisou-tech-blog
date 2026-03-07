"use client";
import Card from "@/components/Card";
import { useBlogs } from "./useBlogs";

interface Props {
  limit?: number;
}

export default function Blogs({ limit }: Props) {
  const { isLoaded, microcmsDataList } = useBlogs(limit);

  if (!isLoaded) {
    return <div>Loading中</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {microcmsDataList.length > 0 ? (
        microcmsDataList.map((x) => (
          <Card
            key={x.id}
            title={x.title}
            imageSrc={x.eyecatch.url}
            createdAt={x.createdAt}
            href={`/blogs/${x.id}`}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-zinc-400">
          <svg
            className="w-10 h-10 mb-3 text-zinc-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm">表示できるブログはありません</p>
        </div>
      )}
    </div>
  );
}
