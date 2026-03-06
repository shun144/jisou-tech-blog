import { QiitaData } from "@/domain/Article";
import { render } from "@testing-library/react";
import Articles from "../Articles";
import { useArticles } from "../useArticles";
import Card from "@/components/Card";
import { getArticleHref, getArticleImageSrc } from "@/utils/url";

jest.mock("../useArticles", () => ({
  useArticles: jest.fn(),
}));

jest.mock("@/components/Card", () => ({
  __esModule: true,
  default: jest.fn(() => <article />),
}));

const dummyQiitaDataList = [
  {
    id: "1",
    title: "title1",
    created_at: "2026-03-06T23:10:00+09:00",
  },
  {
    id: "2",
    title: "title2",
    created_at: "2026-03-06T23:10:00+09:00",
  },
] as QiitaData[];

describe("Articlesコンポーネントのテスト", () => {
  describe("データ取得中の場合", () => {
    beforeEach(() => {
      jest.mocked(useArticles).mockReturnValue({
        isLoaded: false,
        qiitaDataList: [],
      });
    });

    it("データ取得中はローディング表示する", async () => {
      const { findByText } = render(<Articles />);
      const sut = await findByText("Loading中");
      expect(sut).toBeVisible();
    });
  });

  describe("データ0件の場合", () => {
    beforeEach(() => {
      jest.mocked(useArticles).mockReturnValue({
        isLoaded: true,
        qiitaDataList: [],
      });
    });

    it("データ0件の時に記事が無いメッセージを表示する", async () => {
      const { findByText } = render(<Articles />);
      const sut = await findByText("表示できる記事はありません");
      expect(sut).toBeVisible();
    });
  });

  describe("データ取得済みの場合", () => {
    beforeEach(() => {
      jest.mocked(useArticles).mockReturnValue({
        isLoaded: true,
        qiitaDataList: dummyQiitaDataList,
      });
    });

    it("データ件数分の記事カードを表示する", async () => {
      const { findAllByRole } = render(<Articles />);
      const sut = await findAllByRole("article");
      expect(sut).toHaveLength(dummyQiitaDataList.length);
    });

    it("各記事カードに正しい情報を渡す", async () => {
      render(<Articles />);
      dummyQiitaDataList.forEach(({ id, title, created_at }) =>
        expect(Card).toHaveBeenCalledWith(
          {
            title,
            imageSrc: getArticleImageSrc(id),
            createdAt: created_at,
            href: getArticleHref(id),
          },
          undefined,
        ),
      );
    });
  });
});
