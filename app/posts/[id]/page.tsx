import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function page(props: Props) {
  const { id } = await props.params;

  return (
    <div>
      <h2>マイブログ詳細表示画面</h2>
      <Link href={`/posts/${id}/edit`}>編集</Link>
    </div>
  );
}
