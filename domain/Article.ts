import { z } from "zod";

export interface MicroCmsArticle {
  id: string;
  title: string;
  eyecatch: {
    url: string;
  };
  content: string;
}

export interface MicroCmsContents {
  contents: MicroCmsArticle[];
  limit: number;
  offset: number;
  totalCount: number;
}

const QiitaDataSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    created_at: z.iso.datetime({ offset: true }),
  })
  .brand<"QiitaData">();

export type QiitaData = z.infer<typeof QiitaDataSchema>;
export const QiitaDataListSchema = z.array(QiitaDataSchema);
