import SupabaseLogo from "./SupabaseLogo";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FeatureCard from "../components/FeatureCard";
import { flashIcon } from "../Icons";
import { Chip } from "@nextui-org/react";
import FeatureData from "../app/Data/FeatureData.json";
export default async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleGenerate = () => {
    console.log("user details auth", user);
    if (!user) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/generateqr");
  };

  return (
    <>
      <div className="flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-3 justify-center items-center ">
          <Chip
            color="success"
            className="text-green-500 bg-green-800 bg-opacity-70 dark:text-green-500  dark:bg-opacity-20 whitespace-pre"
            variant="flat"
          >
            Now Get complimentary short URL with QR
          </Chip>
          <a
            href="#"
            rel="noreferrer"
            className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-green-400 to-yellow-200"
          >
            DeazyQR.
          </a>
          {/* <span className="border-l rotate-45 h-6" />
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a> */}
        </div>
        <Link
          href={
            !user
              ? "/login?message=Log in to start generating QR's"
              : "/generateqr"
          }
          className="text-white items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex"
        >
          {flashIcon}
          Generate Dynamic QR
        </Link>
        <h1 className="sr-only">DeazyQR. Dynamic QR code generator Solution</h1>
        <span className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-lg text-center font-bold ">
          The fastest way to generate QR Code's{" "}
          <p className="text-lg lg:text-xl font-light font-mono text-zinc-400">
            Elevate Your Brand with Our Quick and Affordable Dynamic QR
            Solutions!
          </p>{" "}
        </span>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        <h1 className="font-extrabold  text-3xl ">What We Serve </h1>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3  sm:w-3/4 md:w-full m-auto">
          {FeatureData.featureData.map((data) => (
            <FeatureCard key={data.id} featureData={data} />
          ))}
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      </div>
    </>
  );
}
