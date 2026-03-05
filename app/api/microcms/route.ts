import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MicrocmsContentsSchema } from "@/domain/Blog";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") ?? "100";

  const params = new URLSearchParams({
    limit,
  });

  const url = `${process.env.MICRO_CMS_API_BASE_URL!}/blogs?${params}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICRO_CMS_API_KEY!,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `microCMS error: ${res.status}` },
        { status: res.status === 404 ? 404 : 502 },
      );
    }

    const body = await res.json();

    const data = MicrocmsContentsSchema.parse(body);
    return NextResponse.json(data.contents, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "レスポンスの形式が不正です",
          url,
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
