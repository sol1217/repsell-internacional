"use client";

import React, { useRef, useState } from "react";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import Image from "next/image";
import logo from "../../../../../public/images/hero/logo-repsell-icono.png";

const NewBlog = () => {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categorias = [
    { value: "", label: "Elegir Categoria", href: "" },
    { value: "medallas", label: "medallas", href: "/medals" },
    {
      value: "recognitions",
      label: "Reconocimientos",
      href: "/recognitions",
    },
    {
      value: "trophiesAndCups",
      label: "Trofeos y Copas",
      href: "/trophiesAndCups",
    },
    { value: "promotional", label: "Promocionales", href: "/promotiona´" },
    { value: "impression", label: "Impresiones", href: "/impression" },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;

        if (typeof base64Image === "string") {
          setPreview(base64Image);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataPost = new FormData(e.target);

      console.log(e.target);

      formDataPost.append("image", preview);

      const response = await fetch(
        "https://repsell-international-backend.onrender.com/blogs",
        {
          method: "POST",
          body: formDataPost,
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Blog creado exitosamente:", data);
        setMessage("Blog creado exitosamente!");
      } else {
        console.error("Error al crear el blog");
        setMessage("Error al crear el blog. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectarse al backend:", error);
      setMessage(
        "Error al conectarse al backend. Por favor, intenta nuevamente.",
      );
    }
  };

  return (
    <section
      className="relative z-10 overflow-hidden py-24"
      style={{
        background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >
      <BubbleDecoration/>

      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
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
                AÑADIR NUEVO BLOG
              </h3>
              <p className="mb-10 mx-16 text-center text-white/80">
                Completa los siguientes campos para crear una entrada de blog informativa, atractiva y alineada con los intereses de tus clientes.
              </p>

              <p className="text-lg font-bold text-center text-white/80">
                Nota:
              </p>

              <p className="mb-10 text-center text-green-600">
                ¡Recuerda para dividir en saltos de linea los parrafos y/o textos usar ( ; ) punto y coma!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">Imagen:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                    />
                  </div>

                  {preview && (
                    <div className="mb-6">
                      <img src={preview} alt="Vista previa" className="mx-auto rounded-md shadow-md" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm mb-2">Categoría:</label>
                    <select
                      name="category"
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white"
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria.value} value={categoria.value}>
                          {categoria.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Título del Blog:</label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Ingresa un título"
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Introducción:</label>
                    <textarea
                      name="description"
                      required
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Escribe la introducción"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Subtítulo 1:</label>
                    <input
                      type="text"
                      name="additionalTitle"
                      required
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Ingresa un subtítulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Párrafo:</label>
                    <textarea
                      name="additionalText"
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Texto del párrafo"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Subtítulo 2:</label>
                    <input
                      type="text"
                      name="subtitle"
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Subtítulo adicional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Párrafo 2:</label>
                    <textarea
                      name="paragraph"
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Segundo párrafo"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Conclusión:</label>
                    <input
                      name="list"
                      required
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Escribe la conclusión"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Frase final:</label>
                    <textarea
                      name="phrase"
                      required
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white placeholder-white/50"
                      placeholder="Frase o párrafo final"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#e11b24] px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-[#c8101c]"
                  >
                    Publicar Blog
                  </button>

                  {message && (
                    <div
                      className={`mt-6 text-center text-sm font-medium ${message.includes("exitosamente") ? "text-green-500" : "text-red-500"}`}
                    >
                      {message}
                    </div>
                  )}
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-white/80">
                ¿Quieres ver tus blogs publicados? {" "}
                <a href="/blog" className="text-[#4A6CF7] hover:underline">
                  Ir al Blog
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewBlog;
