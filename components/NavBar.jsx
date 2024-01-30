import { cookies } from "next/headers";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { deazyLogo } from "../Icons/index";
import Link from "next/link";

export default function NavBar() {
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
    <>
      <nav className="translate-x-[-50%] w-10/12 left-1/2 rounded-3xl flex justify-center border  border-foreground/10 h-16 fixed top-5 z-10  bg-black bg-opacity-70 font-mono font-bold hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
          {" "}
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link href="/" className="w-10 md:w-28">
              <span className="flex items-center">
                {deazyLogo}
                <span className="px-2 hidden md:inline-flex">
                  DeazyQR.
                </span>{" "}
              </span>
            </Link>
            {isSupabaseConnected && <AuthButton />}
          </div>{" "}
        
      </nav>
    </>
  );
}
