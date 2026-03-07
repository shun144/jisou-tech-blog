import Blog from "@/components/blogs/Blogs";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700">
          ブログ記事一覧
        </h2>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-zinc-500 border-b border-zinc-400 hover:text-zinc-800 hover:border-zinc-800 transition-colors pb-0.5"
        >
          <span>←</span>
          トップページに戻る
        </Link>
      </div>
      <Blog />
    </div>
  );
}
