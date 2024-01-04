import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-6 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
          className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-green-400 to-yellow-200"
        >
          {/* <SupabaseLogo /> */}
          DeazyQR.
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
   <SupabaseLogo />
        </a>
      </div>
      <a
        href="/generateqr"
        className="text-white items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6  "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>{" "}
        Generate Dynamic QR
      </a>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <span className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-lg text-center font-bold ">
        The fastest way to generate QR Code's{" "}
        
      <p className="text-lg lg:text-xl font-light font-mono">
          Elevate Your Brand with Our Quick and Affordable Dynamic QR Solutions!
        </p>{" "}</span>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
