import Card from "@/features/card/components/card";
import { FirebaseRepository } from "@/features/myblogs/infrastructure/firebase-repository";
import { connection } from "next/server";

export default async function MyBlogs() {
  await connection();
  const repo = new FirebaseRepository();
  const myblogsData = await repo.getAll();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {myblogsData.map((x) => (
        <Card
          key={x.id}
          title={x.title}
          imageSrc={x.thumbnailUrl}
          createdAt={x.createdAt}
          href={`/myblog/${x.id}`}
        />
      ))}
    </div>
  );
}
