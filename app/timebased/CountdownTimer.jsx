"use client";

import React, { useState, useEffect, useRef } from "react";
import {Snippet} from "@nextui-org/react";
export default function Countdown({ targetDateTime }) {
  let intervalRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    console.log("Component mounted with targetDateTime:", targetDateTime);

    intervalRef.current = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clear the interval when the component is unmounted or the countdown expires
    return () => {
      console.log(
        "Component unmounted or countdown expired. Clearing interval."
      );
      clearInterval(intervalRef.current);
    };
  }, [targetDateTime]);
  function calculateTimeRemaining() {
    let now = new Date().getTime();
    let targetTime = new Date(targetDateTime).getTime();
    let timeRemaining = targetTime - now;

    if (timeRemaining <= 0) {
      clearInterval(intervalRef.current);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  return (
    <>
   
      <div class="text-center my-5">
        {timeRemaining.days === 0 &&
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0 ? (
          <div className="text-center" style={{textAlign: "-webkit-center"}}>
            <div className="">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 text-yellow-400 animate-bounce"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-thin font-mono  text-yellow-400 dark:text-yellow-400">
              Your QR code has Expired !
            </h3>
          </div>
        ) : (
         <><Snippet color="success" className="my-5" symbol={"Secret Code :"}>sads-adfd-sfdgs-dfdsf</Snippet>
          <h3 class="text-xl font-thin font-mono text-gray-800 dark:text-white">
            Your QR code will be expiring in
          </h3></> 
        )}
      </div>
 
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max place-content-center">
        <div
          className="flex flex-col p-2 bg-neutral dark:bg-amber-500  bg-amber-500 rounded-box rounded-lg  text-amber-400  
                 bg-opacity-25  dark:bg-opacity-25"
        >
          <span className="countdown font-mono text-5xl">
            <span>{timeRemaining.days!==NaN && timeRemaining.days}</span>
          </span>
          days
        </div>
        <div
          className="flex flex-col p-2 bg-neutral dark:bg-amber-500  bg-amber-500 rounded-box rounded-lg  text-amber-400  
                 bg-opacity-25  dark:bg-opacity-25"
        >
          <span className="countdown font-mono text-5xl">
            <span>{timeRemaining.hours!==NaN && timeRemaining.hours}</span>
          </span>
          hours
        </div>
        <div
          className="flex flex-col p-2 bg-neutral dark:bg-amber-500  bg-amber-500 rounded-box rounded-lg  text-amber-400  
                 bg-opacity-25  dark:bg-opacity-25"
        >
          <span className="countdown font-mono text-5xl">
            <span>{timeRemaining.minutes!==NaN &&  timeRemaining.minutes}</span>
          </span>
          min
        </div>
        <div
          className="flex flex-col p-2 bg-neutral dark:bg-amber-500  bg-amber-500 rounded-box rounded-lg  text-amber-400  
                 bg-opacity-25  dark:bg-opacity-25"
        >
          <span className="countdown font-mono text-5xl">
            <span>{timeRemaining.seconds!==NaN &&  timeRemaining.seconds}</span>
          </span>
          sec
        </div>
      </div>
    </>
  );
}
