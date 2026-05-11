import { NextResponse } from "next/server";
import { MISSION_FAILURES } from "@/data/mission-failures";
import { buildMissionArchiveHtml } from "@/lib/build-mission-archive-html";

export async function GET() {
  const html = buildMissionArchiveHtml(MISSION_FAILURES);
  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="AstroFlow_Mission_Archive.html"',
      "Cache-Control": "no-store",
    },
  });
}
