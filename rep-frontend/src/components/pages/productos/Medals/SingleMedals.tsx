"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import error from "public/images/hero/error.png";
import white from "public/images/products/color/white.jpeg";

import { colorMapping } from "@/utils/colorMapping";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import {Property} from "csstype";
import Background = Property.Background;
import {Product} from "@/types/product";

const SingleMedals = () => {
  const [medals, setMedals] = useState([]);
  const [addedMedalId, setAddedMedalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    // request base to obtain the background color
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get(
          `${api}/backgrounds/medals`,
        );
        setBackgroundColor(data.color);
      } catch (error) {
        console.error("Error fetching medals background:", error);
      }
    };
    fetchBackground();
    // const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    // if (savedColors && savedColors.medals) {
    //   setBackgroundColor(savedColors.medals);
    // }
  }, []);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const {data} = await axios.get(
          `${api}/products/medals`,
        );

        const uniquePromotional = data.filter(
          (promotional, index, self) =>
            index === self.findIndex((m) => m.name === promotional.name),
        );

        setMedals(uniquePromotional);
      } catch (error) {
        console.error("Error fetching promotional:", error);
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
      style={{
        background: "#0A0F24",
      }}
    >

      <BubbleDecoration/>

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
                  <div className="relative rounded-t-xl overflow-hidden" style={{ background: medal.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)"}}>
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                      {medal.category}
                    </div>
                    <img
                      src={medal.image || error}
                      alt={medal.name}
                      className="h-[230px] w-[230px] object-contain m-auto"
                    />
                  </div>

                  <div className="p-6 rounded-b-xl" style={{ background: medal.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {medal.name}
                    </h3>
                    <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                      {medal.description}
                    </p>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Tamaño:</p>
                      <p className="text-white/80">{medal.height} CM</p>
                    </div>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Colores:</p>
                      <div className="flex flex-wrap gap-2">
                        {(medal.color || "").split(",").map((color, i) => {
                          const colorKey = color.trim().toLowerCase();
                          const imageSrc = colorMapping[colorKey] || white;
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <Image
                                src={imageSrc}
                                alt={color.trim()}
                                width={20}
                                height={20}
                                className="rounded-full"
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
