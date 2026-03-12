import { MicrocmsData } from "@/domain/Blog";
import { useEffect, useState } from "react";

export const useBlogs = (limit?: number) => {
  const [microcmsDataList, setMicrocmsDataList] = useState<MicrocmsData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const url = `/api/microcms${limit ? `?limit=${limit}` : ""}`;
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

  return { isLoaded, microcmsDataList };
};
