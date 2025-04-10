"use client";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "public/images/hero/logo-repsell-icono.png";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import { api } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";
import { useAuthProtection } from "@/hook/useAuthProtection";

const ProductMain = () => {
  const [trophies, setTrophies] = useState([]);
  const [recognitions, setRecognitions] = useState([]);
  const [promotional, setPromotional] = useState([]);
  const [medals, setMedals] = useState([]);
  const [prints, setPrint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backgroundIds, setBackgroundIds] = useState<Record<string, number>>({});

  const initialColors = {
    trophies: "#004AAD",
    recognitions: "#E72603",
    promotional: "#004AAD",
    medals: "#E72603",
    print: "#BFBFBF",
  };

  useAuthProtection();

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
      const backgroundId = backgroundIds[category];
      if (!backgroundId) {
        console.error(`No se encontró un backgroundId para la categoría: ${category}`);
        return;
      }

      await axiosInstance.patch(`${api}/backgrounds/${backgroundId}`, {
        color,
      });

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

  type BackgroundColors = {
    trophies: string;
    recognitions: string;
    promotional: string;
    medals: string;
    print: string;
  };

  const fetchProducts = async () => {
    try {
      const categories = [
        { key: "trophies", endpoint: "trophies", setter: setTrophies },
        { key: "recognitions", endpoint: "recognitions", setter: setRecognitions },
        { key: "promotional", endpoint: "promotional", setter: setPromotional },
        { key: "medals", endpoint: "medals", setter: setMedals },
        { key: "prints", endpoint: "prints", setter: setPrint },
      ];

      const endpoints = [
        ...categories.map(({ endpoint }) =>
          axiosInstance.get(`${api}/products/${endpoint}`),
        ),
        axiosInstance.get(`${api}/backgrounds`),
      ];

      const allResponses = await Promise.all(endpoints);
      const backgroundRes = allResponses.pop()!;
      const productResponses = allResponses;

      categories.forEach(({ setter }, index) => {
        setter(productResponses[index]?.data || []);
      });

      const backgroundData = backgroundRes.data;

      const defaultColors: BackgroundColors = {
        trophies: "#000000",
        recognitions: "#E72603",
        promotional: "#004AAD",
        medals: "#E72603",
        print: "#BFBFBF",
      };

      const apiColors = backgroundData.reduce((colorMap, item) => {
        colorMap[item.name] = item.color;
        return colorMap;
      }, {} as Record<keyof BackgroundColors, string | undefined>);

      const idsByCategory = backgroundData.reduce((acc, item) => {
        acc[item.name] = item.id;
        return acc;
      }, {} as Record<string, number>);

      setBackgroundIds(idsByCategory);

      const newColors = categories.reduce((colorsObject, category) => {
        const categoryKey = category.key;
        colorsObject[categoryKey] = apiColors[categoryKey] || defaultColors[categoryKey];
        return colorsObject;
      }, {} as BackgroundColors);

      setBackgroundColors(newColors);
      localStorage.setItem("backgroundColors", JSON.stringify(newColors));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const deleteProduct = async (id, category) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`${api}/products/${category}/${id}`);
      if (response.status === 200 || response.status === 204) {
        setGlobalMessage({ text: "✅ Producto eliminado correctamente.", type: "success" });
        fetchProducts();
      } else {
        setGlobalMessage({ text: "⚠️ Error al eliminar el producto.", type: "error" });
      }
    } catch (error) {
      console.error("Error eliminando el producto:", error.response?.data || error.message);
      setGlobalMessage({ text: "❌Hubo un error al eliminar el producto, Intenta nuevamente.", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
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
            <div key={product.id} className="mb-6 flex flex-col items-center justify-center gap-3">
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
      <BubbleDecoration />

      {globalMessage && (
        <div
          className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md px-6 py-4 text-center text-base font-medium shadow-lg backdrop-blur-md ${
            globalMessage.type === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"
          }`}
        >
          {globalMessage.text}
        </div>
      )}

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
                  A continuación, se presenta el listado completo de todos los productos que han sido ingresados y que actualmente se encuentran disponibles en la página.
                  <br /> ¿Deseas añadir uno nuevo?{" "}
                  <Link href="/newProduct" className="text-red-700 font-bold hover:underline">
                    Añadir producto
                  </Link>
                </div>

                <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
                  Colores de fondo en productos
                </h2>

                <p className="mb-8 text-center text-sm font-bold text-green-600 drop-shadow">
                  #004AAD o linear-gradient(90deg, #1E3A8A ,#c8101c)
                </p>

                <div className="mb-10 space-y-4">
                  {Object.entries(backgroundColors).map(([category, color]) => (
                    <div key={category} className="rounded-md bg-[#1a1f33]/60 p-4 shadow-md backdrop-blur-md">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h4 className="text-white font-semibold">
                          {{
                            trophies: "Trofeos",
                            recognitions: "Reconocimientos",
                            promotional: "Promocionales",
                            medals: "Medallas",
                            prints: "Impresiones",
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
                {renderProducts(print, "Impresiones", "impresion")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
