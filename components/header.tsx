"use client";

import Link from "next/link";

interface Props {
  children?: React.ReactNode;
}

function Header({ children }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          className="font-mono text-sm font-semibold tracking-widest text-zinc-100 uppercase"
          href={"/"}
        >
          My Tech Blog
        </Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
