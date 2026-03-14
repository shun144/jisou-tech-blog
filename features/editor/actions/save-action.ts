"use server";
import { Myblog } from "@/features/myblogs/domain/myblog";
import { FirebaseRepository } from "@/features/myblogs/infrastructure/firebase-repository";
import { revalidateTag } from "next/cache";

const repo = new FirebaseRepository();

export async function savePublished(data: ReturnType<Myblog["toPlainObject"]>) {
  try {
    await repo.update(data);

    revalidateTag(`myblog-detail-${data.id}`, "max");

    return {
      success: true,
      message: "記事の公開に成功しました",
    };
  } catch (error) {
    return {
      success: false,
      message: "記事の公開に失敗しました",
    };
  }
}
