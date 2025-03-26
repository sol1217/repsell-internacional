"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios/index";

const EditBlogsPage = () => {
  const [dataSelected, setDataSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const data = useSearchParams();
  const fetchProduct = async () => {
    try {
      const product = (
        await axios.get(`http://localhost:3001/blog/${data.get("id")}`)
      ).data.data[0];
      setDataSelected(
        product || {
          title: "",
          description: "",
          additionalText: "",
          list: "",
          phrase: "",
          additionalTitle: "",
          subtitle: "",
          paragraph: "",
          image: "",
          category: "",
        },
      );
      setPreview(product.image);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("image", preview);
    try {
      const response = await fetch(
        `http://localhost:3001/update-blog/${data.get("id")}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (response.ok) {
        alert("Producto actualizado correctamente.");
      } else {
        alert("Error al actualizar el producto.");
      }
    } catch (error) {
      alert("Error en la conexión.");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap ">
              <div className="flex w-full justify-center px-4">
                <div className="mx-auto flex w-[1200px] flex-col justify-center rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Datos del Blog
                  </h3>
                  <p className="mb-11 text-center text-base font-medium text-body-color">
                    Proceda a ingresar los nuevos datos correspondientes al Blog
                  </p>

                  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    {dataSelected ? (
                      <div className=" m-2 flex flex-row items-center justify-evenly ">
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          className="border-stroke mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                        />
                      </div>
                    ) : (
                      <>
                        <p></p>
                      </>
                    )}
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="title"
                              defaultValue={
                                dataSelected.title
                                  ? dataSelected.title
                                  : "Nuevo Titulo"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="description"
                              defaultValue={
                                dataSelected.description
                                  ? dataSelected.description
                                  : "Nueva Descripcion"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="additionalTitle"
                              defaultValue={
                                dataSelected.additionalTitle
                                  ? dataSelected.additionalTitle
                                  : "Nueva Lista"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="additionalText"
                              defaultValue={
                                dataSelected.additionalText
                                  ? dataSelected.additionalText
                                  : "Nuevo Titulo Secundario"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <p>Cargando datos del producto...</p>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="subtitle"
                              defaultValue={
                                dataSelected.subtitle
                                  ? dataSelected.subtitle
                                  : "Nuevo Subtitulo"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="paragraph"
                              defaultValue={
                                dataSelected.paragraph
                                  ? dataSelected.paragraph
                                  : "Nueva parrafo"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="list"
                              defaultValue={
                                dataSelected.list
                                  ? dataSelected.list
                                  : "Nueva descripcion secundaria"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="phrase"
                              defaultValue={
                                dataSelected.phrase
                                  ? dataSelected.phrase
                                  : "Nueva Frase"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl p-2 ">
                      <div className="flex w-full flex-row items-center justify-around gap-3 ">
                        {dataSelected ? (
                          <>
                            <input
                              type="text"
                              name="category"
                              defaultValue={
                                dataSelected.category
                                  ? dataSelected.category
                                  : "Nueva Lista"
                              }
                              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                            />
                          </>
                        ) : (
                          <>
                            <p></p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                      <button
                        className="inline-flex w-[100px] items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                        type="submit"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-center text-base font-medium text-body-color">
                    Volver a Blogs
                    <a
                      href="/checkBlog"
                      className="text-primary hover:underline"
                    >
                      Blogs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </Suspense>
  );
};

export default EditBlogsPage;
