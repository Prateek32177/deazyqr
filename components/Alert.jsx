import { infoIcon, cancelIcon } from "../Icons";
import React, { useState } from "react";

export function SuccessAlert({ data }) {
  const [open, setOpen] = useState(true);

  const handleCLose = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      {open && (
        <div
          id="alert-2"
          className="flex items-center p-4 my-4 text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          {infoIcon}
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">{data.message}</div>
          <button
            onClick={handleCLose}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            {cancelIcon}
          </button>
        </div>
      )}
    </>
  );
}

export function FailedAlert({ data }) {
  const [open, setOpen] = useState(true);

  const handleCLose = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      {open && (
        <div
          id="alert-2"
          className="flex items-center p-4 my-4 text-red-800 rounded-lg bg-red-50 dark:bg-neutral-900 dark:text-red-400"
          role="alert"
        >
          {infoIcon}
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">{data.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-2"
            aria-label="Close"
            onClick={handleCLose}
          >
            <span className="sr-only">Close</span>
            {cancelIcon}
          </button>
        </div>
      )}
    </>
  );
}
