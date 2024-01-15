"use client";

import { Alert } from "@material-tailwind/react";
import React from "react";

import { CheckCircleIcon, ExclamationCircleIcon, FireIcon } from "@heroicons/react/24/solid";
import { positions, transitions } from "react-alert";

export const alertOptions = {
  position: positions.TOP_RIGHT,
  timeout: 10000,
  offset: '300px',
  transition: transitions.SCALE
}


const iconClass = {
  className: "w-6 h-6 text-inherit",
};

const AlertTemplate = (props: any) => {

  let classColor = "";
  let Icon: React.ReactNode;

  switch (props.options.type) {
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
    <Alert className={"mt-4 rounded-none border-l-4 max-w-[450px] font-medium " + classColor}>
      <div className="flex flex-row justify-center items-center gap-4 text-sm">
        {Icon} {props.message || "A simple alert for showing message."}
      </div>
    </Alert>
  )
}

export default AlertTemplate;
