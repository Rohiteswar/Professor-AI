import Link from "next/link";
import React from "react";
import ClockIcon from "./Svg_Icons/ClockIcon";

function Recent() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 text-center">
      <Link
        className="flex items-center justify-center text-base font-medium text-gray-500 hover:text-gray-900"
        href="#"
      >
        <ClockIcon className="w-4 h-4 mr-2" />
        History
      </Link>
    </div>
  );
}

export default Recent;
