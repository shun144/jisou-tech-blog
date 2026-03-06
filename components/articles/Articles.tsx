"use client";
import { memo } from "react";
import Card from "../Card";
import { useArticles } from "./useArticles";
import { getArticleHref, getArticleImageSrc } from "@/utils/url";

interface Props {
  perPage?: number;
}

const Articles = ({ perPage = 4 }: Props) => {
  const { isLoaded, qiitaDataList } = useArticles(perPage);

  if (!isLoaded) {
    return <div>Loading中</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {qiitaDataList.length > 0 ? (
        qiitaDataList.map((x) => (
          <Card
            key={x.id}
            title={x.title}
            imageSrc={getArticleImageSrc(x.id)}
            createdAt={x.created_at}
            href={getArticleHref(x.id)}
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
          <p className="text-sm">表示できる記事はありません</p>
        </div>
      )}
    </div>
  );
};

export default memo(Articles);
