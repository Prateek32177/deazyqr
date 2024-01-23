import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { deazyLogo } from "../../Icons/index";
export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>
      <div className="mx-auto flex h-screen flex-col md:max-w-none md:flex-row md:pr-10 animate-in flex-1 w-full justify-center gap-2  px-8 py-12 my-8">
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <p className="mb-20 font-bold tracking-wider">{deazyLogo} DeazyQR.</p>
          <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
            Start your <br />
            journey with us
          </p>
          <p className="mb-28 leading-relaxed text-gray-200">
            Start your dynamic QR adventure with us, shaping connections that
            evolve with every scan.
          </p>

          <div className="bg-blue-600/80 rounded-2xl px-4 py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10 rounded-full object-cover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>

            <p className="mb-3 text-gray-200">
              According to studies, businesses that use QR codes in their
              marketing materials have reported increased conversion rates.
            </p>
          </div>
        </div>

        <div className="px-4 py-20 ">
          <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
          <a href="#" className="mb-10 block font-bold text-gray-600">
            Have an account
          </a>
          <p className="mb-1 font-medium text-gray-500">Looking for?</p>
          <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden "
                type="radio"
                name="radio"
                id="radio1"
                checked
              />
              <label
                className="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio1"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-4 w-4 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Buissness</span>
            </div>
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio3"
                checked
              />
              <label
                className="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio3"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-4 w-4  rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Self</span>
            </div>
          </div>
          <form action={signIn}>
            <p className="mb-1 font-medium text-gray-500">Email</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input
                  required
                  name="email"
                  type="email"
                  id="signup-email"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <p className="mb-1 font-medium text-gray-500">Password</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input
                  required
                  name="password"
                  type="password"
                  id="signup-password"
                  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Choose a password (minimum 8 characters)"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-start">
              <button className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
                Sign In
              </button>
              <button
                formAction={signUp}
                className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
