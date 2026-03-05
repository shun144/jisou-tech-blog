import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface Props {
  title: string;
  imageSrc: string;
  createdAt: string;
  href: string;
}

const Card = ({ title, imageSrc, createdAt, href }: Props) => {
  const isExternal = href.startsWith("http");

  const content = (
    <article
      className="group bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors duration-300 shadow-lg shadow-black/50
      cursor-pointer"
    >
      <div className="relative h-36 overflow-hidden bg-zinc-800">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
      </div>

      <div className="px-4 py-4 bg-zinc-100  h-32">
        <time className="font-mono text-xs text-zinc-400 tracking-wider">
          {formatDate(createdAt)}
        </time>
        <h2 className="mt-2 text-sm font-semibold text-zinc-800  leading-snug line-clamp-3 group-hover:text-zinc-900 transition-colors">
          {title}
        </h2>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
};

export default Card;
