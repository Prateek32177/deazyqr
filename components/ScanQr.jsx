import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";

const QRCodeReader = ({ handleQRScanned }) => {
  const [result, setResult] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Additional logic after a successful scan
    // handleQRScanned(result);
  }, [result]);
  const handleImageCapture = async () => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Ensure the video has loaded metadata (including width and height)
      await video.play();
      const videoWidth = video.videoWidth || video.width;
      const videoHeight = video.videoHeight || video.height;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        setResult(code.data);
      } else {
        console.error("QR code not found in the image.");
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const onImageUpload = (e) => {
  setLoading(true)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Save the uploaded image for display
        setLoading(false)
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setResult(code.data);
            handleQRScanned(code.data);
          } else {
            console.error("QR code not found in the image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div class="dark:bg-black dark:text-white p-6 rounded-lg border-2 border-gray-700 mt-3" >
        <div class="flex flex-col items-center justify-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-12 w-12 text-gray-500 dark:text-gray-400"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          <h2 class="text-xl font-bold text-center">Upload your QR Code</h2>
          {/* <p>Drag and drop your file here or click to select a file</p> */}
          <div class="mt-4">
            <label
              class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              for="file-upload"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-4 w-4"
              >
                <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
              </svg>
             {loading ?"Uploading....":"Select a file"} 
            </label>
            <input
              class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hidden"
              id="file-upload"
              type="file"
              onChange={onImageUpload}
              accept="image/*"
            />
          </div>
          {/* <div class="mt-4">
            <button class="justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-4 w-4"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
              Capture with Camera
            </button>
          </div> */}
               {uploadedImage && (
        <div>
          <img
            src={uploadedImage}
            alt="Uploaded QR Code Image"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              marginBottom: "10px",
            }}
          />
        </div>
      )}
        </div>
      </div>

      {/* <label htmlFor="fileInput">Upload QR Code Image:</label>
      <input
        type="file"
        name="fileInput"
        className="border w-52 h-52 py-10 text-center"
        onChange={onImageUpload}
        accept="image/*"
      /> */}

 
      {/* <video ref={videoRef} style={{ display: 'none' , width:"200px", height:"200px"}}></video>
      <button onClick={handleImageCapture}>Capture from Camera</button> */}
      {/* <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      /> */}

      {/* {result && <p>QR Code Data: {result}</p>} */}
    </div>
  );
};

export default QRCodeReader;
