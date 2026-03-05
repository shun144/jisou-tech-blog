import { Suspense } from "react";
import BlogDetail from "./BlogDetail";

export default async function BlogDetailPage() {
  return (
    <Suspense fallback={<div>ロード中</div>}>
      <BlogDetail />
    </Suspense>
  );
}
