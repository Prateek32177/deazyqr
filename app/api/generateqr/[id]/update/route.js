import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function PATCH(request,{params}) {
    const {id} =params
   const {longUrl} = await request.json();
   console.log("path request", id, longUrl)
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
    .from('QRLinks')
    .update({redirectionUrl: longUrl})
    .eq('codeID', id)
    .select()
            
    if(!error && data.length>0)
{return Response.json({message:'Destination URL Succesfully Updated', error:false})}

return Response.json({message: "URL Doesn't Exist! Please Recheck QR code URL", error:true})
  }