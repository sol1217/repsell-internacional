"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../../../public/images/hero/logo-repsell-icono.png";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import {api} from "@/utils/config";
import {categoriesProducts, stylesProducts} from "@/config/constants";
import {useAuthProtection} from "@/hook/useAuthProtection";
import axiosInstance from "@/utils/axiosInstance";

const NewProduct = () => {
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedStyles, setSelectedStyles] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useAuthProtection();

  const handleChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleChangeStyle = (event) => {
    setSelectedStyles(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string" && result.startsWith("data:image")) {
          setPreview(result);
        } else {
          setPreview(`data:image/jpeg;base64,${result}`);
        }
      };

      reader.readAsDataURL(file);
    }
  };


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCleanup = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategoria) {
      alert("Por favor, selecciona una categoría.");
      return;
    }

    const endpoint = `${api}/products/${selectedCategoria}`;

    if (!endpoint) {
      setGlobalMessage({ text: "❌ Endpoint no encontrado para esta categoría.", type: "error" });
      setTimeout(() => setGlobalMessage(null), 3000);
      return;
    }


    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
      height: e.target.height.value,
      color: e.target.color.value,
      category: selectedStyles,
      image: preview,
    };


    try {
      const response = await axiosInstance.post(endpoint, data);

      if (response.status === 200 || response.status === 201){
        setGlobalMessage({ text: "✅ Producto enviado correctamente.", type: "success" });
      } else {
        setGlobalMessage({ text: "⚠️Hubo un error al enviar el producto. ", type: "error" });
      }
    } catch (error) {
      setGlobalMessage({ text: "❌ Error en la conexión. Intenta más tarde", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };

  return (
    <div
      className="relative z-10 overflow-hidden"
      style={{
        background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >

       <BubbleDecoration/>

      <section className="py-24">
        <div className="container">

          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-10/12 xl:w-9/12">
              <div className="mx-auto rounded-xl bg-[#101933]/60 px-6 py-10 text-white shadow-xl backdrop-blur-md sm:p-[60px]">

                <Image
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  style={{ width: 80, height: 80, margin: "auto", marginBottom: 20 }}
                />
                <h3 className="mb-3 text-center text-3xl font-bold drop-shadow">
                  AÑADE UN NUEVO PRODUCTO
                </h3>
                <p className="mb-10 text-center text-base font-medium text-white/80">
                  Ingresa todos los datos: Una vez completados todos los campos, verifique que los datos sean correctos y estén actualizados para garantizar su correcta visualización en la plataforma.
                </p>

                <p className="text-lg font-bold text-center text-white/80">
                  Nota:
                </p>

                <p className="mb-5 text-center text-green-600">
                  ¡Recuerda usar imagenes optimizadas (no +100KG) y/o comprimelas!
              <br/>
                  *LLENA TODOS LOS DATOS CON SUS VALORES CORRECTOS*
                </p>

                <select
                  className="mb-6 w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                  value={selectedCategoria}
                  onChange={handleChange}
                >
                  {categoriesProducts.map((categoria) => (
                    <option key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="mb-6 w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white hover:bg-[#1f2e4a] transition"
                >
                  Subir Imagen del producto
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {preview && (
                  <div className="mb-8 flex items-center justify-center">
                    <Image
                      width={200}
                      height={200}
                      src={preview}
                      alt="Vista previa"
                      className="h-auto max-w-full rounded-md border border-white/20"
                      onLoad={handleCleanup}
                    />
                  </div>
                )}



                <div className="mb-10 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-white/30 sm:block"></span>
                  <p className="mx-4 text-center text-sm font-medium text-white/60">
                    --- Información General ---
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-white/30 sm:block"></span>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm mb-2">Nombre del Producto:</label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Ingresa el código o nombre"
                        className="w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Descripción:</label>
                      <input
                        type="text"
                        name="description"
                        placeholder="Descripción detallada"
                        className="w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Altura/Tamaño:</label>
                      <input
                        maxLength={20}
                        type="text"
                        name="height"
                        placeholder="Altura en cm"
                        className="w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                      />
                    </div>
                    <p className=" text-green-600">En la altura coloca (cm) al lado</p>
                    <div>
                      <label className="block text-sm mb-2">Colores:</label>
                      <input
                        type="text"
                        name="color"
                        placeholder="Colores disponibles"
                        className="w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                      />
                    </div>

                    <p className=" text-green-600"> <b className="text-white">Lista colores: </b>
                      verde,
                      negro,
                      azul,
                      celeste,
                      bronce,
                      cafe,
                      oro,
                      gris,
                      naranja,
                      rojo,
                      plata,
                      blanco,
                      amarillo,
                      blue pastel,
                      nogal,
                      beige,
                      full color,
                      transparente, </p>
                    <div>
                      <label className="block text-sm mb-2">Categoría:</label>
                      <select
                        required
                        name="category"
                        value={selectedStyles}
                        onChange={handleChangeStyle}
                        className="w-full rounded-md bg-[#1a1f33] px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                      >
                        {stylesProducts.map((style) => (
                          <option key={style.value} value={style.value}>
                            {style.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {globalMessage && (
                    <div
                      className={`my-6 rounded-md px-4 py-3 text-center text-sm font-medium ${
                        globalMessage.type === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"
                      }`}
                    >
                      {globalMessage.text}
                    </div>
                  )}


                  <button
                    type="submit"
                    className="mt-10 w-full rounded-full bg-[#e11b24] px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-[#c8101c]"
                  >
                    Guardar producto
                  </button>
                </form>


              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProduct;
