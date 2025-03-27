"use client";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "../../../../public/images/hero/logo-repsell-icono.png";
import BubbleDecoration from "@/components/Common/BubbleDecoration";

const ProductMain = () => {
  const [trophies, setTrophies] = useState([]);
  const [recognitions, setRecognitions] = useState([]);
  const [promotional, setPromotional] = useState([]);
  const [medals, setMedals] = useState([]);
  const [impresion, setImpresion] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialColors = {
    trophies: "#004AAD",
    recognitions: "#E72603",
    promotional: "#004AAD",
    medals: "#E72603",
    impresion: "#BFBFBF",
  };

  const [backgroundColors, setBackgroundColors] = useState(initialColors);
  const [successMessages, setSuccessMessages] = useState({});

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("backgroundColors"));

    if (savedColors) {
      setBackgroundColors((prevColors) => ({
        ...prevColors,
        ...savedColors,
      }));
    }
  }, []);

  const handleColorChange = async (category, color) => {
    setBackgroundColors((prevColors) => ({
      ...prevColors,
      [category]: color,
    }));

    try {
      await axios.put(
        `https://repsell-international-backend.onrender.com/update-background`,
        {
          category,
          background: color,
        }
      );

      const updatedColors = { ...backgroundColors, [category]: color };
      localStorage.setItem("backgroundColors", JSON.stringify(updatedColors));
    } catch (error) {
      console.error("Error al actualizar el color de fondo:", error);
    }
  };

  const saveColor = (category) => {
    const updatedColors = { ...backgroundColors };
    localStorage.setItem("backgroundColors", JSON.stringify(updatedColors));

    setSuccessMessages((prevMessages) => ({
      ...prevMessages,
      [category]: `Color guardado para ${category}`,
    }));

    setTimeout(() => {
      setSuccessMessages((prevMessages) => ({
        ...prevMessages,
        [category]: null,
      }));
    }, 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [
        trophiesRes,
        recognitionsRes,
        promotionalRes,
        medalsRes,
        impresionRes,
      ] = await Promise.all([
        axios.get("https://repsell-international-backend.onrender.com/trophies"),
        axios.get("https://repsell-international-backend.onrender.com/recognitions"),
        axios.get("https://repsell-international-backend.onrender.com/promotional"),
        axios.get("https://repsell-international-backend.onrender.com/medals"),
        axios.get("https://repsell-international-backend.onrender.com/impresion"),
      ]);

      setTrophies(trophiesRes.data.data || []);
      setRecognitions(recognitionsRes.data.data || []);
      setPromotional(promotionalRes.data.data || []);
      setMedals(medalsRes.data.data || []);
      setImpresion(impresionRes.data.data || []);

      const newColors = {
        trophies: trophiesRes.data.data[0]?.background || "#004AAD",
        recognitions: recognitionsRes.data.data[0]?.background || "#E72603",
        promotional: promotionalRes.data.data[0]?.background || "#004AAD",
        medals: medalsRes.data.data[0]?.background || "#E72603",
        impresion: impresionRes.data.data[0]?.background || "#BFBFBF",
      };

      setBackgroundColors(newColors);
      localStorage.setItem("backgroundColors", JSON.stringify(newColors));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id, category) => {
    try {
      const response = await axios.delete(
        "https://repsell-international-backend.onrender.com/delete-product",
        {
          data: { id, category },
        }
      );
      if (response.status === 200) {
        alert("Producto eliminado correctamente.");
        fetchProducts();
      } else {
        alert("Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error eliminando el producto:", error);
      alert("Error en el servidor.");
    }
  };

  const renderProducts = (products, title, category) => (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
        {title}
      </h2>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="mb-6 flex flex-col items-center justify-center gap-3"
            >
              <div
                className="flex w-full justify-between rounded-md border border-white/10 bg-[#101933]/60 px-6 py-3 text-base text-white shadow-md backdrop-blur-md"
                style={{ background: backgroundColors[category] }}
              >
                {product.name || "No Name"}
                <div className="flex flex-row items-center gap-3">
                  <button onClick={() => deleteProduct(product.id, category)}>
                    <FaRegTrashAlt fontSize={20} className="text-white" />
                  </button>
                  <a href={`/editProducts?id=${product.id}&category=${category}`}>Editar</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70">No hay productos disponibles.</p>
        )}
      </div>
    </>
  );

  return (
    <section
      className="relative z-10 overflow-hidden py-24"
      style={{
        background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >

      <BubbleDecoration/>

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            {loading ? (
              <p className="text-white">Cargando...</p>
            ) : (
              <div className="mx-auto max-w-[1200px] rounded-xl bg-[#101933]/60 px-6 py-10 text-white shadow-xl backdrop-blur-md sm:p-[60px]">
                <Image
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  style={{ width: 80, height: 80, margin: "auto", marginBottom: 20 }}
                />
                <h3 className="mb-3 text-center text-3xl font-bold">PRODUCTOS DISPONIBLES</h3>
                <div className="mb-11 text-center text-white/80">
                  Estos son todos los productos ingresados y disponibles en la página.
                  <br /> ¿Deseas añadir uno nuevo? {" "}
                  <Link href="/newProduct" className="text-[#4A6CF7] hover:underline">
                    Añadir producto
                  </Link>
                </div>

                <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
                  Colores de fondo en productos
                </h2>

                <div className="mb-10 space-y-4">
                  {Object.entries(backgroundColors).map(([category, color]) => (
                    <div
                      key={category}
                      className="rounded-md bg-[#1a1f33]/60 p-4 shadow-md backdrop-blur-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h4 className="text-white font-semibold">
                          {{
                            trophies: "Trofeos",
                            recognitions: "Reconocimientos",
                            promotional: "Promocionales",
                            medals: "Medallas",
                            impresion: "Impresiones"
                          }[category] || category}
                        </h4>
                        <input
                          type="text"
                          value={color}
                          onChange={(e) => handleColorChange(category, e.target.value)}
                          className="w-full flex-1 rounded-md bg-[#101933] px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                          placeholder="Ej: #004AAD o linear-gradient(90deg, #1E3A8A ,#c8101c)"
                        />
                        <button
                          onClick={() => saveColor(category)}
                          className="rounded-md bg-red-700 hover:bg-[#c8101c] px-4 py-2 text-sm font-semibold text-white transition"
                        >
                          Guardar
                        </button>
                      </div>
                      {successMessages[category] && (
                        <p className="mt-2 text-sm text-green-400">✅ {successMessages[category]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {renderProducts(trophies, "Trofeos", "trophies")}
                {renderProducts(recognitions, "Reconocimientos", "recognitions")}
                {renderProducts(promotional, "Promocionales", "promotional")}
                {renderProducts(medals, "Medallas", "medals")}
                {renderProducts(impresion, "Impresiones", "impresion")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
