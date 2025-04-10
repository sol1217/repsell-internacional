"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { colorMapping } from "@/utils/colorMapping";
import { FaCheckCircle } from "react-icons/fa";
import error from "public/images/hero/error.png";
import transp from "public/images/products/color/transparent.png";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import {Product} from "@/types/product";


const SingleTrophiesAndCups = () => {
  const [trophies, setTrophies] = useState([]);
  const [addedTrophyId, setAddedTrophyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    // request base to obtain the background color
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get(`${api}/backgrounds/trophies`);
        console.log("🎨 Fondo recibido:", data);
        setBackgroundColor(data.color);
      } catch (error) {
        console.error("Error fetching trophies background:", error);
      }
    };
    fetchBackground();
    // const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    // if (savedColors && savedColors.trophies) {
    //   setBackgroundColor(savedColors.trophies);
    // }

    const fetchTrophies = async () => {
      try {
        const {data} = await axios.get<Product[]>(
          `${api}/products/trophies`,
        );
        setTrophies(data);
      } catch (error) {
        console.error("Error fetching trophies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrophies();
  }, []);

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${api}/products/trophies`,
        );

        const uniquePromotional = response.data.filter(
          (promotional, index, self) =>
            index === self.findIndex((m) => m.name === promotional.name),
        );

        setTrophies(uniquePromotional);
      } catch (error) {
        console.error("Error fetching promotional:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrophies();
  }, []);

  const handleAddTrophy = (trophy) => {
    const storedTrophies = JSON.parse(localStorage.getItem("trophies")) || [];
    const updatedTrophies = [...storedTrophies, trophy];
    localStorage.setItem("trophies", JSON.stringify(updatedTrophies));
    setAddedTrophyId(trophy.id);
    setTimeout(() => setAddedTrophyId(null), 3000);
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
            {trophies.length > 0 ? (
              trophies.map((trophy) => (
                <div
                  key={trophy.id}
                  style={{ background: backgroundColor || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}
                  className="w-[360px] rounded-xl text-white shadow-xl backdrop-blur-md transition shadow-blue-500/30 hover:shadow-red-500/30"
                >

                  <div style={{ background: backgroundColor || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}  className="relative rounded-t-xl overflow-hidden">
                    <div className="absolute  top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                      {trophy.category}
                    </div>
                    <img
                      src={trophy.image || error}
                      alt={trophy.name}
                      className="h-[230px] w-[230px] object-contain m-auto"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2  text-xl font-bold text-white">
                      {trophy.name}
                    </h3>
                    <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                      {trophy.description}
                    </p>

                    <div className="mb-4 text-sm" >
                      <p className="mb-2 font-semibold text-white">Tamaño:</p>
                      <ul className="ml-4 list-disc space-y-1 text-white/80">
                        {(trophy.height || "").split(",").map((h, i) => (
                          <li key={i}>{h.trim()}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Colores:</p>
                      <div className="flex flex-wrap gap-2">
                        {(trophy.color || "").split(",").map((color, i) => {
                          const colorKey = color.trim().toLowerCase();
                          const imageSrc = colorMapping[colorKey] || transp;
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <Image
                                src={imageSrc}
                                alt={color.trim()}
                                width={24}
                                height={24}
                                className="rounded-full "
                              />
                              <span className="text-xs text-white/80">
                                {color.trim()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                      <button
                        onClick={() => handleAddTrophy(trophy)}
                        className="rounded-full bg-[#e11b24] px-16 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#c8101c]"
                      >
                        Añadir
                      </button>
                      {addedTrophyId === trophy.id && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-green-400">
                          Añadido correctamente <FaCheckCircle size={16} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No se encontraron trofeos y copas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTrophiesAndCups;
