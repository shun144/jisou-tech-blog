import { RefObject } from "react";

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement, Element>) => void;
  initialTitle?: string;
  readOnly?: boolean;
}

export default function EditorTitle({
  onChange,
  initialTitle,
  readOnly = false,
}: Props) {
  return (
    <input
      defaultValue={initialTitle}
      onChange={onChange}
      readOnly={readOnly}
      type="text"
      placeholder="タイトルを入力..."
      className="w-full p-4 text-2xl outline-none text-zinc-700"
    />
  );
}
