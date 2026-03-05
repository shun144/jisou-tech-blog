"use client";
import { QiitaData } from "@/domain/Article";
import { memo, useEffect, useState } from "react";
import Card from "../Card";

interface Props {
  perPage?: number;
}

const Article = ({ perPage = 4 }: Props) => {
  const [qiitaDataList, setQiitaDataList] = useState<QiitaData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams({
          per_page: String(perPage),
        });

        const url = `/api/qiita?${params}`;

        const res = await fetch(url);
        const body = (await res.json()) as QiitaData[];
        setQiitaDataList(body);
      } catch (error) {
        console.error(error);
        setQiitaDataList([]);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  if (!isLoaded) {
    return <div>Loading中</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {qiitaDataList.map((x) => (
        <Card
          key={x.id}
          title={x.title}
          imageSrc={`https://picsum.photos/seed/${x.id}/800/450`}
          createdAt={x.created_at}
          href={`https://qiita.com/shun123/items/${x.id}`}
        />
      ))}
    </div>
  );
};

export default memo(Article);
