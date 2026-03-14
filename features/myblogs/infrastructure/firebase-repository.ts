import { adminDb } from "@/lib/firebase/admin";
import { type MyblogRepository } from "@/features/myblogs/domain/myblog-repository";
import { Myblog } from "@/features/myblogs/domain/myblog";

export class FirebaseRepository implements MyblogRepository {
  private COLLECTION_NAME = "myblog";

  async getAll() {
    try {
      const collectionRef = adminDb.collection(this.COLLECTION_NAME);
      const snapShot = await collectionRef.get();
      const myblogs: Myblog[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data();
        const myblog = Myblog.create({
          id: doc.id,
          title: data.title,
          content: data.content,
          thumbnail_url: data.thumbnail_url,
          created_at: data.created_at.toString(),
          updated_at: data.updated_at.toString(),
        });
        myblogs.push(myblog);
      });

      return myblogs;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string) {
    try {
      const docRef = adminDb.collection(this.COLLECTION_NAME).doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new Error(`id=${id}のブログデータは存在しません`);
      }

      const data = docSnap.data();

      if (!data) {
        throw new Error("データがありません");
      }

      const myblog = Myblog.create({
        id,
        title: data.title,
        content: data.content,
        thumbnail_url: data.thumbnail_url,
        created_at: data.created_at.toString(),
        updated_at: data.updated_at.toString(),
      });

      return myblog;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(data: ReturnType<Myblog["toPlainObject"]>) {
    const updateData = toDTO(data);

    const docRef = adminDb.collection(this.COLLECTION_NAME).doc(data.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      throw new Error(`id=${data.id}のブログデータは存在しません`);
    }
    try {
      await adminDb.runTransaction(async (t) => {
        t.update(docRef, updateData);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

function toDTO(data: ReturnType<Myblog["toPlainObject"]>) {
  return {
    title: data.title,
    content: data.content,
    thumbnail_url: data.thumbnailUrl,
  };
}
