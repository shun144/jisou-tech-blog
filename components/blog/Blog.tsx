"use client";
import React, { useEffect, useState } from "react";
import { MicrocmsData } from "@/domain/Blog";
import Card from "../Card";

interface Props {
  limit?: number;
}

export default function Blog({ limit }: Props) {
  const [microcmsDataList, setMicrocmsDataList] = useState<MicrocmsData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const params = limit
          ? new URLSearchParams({
              limit: String(limit),
            })
          : "";

        const url = `/api/microcms?${params}`;

        const res = await fetch(url);
        const body = (await res.json()) as MicrocmsData[];
        setMicrocmsDataList(body);
      } catch (error) {
        console.error(error);
        setMicrocmsDataList([]);
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
      {microcmsDataList.map((x) => (
        <Card
          key={x.id}
          title={x.title}
          imageSrc={x.eyecatch.url}
          createdAt={x.createdAt}
          href={`/blogs/${x.id}`}
        />
      ))}
    </div>
  );
}
