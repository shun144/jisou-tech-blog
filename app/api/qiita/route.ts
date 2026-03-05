import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { QiitaDataListSchema } from "@/domain/Article";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const per_page = req.nextUrl.searchParams.get("per_page") ?? "4";

  const params = new URLSearchParams({
    query: "user:shun123",
    per_page,
    page,
  });

  const url = `${process.env.QIITA_API_BASE_URL!}/items?${params}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN!}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Qiita記事一覧取得APIエラー: ${res.status} ${res.statusText}`,
      );
    }

    const body = await res.json();
    const data = QiitaDataListSchema.parse(body);

    // console.log(body);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "レスポンスの形式が不正です",
          details: error.issues,
        },
        {
          status: 502,
        },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
