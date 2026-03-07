import { renderHook, act, waitFor } from "@testing-library/react";
import { useArticles } from "../useArticles";
import { QiitaData } from "@/domain/Article";

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

describe("useArticlesカスタムフックのテスト", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });
  });

  test("APIリクエストをすること", async () => {
    const { result } = renderHook(() => useArticles(1));
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  test("perPageの値をAPIリクエストのパラメータに反映すること", async () => {
    const perPage = 10;
    const { result } = renderHook(() => useArticles(perPage));
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    expect(global.fetch).toHaveBeenCalledWith(`/api/qiita?per_page=${perPage}`);
  });

  test("APIレスポンスデータを格納すること", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(dummyQiitaDataList),
    });
    const { result } = renderHook(() => useArticles(1));
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    expect(result.current.qiitaDataList).toEqual(dummyQiitaDataList);
  });

  test("APIエラーの場合空配列をセットすること", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValue(new Error("fetch error"));
    const { result } = renderHook(() => useArticles(1));
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    expect(result.current.qiitaDataList).toEqual([]);
  });
});
