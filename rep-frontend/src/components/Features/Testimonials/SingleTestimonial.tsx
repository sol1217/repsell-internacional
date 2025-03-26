"use client";

import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { useState } from "react";
const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, content, imagePerson, name } = testimonial;
  const [isHovered, setIsHovered] = useState(false);

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>,
    );
  }

  return (
    <div
      className={`h-[260px] rounded-md border-2 transition-transform  duration-300 hover:transform ${isHovered ? "scale-105" : "scale-100"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="flex h-full flex-col gap-3 rounded-sm  bg-dark p-8 shadow-two duration-300 hover:shadow-one lg:px-5 xl:px-8">
        <div className="flex items-center gap-3 ">
          <Image
            className="rounded-full"
            src={imagePerson}
            alt={name}
            width={60}
            height={60}
          />
          <div className="mb-5 flex items-center justify-center space-x-1">
            {ratingIcons}
          </div>
        </div>

        <p className=" border-b border-blue-800 text-white  ">{name}</p>

        <p className="mb-8 border-b border-blue-800 border-opacity-60 pb-5 leading-relaxed text-white  ">
          “{content}“
        </p>
      </div>
    </div>
  );
};

export default SingleTestimonial;
