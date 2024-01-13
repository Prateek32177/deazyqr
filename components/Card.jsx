
export default function Card() {
  return (
    <>
    <div class="flex flex-col border shadow-sm rounded-xl m-auto w-11/12 mb-10 ">
  <div class=" border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-200 ">
    <p class="mt-1 text-xl font-extrabold">
      Why Dynamic QR !
    </p>
  </div>
  <div class="p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white">
    Revolutionize QR Code
    </h3>
    <p class="mt-2 text-gray-500 dark:text-gray-400">
   No need of generation of New qr code, No hustle for printing new QR every Time, Print it once and change the destination URL Infinite times
    </p>
    <a class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
Get Started For Free
      <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </a>
  </div>
</div>
    </>
  );
}
