import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getTimeDifference } from "../../../utils/TimeDiff";
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

  if (id.slice(0, 2) === "TB") {
    const timeDifference = getTimeDifference(
      new Date(data[0].expiringDateTime)
    );

    if (!error && timeDifference.expired) {
      Response.json({ message: "QR Codde Expired" });
      console.log("QR Codde Expired");
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/timebased/${id}`
      );
    } else if (!error && !timeDifference.expired) {
      Response.json({
        message: `QR Codde will be expiring in  ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, ${timeDifference.seconds} seconds`,
      });
      console.log(
        `QR Codde will be expiring in  ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, ${timeDifference.seconds} seconds`
      );
      // return Response.redirect(data[0].redirectionUrl);
      return Response.redirect(    `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/timebased/${id}`);
    } else {
      return Response.json({ Message: "No URL Found" });
    }
  }

  if (!error) {
    return Response.redirect(data[0].redirectionUrl);
  }

  return Response.json({ Message: "No URL Found" });
}
