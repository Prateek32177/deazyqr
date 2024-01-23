"use client";

import React, { useState } from "react";
import { apiRequest } from "../utils/seviceCall";
import { updateIcon, loaderIcon, SpinUpdateIcon } from "../Icons";
import { SuccessAlert, FailedAlert } from "./Alert";
import QRCodeReader from "./ScanQr";

export default function Qrdetails() {
  // const qrCodeRef = useRef(null);
  const [formData, setFormData] = useState({
    existingShortUrl: "",
    existingDestinationUrl: "",
    newDestinationUrl: "",
  });
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgDataLoading, setImageDataLoading] = useState(false);
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

    await apiRequest({ id: shortID, longUrl: formData.newDestinationUrl })
      .then((res) => {
        setResMessage(res), setLoading(false);
        setAlert(true);
      })
      .catch((err) => {
        setLoading(false),
          console.log("Error in Updating the destination url", err);
      })
      .finally(() => setLoading(false));

    console.log("formdata request", formData, shortID, resMessage);
  };

  const handleQRScan = async (scannedValue) => {
    setImageDataLoading(true);
    let shortID = await getIdFromUrl(scannedValue);

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/${shortID}?type=retrieve`
    )
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          ...formData,
          ["existingShortUrl"]: scannedValue,
          ["existingDestinationUrl"]: data[0].redirectionUrl,
        }),
          setImageDataLoading(false);
      });
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-around w-full">
        <div>
          <div className="max-w-sm ">
            {updateIcon}
            {imgDataLoading && <p> {loaderIcon} Fetching QR Details..</p>}

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
                placeholder={"Paste Your QR Code URL Here"}
                value={formData.existingShortUrl}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5">
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
                className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled
              />
            </div>
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
                  {loaderIcon}
                  <span>Updating....</span>{" "}
                </>
              ) : (
                <span>Update</span>
              )}
            </button>
          </form>

          {alert && !resMessage.error && <SuccessAlert data={resMessage} />}
          {alert && resMessage.error && <FailedAlert data={resMessage} />}
        </div>
        <QRCodeReader handleQRScanned={handleQRScan} />
      </div>
    </>
  );
}
