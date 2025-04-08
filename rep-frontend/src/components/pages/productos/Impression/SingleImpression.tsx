"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";
import gold from "public/images/products/color/golden.jpeg";
import { api } from "@/utils/config";
import { Product } from "@/types/product";
import { Background } from "@/types/background";

const SingleImpression = () => {
  const [impressions, setImpressions] = useState([]);
  const [addedImpressionId, setAddedImpressionId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#004AAD");

  useEffect(() => {
    // request base to obtain the background color
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get<Background>(
          `${api}/backgrounds/prints`,
        );
        setBackgroundColor(data.color);
      } catch (error) {
        console.error("Error fetching prints background:", error);
      }
    };
    fetchBackground();

    // const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    // if (savedColors && savedColors.impresion) {
    //   setBackgroundColor(savedColors.impresion);
    // }
  }, []);

  useEffect(() => {
    const fetchImpression = async () => {
      try {
        const response = await axios.get<Product[]>(`${api}/products/prints`);
        const uniqueImpression = response.data.filter(
          (impression, index, self) =>
            index === self.findIndex((m) => m.name === impression.name),
        );
        setImpressions(uniqueImpression);
      } catch (error) {
        console.error("Error fetching prints:", error);
      }
    };

    fetchImpression();
  }, []);

  const handleAddImpression = (impression) => {
    const storedImpressions =
      JSON.parse(localStorage.getItem("impressions")) || [];
    const updatedImpressions = [...storedImpressions, impression];
    localStorage.setItem("impressions", JSON.stringify(updatedImpressions));
    setAddedImpressionId(impression.id);
    setTimeout(() => setAddedImpressionId(null), 3000);
  };

  return (
    <div className="container">
      <div className="products-box flex w-[80vw] flex-wrap items-center justify-center gap-3">
        {impressions.length > 0 ? (
          impressions.map((imp) => (
            <div
              key={imp.id}
              style={{ background: imp.background || "#004AAD" }}
              className="product-main h group relative mb-8 h-[710px] w-[400px] flex-wrap overflow-hidden rounded-2xl shadow-one duration-300 "
            >
              <div
                style={{ background: imp.background || "#004AAD" }}
                className="relative block aspect-[37/22] w-full rounded-t-2xl "
              >
                <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold capitalize text-white">
                  {imp.category}
                </span>
                <img
                  className="mx-auto object-contain"
                  src={imp.image}
                  alt={imp.name}
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <div
                style={{ background: imp.background || "#004AAD" }}
                className=" h-full p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8"
              >
                <h3>
                  <div className="mb-4 block text-xl font-bold text-white dark:hover:text-primary sm:text-2xl">
                    {imp.name}
                  </div>
                </h3>
                <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 font-medium text-white">
                  {imp.description}
                </p>
                <div className="flex items-center">
                  <div className="mr-5 flex flex-col items-center gap-3 border-r border-body-color border-opacity-60 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                    <div className="w-full">
                      <div className="mb-1 text-sm font-medium text-white">
                        Tamaño:
                        <br />
                        <br />
                        {(imp.height || "").split(",").map((height, index) => {
                          const heightKey = height.trim().toLowerCase();

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="text-xs font-bold text-white">
                                {height.trim()}
                              </span>
                            </div>
                          );
                        })}
                        <b className="border-b-2">Aproximadamente</b>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex flex-row">
                      <div className="w-full">
                        <h4 className="mb-1 text-sm font-medium text-white">
                          Colores:
                        </h4>
                      </div>
                      <div className="mr-4 flex  flex-wrap gap-3">
                        {(imp.color || "").split(",").map((color, index) => {
                          const colorKey = color.trim().toLowerCase();
                          const imageSrc = colorMapping[colorKey] || gold;

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Image
                                src={imageSrc}
                                alt={color.trim()}
                                width={24}
                                height={24}
                                className="rounded-full border-body-color dark:border-white"
                                style={{ width: "24px", height: "24px" }}
                              />
                              <span className="text-xs font-bold text-white">
                                {color.trim()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddImpression(imp)}
                      className="rounded-sm bg-[#e11b24] px-9 py-2 text-center text-base font-medium text-white shadow-submit duration-300 hover:bg-[#e11b25]/90 dark:shadow-submit-dark"
                    >
                      Añadir
                    </button>
                    {addedImpressionId === imp.id && (
                      <p className="mt-2 flex flex-col items-center justify-center gap-3 text-center text-sm font-medium text-green-600">
                        Añadido correctamente
                        <FaCheckCircle color="white" fontSize={16} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-dark">No se encontraron impresiones.</p>
        )}
      </div>
    </div>
  );
};

export default SingleImpression;
