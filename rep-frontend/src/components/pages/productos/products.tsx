"use client";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import logo from "public/images/hero/logo-repsell-icono.png";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import { api } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";
import { useAuthProtection } from "@/hook/useAuthProtection";

type BackgroundColors = {
  trophies: string;
  recognitions: string;
  promotional: string;
  medals: string;
  prints: string;
};

const DEFAULT_COLORS: BackgroundColors = {
  trophies: "#004AAD",
  recognitions: "#E72603",
  promotional: "#004AAD",
  medals: "#E72603",
  prints: "#BFBFBF",
};

type BackgroundRecord = {
  id: number;
  name: string;
};

const ProductMain = () => {
  const [trophies, setTrophies] = useState([]);
  const [recognitions, setRecognitions] = useState([]);
  const [promotional, setPromotional] = useState([]);
  const [medals, setMedals] = useState([]);
  const [prints, setPrint] = useState([]);
  const [loading, setLoading] = useState(true);

  const [backgroundColors, setBackgroundColors] = useState<BackgroundColors>(DEFAULT_COLORS);
  const [backgroundRecords, setBackgroundRecords] = useState<Record<string, BackgroundRecord>>({});
  const [successMessages, setSuccessMessages] = useState<Record<string, string | null>>({});
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useAuthProtection();

  const fetchProducts = useCallback(async () => {
    try {
      const categories = [
        { key: "trophies", endpoint: "trophies", setter: setTrophies },
        { key: "recognitions", endpoint: "recognitions", setter: setRecognitions },
        { key: "promotional", endpoint: "promotional", setter: setPromotional },
        { key: "medals", endpoint: "medals", setter: setMedals },
        { key: "prints", endpoint: "prints", setter: setPrint },
      ];

      const productRequests = categories.map(({ endpoint }) =>
        axiosInstance.get(`${api}/products/${endpoint}`)
      );
      const backgroundsRequest = axiosInstance.get(`${api}/backgrounds`);

      const responses = await Promise.all([
        ...productRequests,
        backgroundsRequest,
      ]);
      const productResponses = responses.slice(0, productRequests.length);
      const backgroundsResponse = responses[productRequests.length];

      categories.forEach((category, index) => {
        category.setter(productResponses[index]?.data || []);
      });

      const backgroundData = backgroundsResponse.data;

      const apiColors = backgroundData.reduce((acc: Partial<BackgroundColors>, item: any) => {
        acc[item.name] = item.color;
        return acc;
      }, {});

      const records = backgroundData.reduce((acc: Record<string, BackgroundRecord>, item: any) => {
        acc[item.name] = { id: item.id, name: item.name };
        return acc;
      }, {});

      setBackgroundRecords(records);

      const newColors: BackgroundColors = categories.reduce((acc, category) => {
        acc[category.key as keyof BackgroundColors] = apiColors[category.key] || DEFAULT_COLORS[category.key as keyof BackgroundColors];
        return acc;
      }, {} as BackgroundColors);

      setBackgroundColors(newColors);
    } catch (error) {
      console.error("Error fetching products and backgrounds: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleColorInputChange = (category: keyof BackgroundColors, color: string) => {
    setBackgroundColors(prev => ({
      ...prev,
      [category]: color,
    }));
  };

  const saveColor = async (category: keyof BackgroundColors) => {
    const backgroundRecord = backgroundRecords[category];
    if (!backgroundRecord) {
      console.error(`No se encontró la información del background para la categoría: ${category}`);
      return;
    }
    try {
      await axiosInstance.patch(`${api}/backgrounds/${backgroundRecord.id}`, {
        color: backgroundColors[category],
        name: backgroundRecord.name,
      });
      setSuccessMessages(prev => ({
        ...prev,
        [category]: `Color guardado para ${category}`,
      }));
    } catch (error) {
      console.error("Error al actualizar el color de fondo:", error);
    }
    setTimeout(() => {
      setSuccessMessages(prev => ({
        ...prev,
        [category]: null,
      }));
    }, 3000);
  };

  const deleteProduct = async (id: number, category: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      const response = await axiosInstance.delete(`${api}/products/${category}/${id}`);
      if (response.status === 200 || response.status === 204) {
        setGlobalMessage({ text: "✅ Producto eliminado correctamente.", type: "success" });
        fetchProducts();
      } else {
        setGlobalMessage({ text: "⚠️ Error al eliminar el producto.", type: "error" });
      }
    } catch (error: any) {
      console.error("Error eliminando el producto:", error.response?.data || error.message);
      setGlobalMessage({ text: "❌ Hubo un error al eliminar el producto, intenta nuevamente.", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };

  const renderProducts = (products: any[], title: string, category: keyof BackgroundColors) => (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
        {title}
      </h2>
      <div>
        {products.length > 0 ? (
          products.map((product: any) => (
            <div key={product.id} className="mb-6 flex flex-col items-center justify-center gap-3">
              <div
                className="flex w-full justify-between rounded-md border border-white/10 bg-[#101933]/60 px-6 py-3 text-base text-white shadow-md backdrop-blur-md"
                style={{ background: backgroundColors[category] }}
              >
                {product.name || "No Name"}
                <div className="flex flex-row items-center gap-3">
                  <button onClick={() => deleteProduct(product.id, category as string)}>
                    <FaRegTrashAlt fontSize={20} className="text-white" />
                  </button>
                  <Link href={`/editProducts?id=${product.id}&category=${category}`}>
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70">Aún no hay productos disponibles. Espera unos segundos mientras se cargan.</p>
        )}
      </div>
    </>
  );

  return (
    <section
      className="relative z-10 overflow-hidden py-24"
      style={{ background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)" }}
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
                  A continuación, se presenta el listado completo de todos los productos ingresados y disponibles.
                  <br />
                  ¿Deseas añadir uno nuevo?{" "}
                  <Link href="/newProduct" className="text-red-700 font-bold hover:underline">
                    Añadir producto
                  </Link>
                </div>

                <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
                  Colores de fondo en productos
                </h2>

                <p className="mb-8 text-center text-sm font-bold text-green-600 drop-shadow">
                  Ejemplo un solo color: <b>#004AAD</b><br/>
                  Ejemplo degradados lineales: <b>linear-gradient(90deg, #1E3A8A ,#c8101c)</b><br/>
                  Ejemplo circular: <b>radial-gradient(circle at bottom, #000000 30% ,#004AAD 70%)</b><br/>
                  Ejemplo diagonal: <b>linear-gradient(45deg, #00C9FF, #92FE9D)</b><br/>
                  Ejemplo fondo arcoíris: <b>linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)</b><br/>
                  Ejemplo con transparencia: <b>rgba(0, 74, 173, 0.5)</b><br/>
                  Ejemplo con fondo repetido: <b>repeating-linear-gradient(45deg, #444, #444 10px, #888 10px, #888 20px)</b><br/>
                  Ejemplo radial con transparencia: <b>radial-gradient(circle, rgba(0,0,0,0.6), transparent)</b><br/>
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
                          onChange={(e) =>
                            handleColorInputChange(category as keyof BackgroundColors, e.target.value)
                          }
                          className="w-full flex-1 rounded-md bg-[#101933] px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                          placeholder="#004AAD o linear-gradient(90deg, #1E3A8A ,#c8101c)"
                        />
                        <button
                          onClick={() => saveColor(category as keyof BackgroundColors)}
                          className="rounded-md bg-red-700 hover:bg-[#c8101c] px-4 py-2 text-sm font-semibold text-white transition"
                        >
                          Guardar
                        </button>
                      </div>
                      {successMessages[category] && (
                        <p className="mt-2 text-sm text-green-400">
                          ✅ {successMessages[category]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {renderProducts(trophies, "Trofeos", "trophies")}
                {renderProducts(recognitions, "Reconocimientos", "recognitions")}
                {renderProducts(promotional, "Promocionales", "promotional")}
                {renderProducts(medals, "Medallas", "medals")}
                {renderProducts(prints, "Impresiones", "prints")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
