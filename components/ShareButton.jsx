import React from 'react';
import html2canvas from 'html2canvas';
import {ShareIcon} from "../Icons"
const ImageShareButton = ({ imageElement }) => {
    const handleShare = async () => {
        try {
          const canvas = await html2canvas(imageElement);
          const dataUrl = canvas.toDataURL('image/png');
      
          if (navigator.share) {
            // Convert data URL to Blob
            const blob = await fetch(dataUrl).then(res => res.blob());
            
            // Share using the Web Share API
            await navigator.share({
              files: [new File([blob], 'image.png', { type: 'image/png' })],
              title: 'QR Share',
              text: 'Your Dynamic QR Code!',
            });
          } else {
            throw new Error('Web Share API not supported.');
          }
        } catch (error) {
          console.error('Error sharing image:', error);
        }
      };

  return (
    <button onClick={handleShare}    className="cursor-pointer my-5 py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border items-center " disabled={!navigator.share}>
      Share 
      {ShareIcon}

    </button>
  );
};

export default ImageShareButton;
