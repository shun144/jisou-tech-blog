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
        { error: `microCMS GET error: ${res.status}` },
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

export async function PATCH(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await req.json();

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");

  if (status !== null && status !== "draft") {
    return NextResponse.json(
      {
        error: "statusを指定しないか、またはdraftを指定してください",
        value: status,
      },
      { status: 400 },
    );
  }

  const schema = z.object({
    title: z.string(),
    contentMarkdown: z.string(),
  });
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const endpoint = status ? `?status=${status}` : "";
  const url = `${process.env.MICRO_CMS_API_BASE_URL!}/blogs/${id}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICRO_CMS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      console.error(errorBody);
      return NextResponse.json(
        { error: `microCMS PATCH error: ${res.status}` },
        { status: res.status },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "microCMS記事更新に失敗" },
      { status: 500 },
    );
  }

  return NextResponse.json({}, { status: 200 });
}
