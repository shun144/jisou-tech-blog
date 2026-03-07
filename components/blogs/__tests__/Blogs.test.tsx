import { render } from "@testing-library/react";
import Blogs from "../Blogs";
import { useBlogs } from "../useBlogs";
import { MicrocmsData } from "@/domain/Blog";
import Card from "@/components/Card";

jest.mock("../useBlogs", () => ({
  useBlogs: jest.fn(),
}));

jest.mock("@/components/Card", () => ({
  __esModule: true,
  default: jest.fn(() => <article />),
}));

const dummyDataList = [
  {
    id: "1",
    title: "title1",
    eyecatch: {
      url: "https://sample",
    },
    content: "<div>sample</div>",
    createdAt: "2026-03-07T12:00:00",
  },
] as MicrocmsData[];

describe("Blogsコンポーネントのテスト", () => {
  beforeEach(() => {
    jest.mocked(useBlogs).mockReturnValue({
      isLoaded: false,
      microcmsDataList: [],
    });
  });

  test("データ取得中にロード画面を出す", async () => {
    const { findByText } = render(<Blogs />);
    const sut = await findByText("Loading中");
    expect(sut).toBeVisible();
  });

  test("データ件数0件なら表示できるデータが無い旨のメッセージを出す", async () => {
    jest.mocked(useBlogs).mockReturnValue({
      isLoaded: true,
      microcmsDataList: [],
    });
    const { findByText } = render(<Blogs />);
    const sut = await findByText("表示できるブログはありません");
    expect(sut).toBeVisible();
  });

  test("データ取得件数分Cardを表示すること", async () => {
    jest.mocked(useBlogs).mockReturnValue({
      isLoaded: true,
      microcmsDataList: dummyDataList,
    });

    const { findAllByRole } = render(<Blogs />);
    const sut = await findAllByRole("article");
    expect(sut).toHaveLength(dummyDataList.length);
  });

  test("Cardに正しいデータを渡している", async () => {
    jest.mocked(useBlogs).mockReturnValue({
      isLoaded: true,
      microcmsDataList: dummyDataList,
    });

    render(<Blogs />);
    dummyDataList.forEach(({ title, eyecatch, createdAt, id }) => {
      expect(Card).toHaveBeenCalledWith(
        {
          title,
          imageSrc: eyecatch.url,
          createdAt,
          href: `/blogs/${id}`,
        },
        undefined,
      );
    });
  });
});
