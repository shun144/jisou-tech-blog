import { validateUploadImage } from "../validate";

describe("validateのテスト", () => {
  test("5MB(上限ちょうど)はエラーにならない", () => {
    const file = new File([""], "test.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 5 * 1024 * 1024 });
    expect(() => validateUploadImage(file)).not.toThrow();
  });

  test("5MBを1byte超えるとエラーになる", () => {
    const file = new File([""], "test.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 5 * 1024 * 1024 + 1 });
    expect(() => validateUploadImage(file)).toThrow(
      "ファイルサイズは5MB以下にしてください",
    );
  });

  test("jpg以外の拡張子はエラーになる", () => {
    const file = new File([""], "test.exe", { type: "application/exe" });
    expect(() => validateUploadImage(file)).toThrow(
      "画像ファイル（JPEG / PNG / GIF / WebP）のみアップロード可能です",
    );
  });
});
