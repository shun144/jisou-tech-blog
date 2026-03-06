import { QiitaData } from "@/domain/Article";
import { useEffect, useState } from "react";

export const useArticles = (perPage: number) => {
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

  return { isLoaded, qiitaDataList };
};
