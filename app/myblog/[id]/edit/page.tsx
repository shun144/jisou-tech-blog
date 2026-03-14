import Editor from "@/features/editor/components/editor";

import { getMyblogDetailData } from "@/features/myblogs/queries/myblog-queries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const myblogData = await getMyblogDetailData(id);

  return (
    <>
      <Editor myblogData={myblogData} />;
    </>
  );
}
