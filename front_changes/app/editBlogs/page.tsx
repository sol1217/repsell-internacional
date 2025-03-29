"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { api } from "@/utils/config";
import { categorias } from "@/config/constants";

const EditBlogsPage = () => {
  const [dataSelected, setDataSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const data = useSearchParams();
  const fetchBlog = async () => {
    try {
      const product = (await axios.get(`${api}/blogs/${data.get("id")}`)).data
        .data;
      setDataSelected(product);
      setPreview(product.image);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

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
      const response = await fetch(`${api}/blogs/${data.get("id")}`, {
        method: "PUT",
        body: formData,
      });

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
                      <div className="mb-2 block text-sm">
                        <label className="block text-sm mb-2">Imagen:</label>
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
                    <div>
                      <label className="mb-2 block text-sm">Categoría:</label>
                      <select
                        name="category"
                        className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-white"
                        value={dataSelected?.category || ""}
                        onChange={(e) =>
                          setDataSelected({
                            ...dataSelected,
                            category: e.target.value,
                          })
                        }
                      >
                        {categorias.map((categoria) => (
                          <option key={categoria.value} value={categoria.value}>
                            {categoria.label}
                          </option>
                        ))}
                      </select>
                    </div>
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
                              name="introduction"
                              defaultValue={
                                dataSelected.introduction
                                  ? dataSelected.introduction
                                  : "Nueva introducción"
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
                              name="subtitle1"
                              defaultValue={
                                dataSelected.subtitle1
                                  ? dataSelected.subtitle1
                                  : "Nuevo súbtitulo 1"
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
                              name="paragraph1"
                              defaultValue={
                                dataSelected.paragraph1
                                  ? dataSelected.paragraph1
                                  : "Nuevo párrafo"
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
                              name="subtitle2"
                              defaultValue={
                                dataSelected.subtitle2
                                  ? dataSelected.subtitle2
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
                              name="paragraph2"
                              defaultValue={
                                dataSelected.paragraph2
                                  ? dataSelected.paragraph2
                                  : "Nuevo párrafo"
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
                              name="conclusion"
                              defaultValue={
                                dataSelected.conclusion
                                  ? dataSelected.conclusion
                                  : "Nueva conclusión"
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
                              name="paragraph3"
                              defaultValue={
                                dataSelected.paragraph3
                                  ? dataSelected.paragraph3
                                  : "Nuevo párrafo final"
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
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
