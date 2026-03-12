import { getArticleImageSrc } from "@/utils/url";
import Card from "@/features/card/components/card";

export default function MyBlogs() {
  const dataList = [
    {
      id: "jrid_uzlaakf",
      title: "title1",
      imageSrc: getArticleImageSrc("1"),
      createdAt: "2026-03-09T08:00:00",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dataList.map((x) => (
        <Card
          key={x.id}
          title={x.title}
          imageSrc={x.imageSrc}
          createdAt={x.createdAt}
          href={`/myblog/${x.id}`}
        />
      ))}
    </div>
  );
}
