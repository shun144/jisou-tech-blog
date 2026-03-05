import { z } from "zod";

export const MicrocmsDataSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    eyecatch: z.object({
      url: z.string(),
    }),
    content: z.string(),
    createdAt: z.iso.datetime({ offset: false }),
  })
  .brand<"MicrocmsData">();

export const MicrocmsContentsSchema = z.object({
  contents: z.array(MicrocmsDataSchema),
});

export type MicrocmsData = z.infer<typeof MicrocmsDataSchema>;
