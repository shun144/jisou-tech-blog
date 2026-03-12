const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_EXTENSIONS = /.(jpe?g|png|gif|webp)$/i;

export function validateUploadImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "画像ファイル（JPEG / PNG / GIF / WebP）のみアップロード可能です",
    );
  }

  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    throw new Error("拡張子が不正です");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("ファイルサイズは5MB以下にしてください");
  }
}
