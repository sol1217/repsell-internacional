"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const NewProduct = () => {
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedStyles, setSelectedStyles] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categorias = [
    { value: "", label: "Elegir Categoria" },
    { value: "medals", label: "Medallas" },
    { value: "recognitions", label: "Reconocimientos" },
    { value: "trophies", label: "Trofeos y Copas" },
    { value: "promotionals", label: "Promocionales" },
    { value: "prints", label: "Impresiones" },
  ];

  const styles = [
    { value: "", label: "Elegir Estilo" },
    { value: "Cristales", label: "Cristales" },
    { value: "Acrilico", label: "Acrilico" },
    { value: "Madera", label: "Madera" },
    { value: "Promotionales", label: "Promocionales" },
    { value: "Trofeos", label: "Trofeos" },
    { value: "Figuras", label: "Figuras" },
    { value: "Resinas", label: "Resinas" },
    { value: "Laurel", label: "Laurel" },
    { value: "Deportivas", label: "Deportivas" },
    { value: "Ecologica", label: "Ecologica" },
    { value: "Fundida", label: "Fundida" },
    { value: "ROLLER UP", label: "ROLLER UP" },
    { value: "LONAS", label: "LONAS" },
    { value: "STICKERS", label: "STICKERS" },
    { value: "GRÁFICAS", label: "Graficas" },
    { value: "Madera", label: "Madera" },
  ];

  const endpoints = {
    medals: "https://repsell-international-backend.onrender.com/new-medal",
    recognitions:
      "https://repsell-international-backend.onrender.com/new-recognition",
    trophies: "https://repsell-international-backend.onrender.com/new-trophy",
    promotionals:
      "https://repsell-international-backend.onrender.com/new-promotional",
    prints: "https://repsell-international-backend.onrender.com/new-print",
  };
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
        const base64Image = reader.result;
        setPreview(base64Image);
      };

      reader.readAsDataURL(file);
      console.log("convertida en base 64");
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

    const endpoint = endpoints[selectedCategoria];

    if (!endpoint) {
      alert("Endpoint no encontrado para la categoría seleccionada.");
      return;
    }

    console.log(e.target);

    const formData = new FormData(e.target);
    formData.append("image", preview);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Producto enviado correctamente.");
      } else {
        alert("Error al enviar el producto.");
      }
    } catch (error) {
      alert("Error en la conexión.");
    }
  };

  return (
    <div className="bg-white">
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[10px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap ">
            <div className="w-full  px-4">
              <div className="mx-auto max-w-[1200px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  AÑADE UN NUEVO PRODUCTO
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Ingresa todos los datos necesarios para brindarle al cliente
                  una información detallada.
                </p>
                <select
                  className="border-stroke mb-8 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                  value={selectedCategoria}
                  onChange={handleChange}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="border-stroke flex w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                >
                  Subir Imagen del producto
                </button>

                {preview && (
                  <div className="mb-8 mt-8 flex items-center justify-center">
                    <Image
                      width={200}
                      height={200}
                      src={preview}
                      alt="Vista previa"
                      className="h-auto max-w-full rounded-sm border-gray-300"
                      onLoad={handleCleanup}
                    />
                  </div>
                )}

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    --- Informacion General ---
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Nombre del Producto:
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Ingresa el codigo o/y nombre del producto"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="description"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Descripción: (Opcional)
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Ingresa una descripcion detallada"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="height"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Altura/Tamaño: (opcional)
                    </label>
                    <input
                      maxLength={20}
                      type="text"
                      name="height"
                      placeholder="Ingresa la altura en centimetros"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="color"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Colores: (opcional)
                    </label>
                    <input
                      type="text"
                      name="color"
                      placeholder="Ingresa los colores disponibles"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="category"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Categoria:
                    </label>
                    <select
                      required
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      value={selectedStyles}
                      onChange={handleChangeStyle}
                      name="category"
                    >
                      {styles.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="mt-10 w-full rounded bg-red-700 px-6 py-4 text-base font-medium text-white outline-none transition-all duration-300 hover:bg-opacity-90"
                  >
                    Enviar Producto
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
