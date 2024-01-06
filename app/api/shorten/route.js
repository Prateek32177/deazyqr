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

  const { data, error } = await supabase
    .from("QRLinks")
    .insert([{ redirectionUrl: longUrl, codeID: shortId }])
    .select();

    if(!error){
      const shortUrl = `https://deazyqr-ars9o9lk9-prateek32177.vercel.app/api/${shortId}`;
console.log("post", shortUrl)
      return Response.json({ shortUrl });
 
    }
    return Response.json({error });
}

