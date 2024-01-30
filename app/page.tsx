import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Card from "../components/Card";
export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className=" w-full  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative  items-center justify-center">
       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)]"></div>
      <div className="flex-1 w-full flex flex-col gap-20 items-center mt-40 ">
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0  px-3 ">
          <Header />
        </div>
        <main className="flex-1 flex flex-col gap-6 ">
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
          <Card />
        </main>
      </div>
    </div>
  );
}
