import { z } from "zod";

export const MicrocmsDataSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    eyecatch: z
      .object({
        url: z.string(),
      })
      .optional()
      .nullable(),
    contentMarkdown: z.string().optional(),
    createdAt: z.iso.datetime({ offset: false }),
  })
  .brand<"MicrocmsData">();

export const MicrocmsContentsSchema = z.object({
  contents: z.array(MicrocmsDataSchema),
});

export type MicrocmsData = z.infer<typeof MicrocmsDataSchema>;
