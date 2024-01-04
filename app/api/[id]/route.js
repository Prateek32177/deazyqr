import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request,{params}) {
    const {id} =params

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let { data, error } = await supabase
    .from('QRLinks')
    .select().eq('codeID',id)
    
return Response.redirect(data[0].redirectionUrl)
  }