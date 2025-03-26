"use client";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
        },
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
        axios.get(
          //"https://repsell-international-backend.onrender.com/trophies",
          "http://localhost:3001/products/trophies",
        ),
        axios.get(
          "http://localhost:3001/products/recognitions",
          //"https://repsell-international-backend.onrender.com/recognitions",
        ),
        axios.get(
          "http://localhost:3001/products/promotional",
          //"https://repsell-international-backend.onrender.com/promotional",
        ),
        axios.get(
          "http://localhost:3001/products/medals"),
          //"https://repsell-international-backend.onrender.com/medals"),
        axios.get(
          "http://localhost:3001/products/impresion",
          //"https://repsell-international-backend.onrender.com/impresion",
        ),
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
        //"https://repsell-international-backend.onrender.com/products/${category}/${id}",
        `http://localhost:3001/products/${category}/${id}`,
        {
          data: { id, category },
        },
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
      <h2 className="mb-8 text-center" style={{ fontSize: "26px" }}>
        {title}
      </h2>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="mb-6 flex flex-col items-center justify-center gap-3"
            >
              <div className="border-stroke flex w-full justify-between rounded-sm border border-primary bg-[#f8f8f8] bg-primary/5 px-6 py-3 text-base outline-none transition-all duration-300 dark:border-primary dark:border-transparent dark:bg-[#2C303B] dark:bg-primary/5 dark:text-body-color-dark dark:text-primary dark:shadow-two dark:hover:shadow-none">
                {product.name || "No Name"}

                <div className="flex flex-row items-center justify-center gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => deleteProduct(product.id, category)}
                  >
                    <FaRegTrashAlt fontSize={20} color="white dark:b-primary" />
                  </button>
                  <a
                    href={`/editProducts?id=${product.id}&category=${category}`}
                  >
                    Editar
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos disponibles.</p>
        )}
      </div>
    </>
  );

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[10px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              {loading ? (
                <p className="text-dark">Cargando...</p>
              ) : (
                <div className="mx-auto max-w-[1200px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    PRODUCTOS DISPONIBLES
                  </h3>
                  <div className="mb-11 text-center text-base font-medium text-body-color">
                    Estos son todos los productos ingresados y disponibles en la
                    página.
                    <br /> ¿Deseas añadir uno nuevo?
                    <Link
                      href="/newProduct"
                      className="text-primary hover:underline"
                    >
                      Añadir producto
                    </Link>
                  </div>
                  <div>
                    <h2
                      className="mb-8 text-center"
                      style={{ fontSize: "26px" }}
                    >
                      Colores de fondo en productos
                    </h2>
                    <div className="mb-6 flex flex-col items-center justify-center gap-3 ">
                      {Object.entries(backgroundColors).map(
                        ([category, color]) => (
                          <div
                            key={category}
                            className="border-stroke flex w-full justify-between rounded-sm border border-primary bg-primary/5 px-6 py-3 text-base"
                            style={{ background: color }}
                          >
                            {category.toUpperCase()}
                            <div className="flex  w-2/3 flex-row items-center justify-center gap-3">
                              <input
                                type="text"
                                placeholder="Ej: #004AAD o linear-gradient(90deg, #004AAD, #E72603)"
                                value={color || ""}
                                onChange={(e) =>
                                  handleColorChange(category, e.target.value)
                                }
                                className="w-full px-2 py-1"
                              />
                              <button
                                onClick={() => saveColor(category)}
                                className="text-primary hover:underline"
                              >
                                Editar
                              </button>
                            </div>
                            {successMessages[category] && (
                              <h3 className="mt-2 text-sm text-green-600">
                                ✅ {successMessages[category]}
                              </h3>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  {renderProducts(trophies, "Trofeos", "trophies")}
                  {renderProducts(
                    recognitions,
                    "Reconocimientos",
                    "recognitions",
                  )}
                  {renderProducts(promotional, "Promocionales", "promotional")}
                  {renderProducts(medals, "Medallas", "medals")}
                  {renderProducts(impresion, "Impresiones", "impresion")}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default ProductMain;
