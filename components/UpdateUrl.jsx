"use client";

import React, { useState } from "react";
import { apiRequest } from "../utils/seviceCall";
import { updateIcon } from "../Icons";
import { SuccessAlert, FailedAlert } from "./Alert";

export default function Qrdetails() {
  // const qrCodeRef = useRef(null);
  const [formData, setFormData] = useState({
    existingShortUrl: "",
    existingDestinationUrl: "",
    newDestinationUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  // const [redirectUrl, setRedirectUrl] = useState("");

  const getIdFromUrl = (url) => {
    let splitArr = url.split("/");
    return splitArr[splitArr.length - 1];
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
    let shortID = await getIdFromUrl(formData.existingShortUrl);
    // const existingURl = await fetch(`${process.env.BASE_URL}api/${shortID}`).then((res)=>res.json()).then(data=>console.log("existing url", data))

    await apiRequest({ id: shortID, longUrl: formData.newDestinationUrl }).then(
      (res) => {
        setResMessage(res), setLoading(false);
      }
    ).catch((err)=>{setLoading(false) ,console.log("Error in Updating the destination url", err)}).finally(()=>setLoading(false));

    console.log("formdata request", formData, shortID);
  };
  return (
    <>
      <div>
        <div>
          {updateIcon}

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Update QR Destination URL
          </h5>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Paste Existing URL after Scanning the QR and fill new destintaion
            URL Below
          </p>
        </div>
        <form className="max-w-sm " onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="existingShortUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paste QR Code URL
            </label>
            <input
              name="existingShortUrl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Paste Your QR Code URL Here"
              value={formData.existingShortUrl}
              required
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-5">
            <label
              htmlFor="existingDestinationUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Existing Destination URL
            </label>
            <input
              name="existingDestinationUrl"
              value={formData.existingDestinationUrl}
              placeholder="Your Exitsing Destination URL"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </div> */}
          <div className="mb-5">
            <label
              htmlFor="newDestinationUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter New destination URL
            </label>
            <input
              name="newDestinationUrl"
              value={formData.newDestinationUrl}
              placeholder="Your New Destination URL"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="text-whitecursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-button hover:bg-brand-button/80 border-brand focus-visible:outline-brand-600 shadow-sm text-sm px-4 py-2 text-white bg-pink-700 hover:bg-pink-600"
            disabled={loading}
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
                <span>Updating....</span>{" "}
              </>
            ) : (
              <span>Update</span>
            )}
          </button>
        </form>

        {!resMessage.error ? (
          <SuccessAlert data={resMessage} />
        ) : (
          <FailedAlert data={resMessage} />
        )}
      </div>
    </>
  );
}
