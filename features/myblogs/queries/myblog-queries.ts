import { FirebaseRepository } from "@/features/myblogs/infrastructure/firebase-repository";
import { cacheLife, cacheTag } from "next/cache";

export async function getMyblogDetailData(id: string) {
  "use cache";
  cacheTag(`myblog-detail-${id}`);
  cacheLife("hours");
  const repo = new FirebaseRepository();
  const data = await repo.get(id);
  return data.toPlainObject();
}
