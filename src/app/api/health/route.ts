import { hasApiKey } from "@/lib/openai";
import { getModel } from "@/lib/openai";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    live: hasApiKey(),
    model: hasApiKey() ? getModel() : null,
  });
}
