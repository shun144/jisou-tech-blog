import { z } from "zod";
import { MicrocmsDataSchema } from "@/domain/Blog";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const url = `${process.env.MICRO_CMS_API_BASE_URL!}/blogs/${id}`;
  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICRO_CMS_API_KEY!,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `microCMS error: ${res.status}` },
        { status: res.status },
      );
    }

    const body = await res.json();
    const data = MicrocmsDataSchema.parse(body);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "レスポンスが不正です", detail: error.issues },
        { status: 502 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "microCMS記事取得に失敗" },
      { status: 500 },
    );
  }
}
