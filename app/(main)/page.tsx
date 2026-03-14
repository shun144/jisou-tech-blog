import { Suspense } from "react";
import Articles from "@/features/articles/components/articles";
import Blog from "@/features/blogs/components/blogs";
import MyBlogs from "@/features/myblogs/components/myblogs";
import { MyBlogsErrorBoundary } from "@/features/myblogs/components/myblogs-error-boundary";
import Link from "next/link";
import Loading from "@/components/loading";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700 mb-4">
          Qiita記事
        </h2>
        <Link
          href="/articles"
          className="flex items-center gap-1 text-sm text-zinc-500 border-b border-zinc-400 hover:text-zinc-800 hover:border-zinc-800 transition-colors pb-0.5"
        >
          もっと見る
          <span>→</span>
        </Link>
      </div>
      <Articles />

      <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700 mb-4">
          microCMSブログ
        </h2>
        <Link
          href="/blogs"
          className="flex items-center gap-1 text-sm text-zinc-500 border-b border-zinc-400 hover:text-zinc-800 hover:border-zinc-800 transition-colors pb-0.5"
        >
          もっと見る
          <span>→</span>
        </Link>
      </div>
      <Blog limit={4} />

      <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700 mb-4">
          マイブログエディタ
        </h2>
      </div>

      <Suspense fallback={<Loading />}>
        <MyBlogsErrorBoundary>
          <MyBlogs />
        </MyBlogsErrorBoundary>
      </Suspense>
    </>
  );
}
