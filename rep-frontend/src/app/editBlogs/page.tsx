"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/utils/config";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import { useAuthProtection } from "@/hook/useAuthProtection";
import axiosInstance from "@/utils/axiosInstance";

const EditBlogsPage = () => {
  const [dataSelected, setDataSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const data = useSearchParams();
  const blogId = data.get("id");

  useAuthProtection();

  const fetchProduct = async () => {
    try {
      const id = data.get("id");
      if (!id) {
        throw new Error("No se recibió el ID del blog");
      }

      const response = await axiosInstance.get(`${api}/blogs/${id}`);
      const product = response.data?.data?.[0] ?? response.data; // según cómo venga
      setDataSelected(product);
      setPreview(product.image);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, [blogId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreview(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("image", preview);

    try {
      const response = await axiosInstance.put(
        `${api}/blogs/${blogId}`, // ✅ Ruta corregida
        formData
      );

      if (response.status === 200) {
        setGlobalMessage({ text: "✅ Blog actualizado correctamente.", type: "success" });
      } else {
        setGlobalMessage({ text: "⚠️ Error al actualizar el blog.", type: "error" });
      }
    } catch (error) {
      console.error("Error actualizando blog:", error);
      setGlobalMessage({ text: "❌ Error en la conexión al servidor.", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Editar Blog" description="Edita los campos del blog publicado" />

      <Suspense fallback={<div>Loading...</div>}>
        <section
          className="relative z-10 overflow-hidden py-24"
          style={{ background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)" }}
        >
          <BubbleDecoration />

          <div className="container">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
                <div className="mx-auto rounded-xl bg-[#101933]/60 px-6 py-10 text-white shadow-xl backdrop-blur-md sm:p-[60px]">
                  <h3 className="mb-3 text-center text-3xl font-bold">Datos del Blog</h3>
                  <p className="mb-8 text-center text-white/80">
                    Por favor, edita la información correspondiente al blog seleccionado. Todos los campos son editables.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                    />

                    {dataSelected && (
                      <>
                        <input
                          type="text"
                          name="title"
                          defaultValue={dataSelected.title}
                          placeholder="Título del blog"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="description"
                          defaultValue={dataSelected.description}
                          placeholder="Introducción"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="additionalTitle"
                          defaultValue={dataSelected.additionalTitle}
                          placeholder="Subtítulo 1"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="additionalText"
                          defaultValue={dataSelected.additionalText}
                          placeholder="Párrafo 1"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="subtitle"
                          defaultValue={dataSelected.subtitle}
                          placeholder="Subtítulo 2"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="paragraph"
                          defaultValue={dataSelected.paragraph}
                          placeholder="Párrafo 2"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="list"
                          defaultValue={dataSelected.list}
                          placeholder="Conclusión"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="phrase"
                          defaultValue={dataSelected.phrase}
                          placeholder="Frase Final"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="category"
                          defaultValue={dataSelected.category}
                          placeholder="Categoría"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                      </>
                    )}

                    {globalMessage && (
                      <div
                        className={`rounded-md px-4 py-3 text-center text-sm font-medium ${
                          globalMessage.type === "success"
                            ? "bg-green-800 text-green-200"
                            : "bg-red-800 text-red-200"
                        }`}
                      >
                        {globalMessage.text}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-center">
                      <button
                        type="submit"
                        className="rounded-full bg-[#e11b24] px-32 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#c8101c]"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-center text-sm text-white/80">
                    Volver a Blogs{" "}
                    <a href="/checkBlog" className="text-[#4A6CF7] hover:underline font-semibold">
                      Blogs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default EditBlogsPage;
