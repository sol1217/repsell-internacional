"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";
import gold from "public/images/products/color/golden.jpeg";
import {api} from "@/utils/config";
import promotional from "@/components/pages/productos/Promotional/Promotional";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import {Property} from "csstype";
import Background = Property.Background;
import {Product} from "@/types/product";

const SingleImpression = () => {
  const [impressions, setImpressions] = useState([]);
  const [addedImpressionId, setAddedImpressionId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#004AAD");

  useEffect(() => {
    // request base to obtain the background color
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get(
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
    <div
      className="w-full py-20"
      style={{
        background: "#0A0F24",
      }}
    >

      <BubbleDecoration/>

      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-16">
          {impressions.length > 0 ? (
            impressions.map((imp) => (
              <div
                key={imp.id}
                className="w-[360px] rounded-xl bg-[#101933]/60 text-white shadow-xl backdrop-blur-md transition shadow-blue-500/30 hover:shadow-red-500/30"
              >
                <div style={{ background: imp.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)"}} className="relative rounded-t-xl overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                    {imp.category}
                  </div>
                  <img
                    src={imp.image}
                    alt={imp.name}
                    className="h-[230px] w-[230px] object-contain m-auto"
                  />
                </div>

                <div
                  className="p-6 rounded-b-xl"
                  style={{ background: imp.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)"}}
                >
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {imp.name}
                  </h3>
                  <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                    {imp.description}
                  </p>

                  <div className="mb-4 text-sm">
                    <p className="mb-2 font-semibold text-white">Tamaño:</p>
                    <ul className="ml-4 list-disc space-y-1 text-white/80">
                      {(imp.height || "").split(",").map((h, i) => (
                        <li key={i}>{h.trim()}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 text-sm">
                    <p className="mb-2 font-semibold text-white">Colores:</p>
                    <div className="flex flex-wrap gap-2">
                      {(imp.color || "").split(",").map((color, i) => {
                        const colorKey = color.trim().toLowerCase();
                        const imageSrc = colorMapping[colorKey] || gold;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <Image
                              src={imageSrc}
                              alt={color.trim()}
                              width={20}
                              height={20}
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
                      onClick={() => handleAddImpression(imp)}
                      className="rounded-full bg-[#e11b24] px-16 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#c8101c]"
                    >
                      Añadir
                    </button>
                    {addedImpressionId === imp.id && (
                      <p className="mt-3 flex items-center gap-2 text-sm text-green-400">
                        Añadido correctamente <FaCheckCircle size={16} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No se encontraron impresiones.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImpression;
