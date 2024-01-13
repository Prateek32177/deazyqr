import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  const { id } = params;
  const { url, nextUrl } = request;
  let type = nextUrl.searchParams.get("type");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data, error } = await supabase
    .from("QRLinks")
    .select()
    .eq("codeID", id);

  if (type === "retrieve") {
    return Response.json(data);
  }
  
  if (!error) {
    return Response.redirect(data[0].redirectionUrl);
  }

  return Response.json({ Message: "No URL Found" });
}
