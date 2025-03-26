"use client";

import { Feature } from "@/types/feature";
import { useState } from "react";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { icon, title, paragraph } = feature;
  const background = "url('/images/hero/background.png')";

  return (
    <div className="w-full ">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div
          className={`mb-10 flex h-[150px] w-[150px] items-center justify-center rounded-md  text-primary 
        transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
          style={{
            backgroundImage: background,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-white  sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className=" pr-[10px] font-medium leading-relaxed text-body-color text-white">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
