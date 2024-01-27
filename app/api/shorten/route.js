import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request, response) {
  const { longUrl, expiringDateTime, qrType } = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Generate a unique identifier for the shortened URL
  const shortId = nanoid(8);
  let type = "NQ";
  if (qrType === "timeBased") {
    type = "TB";
  }
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/${type}-${shortId}`;
  const { data, error } = await supabase
    .from("QRLinks")
    .insert([
      { redirectionUrl: longUrl, codeID: `${type}-${shortId}`, shortUrl, expiringDateTime },
    ])
    .select();

  if (!error) {
    return Response.json({ shortUrl });
  }
  return Response.json({ error });
}
