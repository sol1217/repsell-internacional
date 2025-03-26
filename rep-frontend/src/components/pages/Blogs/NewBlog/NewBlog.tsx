"use client";

import React, { useRef, useState } from "react";

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
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[10px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[1200px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                AÑADIR NUEVO BLOG
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Completa los siguientes campos para crear una entrada de blog
                informativa y atractiva para tus clientes.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="image"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Imagen:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>

                {preview && (
                  <div className="mb-8">
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="h-auto max-w-full"
                    />
                  </div>
                )}
                <select
                  name="category"
                  className="border-stroke mb-8 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </option>
                  ))}
                </select>

                <div className="mb-8">
                  <label
                    htmlFor="title"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Título del Blog:
                  </label>
                  <input
                    maxLength={300}
                    required
                    type="text"
                    name="title"
                    placeholder="Ingresa un título"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="description"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Introducción:
                  </label>
                  <textarea
                    maxLength={5000}
                    required
                    name="description"
                    placeholder="Ingresa una Introducción"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="additionalTitle"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Subtítulo 1:
                  </label>
                  <input
                    required
                    type="text"
                    name="additionalTitle"
                    placeholder="Ingresa un Subtitulo"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="additionalText"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Párrafo:
                  </label>
                  <textarea
                    maxLength={5000}
                    name="additionalText"
                    placeholder="Ingresa un párrafo"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="subtitle"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Subtítulo 2:
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    placeholder="Ingresa un Subtitulo 2"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="paragraph"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Párrafo 2:
                  </label>
                  <textarea
                    maxLength={5000}
                    name="paragraph"
                    placeholder="Ingresa un párrafo 2"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="important-points"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Conclusión (Subtítulos 3):
                  </label>
                  <input
                    name="list"
                    maxLength={700}
                    required
                    placeholder="Ingresa Conclusiones"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="phrase"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Párrafo:
                  </label>
                  <textarea
                    required
                    maxLength={700}
                    name="phrase"
                    placeholder="Ingresa un párrafo"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <button className="flex w-full items-center justify-center rounded-sm bg-red-700 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-red-800/90 dark:shadow-submit-dark">
                    Publicar Blog
                  </button>
                </div>
                {message && (
                  <div
                    className={`mb-6 text-center ${message.includes("exitosamente") ? "text-green-600" : "text-red-600"}`}
                  >
                    {message}
                  </div>
                )}
              </form>
              <p className="text-center text-base font-medium text-body-color">
                ¿Quieres ver tus blogs publicados?
                <a href="/blog" className="text-primary hover:underline">
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
