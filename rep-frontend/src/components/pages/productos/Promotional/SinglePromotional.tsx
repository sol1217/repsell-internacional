"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";

const SinglePromotional = () => {
  const [promotionals, setPromotionals] = useState([]);
  const [addedPromotionalId, setAddedPromotionalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#004AAD");

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));
    if (savedColors && savedColors.promotional) {
      setBackgroundColor(savedColors.promotional);
    }
  }, []);

  useEffect(() => {
    const fetchPromotional = async () => {
      try {
        const response = await axios.get(
          `${api}/products/promotional`,
        );

        const uniquePromotional = response.data.data.filter(
          (promotional, index, self) =>
            index === self.findIndex((m) => m.name === promotional.name),
        );

        setPromotionals(uniquePromotional);
      } catch (error) {
        console.error("Error fetching promotional:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotional();
  }, []);

  const handleAddToLocalStorage = (promotional) => {
    let storedItems =
      JSON.parse(localStorage.getItem("selectedPromotionals")) || [];
    storedItems.push(promotional);
    localStorage.setItem("selectedPromotionals", JSON.stringify(storedItems));
    setAddedPromotionalId(promotional.id);
    setTimeout(() => setAddedPromotionalId(null), 3000);
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
            {promotionals.length > 0 ? (
              promotionals.map((promotional) => (
                <div
                  key={promotional.id}
                  className="w-[360px] rounded-xl bg-[#101933]/60 text-white shadow-xl backdrop-blur-md transition shadow-blue-500/30 hover:shadow-red-500/30"
                >
                  <div style={{ background: promotional.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }} className="relative rounded-t-xl overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white">
                      {promotional.category}
                    </div>
                    <img
                      src={promotional.image || ""}
                      alt={promotional.name}
                      className="h-[230px] w-[230px] object-contain m-auto"
                    />
                  </div>

                  <div
                    className="p-6 rounded-b-xl"
                    style={{ background: promotional.background || "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)" }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-white">
                      <Link href="/blog-details">
                        {promotional.name}
                      </Link>
                    </h3>
                    <p className="mb-4 border-b border-white/20 pb-4 text-sm text-white/80">
                      {promotional.description}
                    </p>

                    <div className="mb-4 text-sm">
                      <p className="mb-2 font-semibold text-white">Tamaño:</p>
                      <p className="text-white/80">{promotional.height}</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <h4 className="text-sm font-medium text-white">Colores:</h4>
                      <button
                        onClick={() => handleAddToLocalStorage(promotional)}
                        className="rounded-full bg-[#e11b24] px-16 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#c8101c]"
                      >
                        Añadir
                      </button>
                      {addedPromotionalId === promotional.id && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-green-400">
                          Añadido correctamente <FaCheckCircle size={16} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No se encontraron promocionales.</p>
            )}
          </div>
        )}
      </div>
    </div>
      )}



export default SinglePromotional;
