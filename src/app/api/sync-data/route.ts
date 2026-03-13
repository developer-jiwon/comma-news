import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/volume-content.json");

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  // Only allow writes on localhost
  const host = req.headers.get("host") || "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { slug, title, items, titleSize, numbered, cardTheme, pillColor } = body;

    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);

    data[slug] = {
      title: title ?? data[slug]?.title ?? "",
      items: items ?? data[slug]?.items ?? [],
      titleSize: titleSize ?? data[slug]?.titleSize ?? 26,
      numbered: numbered ?? data[slug]?.numbered ?? true,
      cardTheme: cardTheme ?? data[slug]?.cardTheme ?? "black",
      pillColor: pillColor ?? data[slug]?.pillColor ?? "#F5E050",
    };

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
