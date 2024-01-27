"use client"
import React, { useState, useEffect, useCallback } from "react";
import CountdownTimer from "../CountdownTimer.jsx";
import {Spinner} from "@nextui-org/react";
const App =  ({ params }) => {

const [targetDate , setTargetdate] = useState()

useEffect(() => {
  // Your API call or any other one-time setup
  memoizedCall();
}, []); // Empty dependency array means this effect will run once on mount


const fetchDataFromApi = async () => {
  try {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/${params.id}?type=retrieve`
    )
      .then((res) => res.json())
      .then((data) =>
      setTargetdate(data[0].expiringDateTime)
      );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const memoizedCall = useCallback(fetchDataFromApi,[])

  return (
    <div className="m-auto">
      {targetDate ? <CountdownTimer targetDateTime={targetDate} id={params.id}/>:  <Spinner color="warning" />}
    </div>
  );
};

export default App;
