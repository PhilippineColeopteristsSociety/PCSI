import React from "react";
import { images } from "@/constants/images";

export default function IssueCard({ image, title, date }) {
  return (
    <div className="flex flex-col shadow-sm outline outline-gray-200 rounded-lg h-full overflow-clip mb-4">
      <div
        className="h-[250px] overflow-clip bg-muted"
        style={{
          backgroundImage: `url(${image || images.beatle_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="p-5">
        <h1 className="font-serif font-semibold text-lg mb-2">{title}</h1>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
}
