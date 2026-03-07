import { renderHook, waitFor } from "@testing-library/react";
import { useBlogs } from "@/components/blogs/useBlogs";
import { MicrocmsData } from "@/domain/Blog";

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

describe("useBlogsのテスト", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("limitありの場合、limit付きのURLでfetchを呼ぶ", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
    const limit = 10;
    const { result } = renderHook(() => useBlogs(limit));
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    expect(global.fetch).toHaveBeenCalledWith(`/api/microcms?limit=${limit}`);
  });

  test("limitなしの場合、limitなしのURLでfetchを呼ぶ", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    const { result } = renderHook(() => useBlogs());

    await waitFor(() => expect(result.current.isLoaded).toBe(true));

    expect(global.fetch).toHaveBeenCalledWith("/api/microcms");
  });

  test("正常の場合レスポンスを格納する", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dummyDataList),
    });

    const { result } = renderHook(useBlogs);
    await waitFor(() => expect(result.current.isLoaded).toBe(true));
    expect(result.current.microcmsDataList).toEqual(dummyDataList);
  });

  test("エラーの場合空配列を格納する", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    global.fetch = jest.fn().mockRejectedValue(new Error("dummy"));

    const { result } = renderHook(useBlogs);

    await waitFor(() => expect(result.current.isLoaded).toBe(true));

    expect(result.current.microcmsDataList).toEqual([]);
  });
});
