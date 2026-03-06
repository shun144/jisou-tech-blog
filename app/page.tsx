import Articles from "@/components/articles/Articles";
import Blog from "@/components/blog/Blog";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700">
          個人記事
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
        <h2 className="text-lg md:text-xl lg:text-2xl text-zinc-700">
          ブログ記事
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
    </div>
  );
}
