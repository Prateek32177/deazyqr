"use client"
import React, {useState} from "react";
import Qrdetails from "@/components/Qrdetails";
import UpdateUrl from "@/components/UpdateUrl";

export default function GenerateQR() {

  
const [generate, setGenerate] = useState(true)
const [update, setUpdate] = useState(false)


  return (
    <>

      <div className="flex-1 flex flex-col w-full px-8  justify-center gap-2 ">
        <div className="flex  gap-2 ">
          <button onClick={()=>{setGenerate(true),setUpdate(false)}} className={`${generate && "border-pink-600"} py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border`}>
            Generate QR Code
          </button>
          <button  onClick={()=>{setGenerate(false),setUpdate(true)}} className={`${update && "border-pink-600"}  py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border`}>
            Update Existing QR Code
          </button>
        </div>
        <div class="my-6 flex flex-wrap items-center justify-around w-full p-8  bg-white  border rounded-lg shadow  dark:bg-btn-background hover:bg-btn-background-hover">
         {
          generate && <Qrdetails /> }
         { update && <UpdateUrl/>
         }
        </div>
      </div>
    </>
  );
}
