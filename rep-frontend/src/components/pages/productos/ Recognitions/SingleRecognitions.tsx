"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { colorMapping } from "@/utils/colorMapping";
import gold from "public/images/products/color/golden.jpeg";
import {api} from "@/utils/config";

const SingleRecognitions = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [addedRecognitionId, setAddedRecognitionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    if (savedColors && savedColors.recognitions) {
      setBackgroundColor(savedColors.recognitions);
    }
  }, []);

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        const response = await axios.get(
          `${api}/products/recognitions`,
        );

        const uniquePromotional = response.data.data.filter(
          (promotional, index, self) =>
            index === self.findIndex((m) => m.name === promotional.name),
        );

        setRecognitions(uniquePromotional);
      } catch (error) {
        console.error("Error fetching promotional:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecognitions();
  }, []);

  const handleAddRecognition = (recognition) => {
    const storedRecognitions =
      JSON.parse(localStorage.getItem("recognitions")) || [];
    const updatedRecognitions = [...storedRecognitions, recognition];
    localStorage.setItem("recognitions", JSON.stringify(updatedRecognitions));
    setAddedRecognitionId(recognition.id);
    setTimeout(() => setAddedRecognitionId(null), 3000);
  };

  return (
    <div className="container ">
      {loading ? (
        <p className="text-dark">Cargando...</p>
      ) : (
        <div className="products-box flex w-[80vw] flex-wrap items-center justify-center gap-3">
          {recognitions.length > 0 ? (
            recognitions.map((recognition) => (
              <div
                key={recognition.id}
                style={{ background: recognition.background || "#004AAD" }} // Color dinámico
                className="product-main group relative mb-8 h-[700px] w-[400px] flex-wrap overflow-hidden rounded-2xl shadow-one duration-300 hover:shadow-two dark:hover:shadow-gray-dark"
              >
                <div
                  className=" relative block aspect-[37/22] w-full rounded-t-2xl"
                  style={{ background: recognition.background || "#004AAD" }} // Color dinámico
                >
                  <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold capitalize text-white">
                    {recognition.category}
                  </span>
                  <img
                    className="mx-auto object-contain"
                    src={recognition.image || ""}
                    alt={recognition.name}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <div
                  style={{ background: recognition.background || "#004AAD" }} // Color dinámico
                  className="h-full rounded-b-2xl  p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8"
                >
                  <h3>
                    <div className="mb-4 block text-xl font-bold text-white caret-bg-color-dark hover:text-blue-700 dark:hover:text-red-700 sm:text-2xl">
                      {recognition.name}
                    </div>
                  </h3>
                  <p className="mb-6 border-b border-body-color border-opacity-10  pb-6 font-medium text-body-color text-white caret-bg-color-dark ">
                    {recognition.description}
                  </p>
                  <div className="flex items-center">
                    <div className="mr-5 flex flex-col items-center gap-3 border-r border-body-color border-opacity-60 pr-5  xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                      <div className="w-full">
                        <div className="mb-1 text-white">
                          Tamaño:
                          <br />
                          <br />
                          {(recognition.height || "")
                            .split(",")
                            .map((height, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <span className="caret-bg-color-dark ">
                                    {height.trim()}
                                  </span>
                                </div>
                              );
                            })}
                          <b className="border-b-2">Aproximadamente</b>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <div className="flex flex-col gap-3 ">
                        <div className="w-full">
                          <h4 className="mb-1 text-sm font-medium text-white ">
                            Colores:
                          </h4>
                        </div>
                        <div className="mr-4 flex flex-wrap gap-3">
                          {(recognition.color || "")
                            .split(",")
                            .map((color, index) => {
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
                                  <span className="text-xs font-bold text-dark dark:text-white">
                                    {color.trim()}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddRecognition(recognition)}
                        className="mt-3 rounded-sm bg-[#e11b24] px-9 py-2 text-center text-base font-medium text-white shadow-submit duration-300 hover:bg-[#e11b25]/90 dark:shadow-submit-dark"
                      >
                        Añadir
                      </button>
                      {addedRecognitionId === recognition.id && (
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
            <p className="text-dark">No se encontraron Reconocimientos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleRecognitions;
