import Header from "@/components/header";
import EditorTitle from "@/features/editor/components/editor-title";
import { FirebaseRepository } from "@/features/myblogs/infrastructure/firebase-repository";
import Link from "next/link";
import { cacheLife } from "next/cache";

async function getMyblogDetailData(id: string) {
  "use cache";
  cacheLife("hours");
  const repo = new FirebaseRepository();
  const data = await repo.get(id);
  return data.toPlainObject();
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function MyblogDetail(props: Props) {
  const { id } = await props.params;
  const myblog = await getMyblogDetailData(id);

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
        <div className="flex-1 flex flex-col">
          <EditorTitle initialTitle={myblog.title} readOnly />
        </div>
      </main>
    </>
  );
}

// "use client";
// import Loading from "@/app/myblog/[id]/loading";
// import { MicrocmsData } from "@/domain/Blog";
// import { useEffect, useRef, useState } from "react";
// // import EditorForm from "@/features/editor/components/editor-form";
// import EditorTitle from "@/features/editor/components/editor-title";

// interface Props {
//   id: string;
// }

// export default function myblogView({ id }: Props) {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [microcmsData, setMicrocmsData] = useState<MicrocmsData | null>(null);
//   const markdownRef = useRef<string>("");

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       try {
//         const res = await fetch(`/api/microcms/${id}`);
//         const body = (await res.json()) as MicrocmsData;
//         setMicrocmsData(body);
//       } catch (error) {
//         setMicrocmsData(null);
//       } finally {
//         setIsLoaded(true);
//       }
//     })();
//   }, [id]);

//   if (!isLoaded) {
//     return <Loading />;
//   }

//   return (
//     <div className="flex-1 flex flex-col">
//       <EditorTitle initialTitle={microcmsData?.title} readOnly />
//       {/* <div className="flex-1 flex">
//         <EditorForm
//           initialMarkdownValue={microcmsData?.contentMarkdown}
//           markdownRef={markdownRef}
//           previewType="preview"
//           hideToolbar={true}
//         />
//       </div> */}
//     </div>
//   );
// }
