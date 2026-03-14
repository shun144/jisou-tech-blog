import { type Myblog } from "./myblog";

export interface MyblogRepository {
  getAll(): Promise<Myblog[]>;
  get(id: string): Promise<Myblog>;
  update(data: ReturnType<Myblog["toPlainObject"]>): void;
}
