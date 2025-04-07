"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import Breadcrumb from "@/components/Common/Breadcrumb";

const EditProductsPage = () => {
  const [editNombre, setEditNombre] = useState(false);
  const [editDescripcion, setEditDescripcion] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [preview, setPreview] = useState(null);
  const data = useSearchParams();

  const fetchProduct = async () => {
    try {
      const product = (
        await axios.get(
          `${api}/products/${data.get("category")}/${data.get("id")}`,
        )
      ).data.data;
      setDataSelected(
        product || {
          name: "",
          description: "",
          height: "",
          color: "",
          image: "",
        },
      );
      console.log(product);
      setEditNombre(product.name);
      setEditDescripcion(product.description);
      setEditDescripcion(product.height);
      setEditColor(product.color);
      setEditImage(product.image);
      setPreview(product.image);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [data]);

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
    formData.append("category", data.get("category"));
    try {
      const response = await fetch(
        `${api}/products/${data.get("category")}/${data.get("id")}`,        {
          method: "PUT",
          body: formData,
        },
      );

      if (response.ok) {
        setGlobalMessage({ text: "✅ Producto actualizado correctamente.", type: "success" });
      } else {
        setGlobalMessage({ text: "⚠️ Error al actualizar el producto.", type: "error" });
      }
    } catch (error) {
      setGlobalMessage({ text: "❌ Error en la conexión al servidor.", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Editar producto" description="Edita el producto con sus nuevos valores"/>

      <Suspense fallback={<div>Loading...</div>}>
        <section
          className="relative  z-10 overflow-hidden py-24"
          style={{ background: "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)" }}
        >

          <BubbleDecoration/>

          <div className="container">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
                <div className="mx-auto rounded-xl bg-[#101933]/60 px-6 py-10 text-white shadow-xl backdrop-blur-md sm:p-[60px]">
                  <h3 className="mb-3 text-center text-3xl font-bold">Datos del producto</h3>
                  <p className="mb-8 text-center text-white/80">
                    Por favor, proceda a ingresar la información actualizada correspondiente al nuevo producto, asegurándose de completar todos los campos requeridos con datos precisos y verificados.
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
                          name="name"
                          defaultValue={dataSelected.name}
                          placeholder="Nuevo nombre"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="description"
                          defaultValue={dataSelected.description}
                          placeholder="Nueva descripción"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="height"
                          defaultValue={dataSelected.height}
                          placeholder="Nuevo tamaño"
                          className="w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50"
                        />
                        <input
                          type="text"
                          name="color"
                          defaultValue={dataSelected.color}
                          placeholder="Nuevo color"
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
                    Volver a productos {" "}
                    <a href="/products" className="text-red-700 hover:underline font-semibold">
                      Productos
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

export default EditProductsPage;
