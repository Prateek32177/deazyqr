import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import Popover from "./Popover";
import Signout from "./Signout";
import { SignInIcon } from "../Icons";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Popover user={user}>
        <Signout />
      </Popover>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex items-center justify-around rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login {SignInIcon}
    </Link>
  );
}
