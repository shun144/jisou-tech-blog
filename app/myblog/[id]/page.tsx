import Link from "next/link";
import Header from "@/components/header";
import MyblogView from "@/features/myblogs/components/myblog-view";
interface Props {
  params: { id: string };
}

export default async function page(props: Props) {
  const { id } = await props.params;

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
        <MyblogView id={id} />
      </main>
    </>
  );
}
