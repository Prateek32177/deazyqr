"use client";
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Snippet } from "@nextui-org/react";
import { qrIcon, sparkleIcon } from "../Icons";
import Share from "./ShareButton";

const apiRequest = async (requestMethod, data) => {
  const consturl = `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/shorten`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_PREVIEW}/api/shorten`,
    {
      // Adding method type
      method: requestMethod,

      // Adding body or contents to send
      body: JSON.stringify(data),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const jsonRes = res.json();
  return jsonRes;
};

export default function Qrdetails() {
  const qrCodeRef = useRef(null);

  const [formData, setFormData] = useState({
    restaurantID: 3423423,
    tablenumber: "",
    destinationUrl: "",
    datetime: new Date(),
    colourPicker: "#000",
  });
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const downloadQRCode = () => {
    html2canvas(qrCodeRef.current, { backgroundColor: "#fff" }).then(
      (canvas) => {
        const qrCodeImage = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = qrCodeImage;
        downloadLink.download = "deazyQR.png";
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
      longUrl: formData.destinationUrl,
      expiringDateTime: formData.datetime,
      qrType: formData.qrType,
    })
      .then((res) => {
        setShortUrl(res.shortUrl),
          setRedirectUrl(res.shortUrl),
          setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  return (
    <>
      <div>
        <div>
          {qrIcon}

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Generate QR
          </h5>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Enter the Destination Url below
          </p>
        </div>
        <form className="max-w-lg " onSubmit={handleSubmit}>
          <div className="mb-5">
            <div class="grid sm:grid-cols-2 gap-2">
              <label
                for="qrType"
                class="flex p-3  w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-btn-background dark:border-gray-700 dark:text-gray-400"
              >
                <input
                  type="radio"
                  value="normalQR"
                  defaultChecked={true}
                  name="qrType"
                  class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="qrType"
                  onChange={handleInputChange}
                />
                <span class="text-sm text-gray-500 ms-3 dark:text-gray-400">
                  Normal Dynamic QR
                </span>
              </label>

              <label
                for="qrType"
                class="flex p-3  w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-btn-background dark:border-gray-700 dark:text-gray-400"
              >
                <input
                  type="radio"
                  value="timeBased"
                  name="qrType"
                  class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-radio-checked-in-form"
                  onChange={handleInputChange}
                />
                <span class="text-sm text-gray-500 ms-3 dark:text-gray-400">
                  Time based Expiring QR
                </span>
              </label>
            </div>
          </div>

          {/* <div className="mb-5">
            <label
              htmlFor="restaurant"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Restaurant
            </label>
            <select
              name="restaurant"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Restaurant</option>
              <option value="hardrock">HardRock</option>
              <option value="times">Times Cafe</option>
              <option value="fanny">Fanny bar</option>
              <option value="social">Social Restro</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="restaurantID"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Restaurant ID
            </label>
            <input
              name="restaurantID"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Loading ID.."
              value={formData.restaurantID}
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="tablenumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Table/Room Number
            </label>
            <input
              type="number"
              name="tablenumber"
              value={formData.tablenumber}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleInputChange}
            />
          </div> */}
          <div className="mb-5">
            <label
              htmlFor="tablenumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Destination Url
            </label>
            <input
              name="destinationUrl"
              value={formData.destinationUrl}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:bg-btn-background dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Enter Destination URL here"
              onChange={handleInputChange}
            />
          </div>
          {formData.qrType === "timeBased" && (
            <div className="mb-5">
              <label
                htmlFor="datetime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expiring Date and time of QR
              </label>
              <input
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-btn-background dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder={"Select Date and Time"}
                onChange={handleInputChange}
                min={new Date().toISOString().slice(0, -8)}
              />
            </div>
          )}
          <button
            type="submit"
            className="text-whitecursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-button hover:bg-brand-button/80 border-brand focus-visible:outline-brand-600 shadow-sm text-sm px-4 py-2 text-white bg-pink-700 hover:bg-pink-600"
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
              <span className="flex items-center">
                {" "}
                {sparkleIcon}
                Generate
              </span>
            )}
          </button>
        </form>
        <div className="mt-5 wrap">
          {shortUrl && (
            // <span className="flex items-center">
            <Snippet
              color="success"
              className="flex-wrap items-start"
              symbol={shortUrlSymbol}
              codeString={shortUrl}
            >
              {/* <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between  py-3 px-3 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-md dark:dark:bg-btn-background-hover border dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-btn-background  items-start"
                > */}
              <span className="whitespace-normal"> {shortUrl}</span>
              {/* </a> */}
            </Snippet>
            // </span>
          )}
        </div>
        {/* <div className="w-1 h-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mx-8" /> */}
      </div>
      <div>
        <div
          ref={qrCodeRef}
          className={` p-5 my-3 rounded-md ${
            loading && "animate-pulse "
          } bg-slate-200`}
        >
          <QRCode
            bgColor="transparent"
            fgColor={formData.colourPicker}
            id="QRCode"
            style={{ border: "green" }}
            value={redirectUrl}
          />
          <h2 className="text-black font-mono">Scan me.</h2>
        </div>
        <label
          for="hs-color-input"
          class="block text-sm font-medium mb-2 dark:text-white"
        >
        Change QR color
        </label>
        <input
          onChange={handleInputChange}
          name="colourPicker"
          type="color"
          class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer w-10 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
          id="hs-color-input"
          value="#2563eb"
          title="Choose your color"
        />
        <div className="flex justify-between">
          <input
            type="button"
            value="Download QR"
            className="cursor-pointer  my-5 py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            onClick={downloadQRCode}
          />
          {qrCodeRef.current && <Share imageElement={qrCodeRef.current} />}
        </div>
      </div>
    </>
  );
}

const shortUrlSymbol = (
  <>
    <pre className="font-bold">Short URL :</pre>
  </>
);
