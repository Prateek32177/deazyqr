"use client";
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { qrIcon, sparkleIcon } from "../Icons";
const apiRequest = async (requestMethod, data) => {
  const res = await fetch(` http://localhost:3000/api/shorten`, {
    // Adding method type
    method: requestMethod,

    // Adding body or contents to send
    body: JSON.stringify(data),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const jsonRes = res.json();
  return jsonRes;
};

export default function Qrdetails() {
  const qrCodeRef = useRef(null);
  const [formData, setFormData] = useState({
    restaurantID: 3423423,
    tablenumber: "",
    destinationUrl:""
  });
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const downloadQRCode = () => {
    html2canvas(qrCodeRef.current, { backgroundColor: "#000" }).then(
      (canvas) => {
        const qrCodeImage = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = qrCodeImage;
        downloadLink.download = "styled-qrcode.png";
        downloadLink.click();
      }
    );
  };

  // Event handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // if(name==="tablenumber" && value>0)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

  //  for constructing the destinationn  url use below one 
    
    // await apiRequest("POST", {
    //   longUrl: `https://deazy-52098.web.app/${formData.restaurantID}/${formData.tablenumber}`,
    // }).then((res) => setRedirectUrl(res.shortUrl));


    // if we have direct destination url use below one
    await apiRequest("POST", {
      longUrl:formData.destinationUrl,
    }).then((res) => {setShortUrl(res.shortUrl),setRedirectUrl(res.shortUrl),    setLoading(false)});

    console.log("post request", redirectUrl);
  };
  return (
    <>
      <div>
        <div>
          {qrIcon}
         

          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Generate QR
          </h5>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
         Enter the Destination Url below
          </p>
        </div>
        <form class="max-w-sm " onSubmit={handleSubmit}>
          {/* <div class="mb-5">
            <label
              htmlFor="restaurant"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Restaurant
            </label>
            <select
              name="restaurant"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Restaurant</option>
              <option value="hardrock">HardRock</option>
              <option value="times">Times Cafe</option>
              <option value="fanny">Fanny bar</option>
              <option value="social">Social Restro</option>
            </select>
          </div>
          <div class="mb-5">
            <label
              htmlFor="restaurantID"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Restaurant ID
            </label>
            <input
              name="restaurantID"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Loading ID.."
              value={formData.restaurantID}
              disabled
            />
          </div>
          <div class="mb-5">
            <label
              htmlFor="tablenumber"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Table/Room Number
            </label>
            <input
              type="number"
              name="tablenumber"
              value={formData.tablenumber}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleInputChange}
            />
          </div> */}
          <div class="mb-5">
            <label
              htmlFor="tablenumber"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Enter Destination Url
            </label>
            <input
              name="destinationUrl"
              value={formData.destinationUrl}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Enter Destination URL here"
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            class="text-whitecursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-button hover:bg-brand-button/80 border-brand focus-visible:outline-brand-600 shadow-sm text-sm px-4 py-2 text-white bg-pink-700 hover:bg-pink-600"
          >
             {loading ? (
              <>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="animate-spin h-5 w-5 mr-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Generating....</span>{" "}
              </>
            ) : (
              <span className="flex items-center">    {sparkleIcon}
              Generate</span>
            )}
        
          </button>
        </form>
        <div class="mt-5">
       { shortUrl && <a href={shortUrl}   target="_blank"
      rel="noreferrer" class="flex flex-col justify-between  py-3 px-3 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-md dark:dark:bg-btn-background-hover border dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-btn-background  items-start">
           <span class="text-xs bg-blue-600 rounded text-white px-4 py-2 my-1.5">Generated Short Link</span> 
           
           <span className="flex items-center">    <span class="text-sm font-medium m-1.5 ">{shortUrl}</span>
           <span> <svg class="w-2.5 h-2.5  rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg></span> </span>
        </a>}
        </div>
        {/* <div className="w-1 h-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mx-8" /> */}
      </div>
      <div>
        <div
          ref={qrCodeRef}
          className="border p-5 rounded-md "
        >
          <QRCode
            bgColor="transparent"
            fgColor="white"
            id="QRCode"
            value={redirectUrl}
            level="M"
          />
        </div>

        <div className="flex justify-between">
          <input
            type="button"
            value="Download QR"
            className="my-5 py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            onClick={downloadQRCode}
          />
          <input
            type="button"
            value="Copy QR"
            className="my-5 py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            onClick={downloadQRCode}
          />
        </div>
      </div>
    </>
  );
}
