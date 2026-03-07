import { getArticleImageSrc } from "@/utils/url";
import Card from "../Card";
import { render, screen } from "@testing-library/react";

describe("Cardコンポーネントのテスト", () => {
  test("httpから始まるhrefを受け取ったら、外部リンクで表示", async () => {
    const { findByRole } = render(
      <Card
        title=""
        imageSrc={getArticleImageSrc("1")}
        createdAt="2026-03-07T13:52:00"
        href="http"
      />,
    );
    const sut = (await findByRole("link")) as HTMLAnchorElement;
    expect(sut.getAttribute("target")).toBe("_blank");
  });

  test("httpから始まらないhrefを受け取ったら、内部リンクで表示", async () => {
    const { findByRole } = render(
      <Card
        title=""
        imageSrc={getArticleImageSrc("1")}
        createdAt="2026-03-07T13:52:00"
        href="dummy"
      />,
    );
    const sut = (await findByRole("link")) as HTMLAnchorElement;
    expect(sut.getAttribute("target")).toBeNull();
  });
});
