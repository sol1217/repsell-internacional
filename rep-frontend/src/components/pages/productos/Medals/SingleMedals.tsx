"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import error from "public/images/hero/error.png";
import white from "public/images/products/color/white.jpeg";
import { colorMapping } from "@/utils/colorMapping";
import { api } from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";

const SingleMedals = () => {
  const [medals, setMedals] = useState([]);
  const [addedMedalId, setAddedMedalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get(`${api}/backgrounds/medals`);
        if (data && data.color) {
          setBackgroundColor(data.color);
        }
      } catch (error) {
        console.error("Error fetching medals background:", error);
      }
    };
    fetchBackground();
  }, []);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const { data } = await axios.get(`${api}/products/medals`);
        const uniqueMedals = data.filter(
          (medal, index, self) =>
            index === self.findIndex((m) => m.name === medal.name)
        );
        setMedals(uniqueMedals);
      } catch (error) {
        console.error("Error fetching medals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedals();
  }, []);

  const handleAddToLocalStorage = (medal) => {
    let storedItems = JSON.parse(localStorage.getItem("selectedMedals")) || [];
    storedItems.push(medal);
    localStorage.setItem("selectedMedals", JSON.stringify(storedItems));
    setAddedMedalId(medal.id);
    setTimeout(() => setAddedMedalId(null), 3000);
  };

  return (
    <div
      className="w-full py-20"
      style={{ background: "#0A0F24" }}
    >
      <BubbleDecoration />

      <div className="container">
        {loading ? (
          <p className="text-center text-white">Cargando...</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-16">
            {medals.length > 0 ? (
              medals.map((medal) => (
                <div
                  key={medal.id}
                  className="w-[360px] rounded-xl bg-[#101933]/60 text-white shadow-xl backdrop-blur-md transition shadow-blue-500/30 hover:shadow-red-500/30"
                >
                  <div
                    className="relative rounded-t-xl overflow-hidden"
                    style={{ background: medal.background || backgroundColor }}
                  >
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                      {medal.category}
                    </div>
                    <img
                      src={medal.image || error}
                      alt={medal.name}
                      className="h-[230px] w-[230px] object-contain m-auto"
                    />
                  </div>
                  <div
                    className="p-6 rounded-b-xl"
                    style={{ background: medal.background || backgroundColor }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {medal.name}
                    </h3>
                    <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                      {medal.description}
                    </p>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Tamaño:</p>
                      <ul className="ml-4 list-disc space-y-1 text-white/80">
                        {(medal.height || "").split(",").map((h, i) => (
                          <li key={i}>{h.trim()}</li>
                        ))}
                      </ul>
                      <p className="text-white/80 underline decoration-white ">(Aproximadamente)</p>
                    </div>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Colores:</p>
                      <div className="flex flex-wrap gap-2">
                        {(medal.color || "").split(",").map((color, i) => {
                          const colorKey = color.trim().toLowerCase();
                          const imageSrc = colorMapping[colorKey] || white;
                          return (
                            <div key={i} className="w-6 h-6 rounded-full overflow-hidden">
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
                        onClick={() => handleAddToLocalStorage(medal)}
                        className="rounded-full bg-[#e11b24] px-16 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#c8101c]"
                      >
                        Añadir
                      </button>
                      {addedMedalId === medal.id && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-green-400">
                          Añadido correctamente <FaCheckCircle size={16} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No se encontraron medallas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMedals;
