"use server";

import { adminStorage } from "@/lib/firebase/admin";

export async function uploadImage(file: File) {
  try {
    const fileName = `image/${Date.now()}_${file.name}`;
    const bucket = adminStorage.bucket(process.env.FB_STORAGE_BUCKET);
    const fileRef = bucket.file(fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fileRef.save(buffer, { contentType: file.type });

    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "2099-01-01",
    });

    return url;
  } catch (error) {
    console.error(error);
  }
}
