import Header from "@/components/header";
import Preview from "@/features/editor/components/preview";
import { getMyblogDetailData } from "@/features/myblogs/queries/myblog-queries";

import Link from "next/link";
interface Props {
  params: Promise<{ id: string }>;
}

export default async function MyblogDetailPage({ params }: Props) {
  const { id } = await params;
  const myblogData = await getMyblogDetailData(id);

  return (
    <>
      <Header>
        <Link
          href={`/myblog/${id}/edit`}
          className="px-4 py-1.5 text-sm font-mono border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-zinc-100 transition-colors rounded-sm"
        >
          編集
        </Link>
      </Header>

      <main className="flex-1 max-w-7xl mx-auto py-6 w-full flex flex-col">
        <Preview myblogData={myblogData} />
      </main>
    </>
  );
}
