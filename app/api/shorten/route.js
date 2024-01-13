import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request, response) {
  const { longUrl } = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Generate a unique identifier for the shortened URL
  const shortId = nanoid(8);
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/${shortId}`;
  const { data, error } = await supabase
    .from("QRLinks")
    .insert([{ redirectionUrl: longUrl, codeID: shortId, shortUrl }])
    .select();

  if (!error) {
     console.log("post", shortUrl);
    return Response.json({ shortUrl });
  }
  return Response.json({ error });
}
