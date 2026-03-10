import Editor from "@/components/editor/Editor";

interface Props {
  params: { id: string };
}

export default async function page(props: Props) {
  const { id } = await props.params;

  return (
    <div className="flex-1 flex">
      <Editor />
    </div>
  );
}
