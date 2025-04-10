"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { colorMapping } from "@/utils/colorMapping";
import gold from "public/images/products/color/golden.jpeg";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";


const SingleRecognitions = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [addedRecognitionId, setAddedRecognitionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get(
          `${api}/backgrounds/recognitions`,
        );
        setBackgroundColor(data.color);
      } catch (error) {
        console.error("Error fetching recognitions background:", error);
      }
    };
    fetchBackground();
    // const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    // if (savedColors && savedColors.recognitions) {
    //   setBackgroundColor(savedColors.recognitions);
    // }
  }, []);

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        const {data} = await axios.get(`${api}/products/recognitions`);

        const uniquePromotional = data.filter(
          (promotional, index, self) =>
            index === self.findIndex((m) => m.name === promotional.name),
        );

        setRecognitions(uniquePromotional);
      } catch (error) {
        console.error("Error fetching recognitions:", error);
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
    <div
      className="w-full py-20"
      style={{
        background:
          "#0A0F24",
      }}
    >

      <BubbleDecoration/>

      <div className="container">
        {loading ? (
          <p className="text-center text-white">Cargando...</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-16">
            {recognitions.length > 0 ? (
              recognitions.map((item) => (
                <div
                  key={item.id}
                  className="w-[360px] rounded-xl bg-[#101933]/60 text-white shadow-xl backdrop-blur-md transition shadow-blue-500/30 hover:shadow-red-500/30"
                >
                  <div className="relative rounded-t-xl overflow-hidden" style={{ background: item.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}>
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                      {item.category}
                    </div>
                    <img
                      src={item.image || ""}
                      alt={item.name}
                      className="h-[230px] w-[230px] object-contain m-auto"
                    />
                  </div>

                  <div className="p-6 rounded-xl " style={{ background: item.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                      {item.description}
                    </p>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Tamaño:</p>
                      <ul className="ml-4 list-disc space-y-1 text-white/80">
                        {(item.height || "").split(",").map((h, i) => (
                          <li key={i}>{h.trim()}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Colores:</p>
                      <div className="flex flex-wrap gap-2">
                        {(item.color || "").split(",").map((color, i) => {
                          const colorKey = color.trim().toLowerCase();
                          const imageSrc = colorMapping[colorKey] || gold;
                          return (
                              <div key={i} className="w-6 h-6 rounded-full overflow-hidden ">
                              <Image
                                src={imageSrc}
                                alt={color.trim()}
                                width={28}
                                height={28}
                                className="w-full h-full object-cover"
                              />
                              </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                      <button
                        onClick={() => handleAddRecognition(item)}
                        className="rounded-full bg-[#e11b24] px-16 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#c8101c]"
                      >
                        Añadir
                      </button>
                      {addedRecognitionId === item.id && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-green-400">
                          Añadido correctamente <FaCheckCircle size={16} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No se encontraron Reconocimientos.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRecognitions;
