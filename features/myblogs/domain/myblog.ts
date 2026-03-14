import { z } from "zod";

export const MyblogParamsSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  thumbnail_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type MyblogParams = z.infer<typeof MyblogParamsSchema>;

export class Myblog {
  get id() {
    return this.props.id;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get thumbnailUrl() {
    return this.props.thumbnail_url;
  }
  get createdAt() {
    return this.props.created_at;
  }
  get updatedAt() {
    return this.props.updated_at;
  }

  private constructor(private props: MyblogParams) {
    this.validate(props);
  }

  static create(params: MyblogParams) {
    return new Myblog(params);
  }

  private validate(params: MyblogParams) {
    try {
      MyblogParamsSchema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(JSON.stringify(error.issues));
      }
      throw error;
    }
  }

  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      thumbnailUrl: this.thumbnailUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
