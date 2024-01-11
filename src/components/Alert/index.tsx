"use client";

import { Alert } from "@material-tailwind/react";
import React, { useEffect } from "react";

import { CheckCircleIcon, ExclamationCircleIcon, FireIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { alertReducer, closeAlert } from "@/redux/reducer/alert.reducer";

const iconClass = {
  className: "w-6 h-6 text-inherit",
};

export const CustomAlert = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { isOpen, message, options } = useSelector(alertReducer);

  let classColor = "";
  let Icon: React.ReactNode;

  switch (options) {
    case "success":
      Icon = <CheckCircleIcon {...iconClass} />;
      classColor = " border-[#2ec946] bg-[#2ec946]/10 text-[#2ec946]";
      break;

    case "info":
      Icon = <ExclamationCircleIcon {...iconClass} />;
      classColor = " border-[#4cb7ff] bg-[#4cb7ff]/10 text-[#4cb7ff]";
      break;

    case "error":
      Icon = <FireIcon {...iconClass} />;
      classColor = " border-[#c92e2e] bg-[#c92e2e]/10 text-[#c92e2e]";
      break;

    default:
      Icon = <CheckCircleIcon {...iconClass} />;
      classColor = " border-[#2ec946] bg-[#2ec946]/10 text-[#2ec946]";
      break;
  }

  return (
    <Alert
      className={"absolute right-0 rounded-none border-l-4 max-w-[450px] font-medium " + classColor}
      open={isOpen}
      onClose={() => dispatch(closeAlert())}
    >
      <div className="flex flex-row justify-center items-center gap-4 text-sm">
        {Icon} {message || "A simple alert for showing message."}
      </div>
    </Alert>
  );
};
