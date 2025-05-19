"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {api} from "@/utils/config";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {Product} from "@/types/product";
import {getToken} from "@/services/auth";
import {useAuthProtection} from "@/hook/useAuthProtection";
import axiosInstance from "@/utils/axiosInstance";

const EditProducts = () => {
  const [editNombre, setEditNombre] = useState("");
  const [editHeight, setEditHeight] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editColor, setEditColor] = useState("");
  const [dataSelected, setDataSelected] = useState(null);
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const data = useSearchParams();

  useAuthProtection();

  const fetchProduct = async () => {
    try {
      const product = (
        await axios.get<Product>(
          `${api}/products/${data.get("category")}/${data.get("id")}`,
        )
      ).data;
      setDataSelected(
        product || {
          name: "",
          description: "",
          height: "",
          color: "",
          image: "",
        },
      );
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
    setLoading(true);

    const token = getToken();

    if (!token) {
      alert("⚠️ Sesión expirada. Inicia sesión nuevamente.");
      window.location.href = "/signin";
      return;
    }

    const formData = new FormData(e.target);
    formData.append("image", preview);
    formData.append("category", data.get("category"));

    // transform formData to object (json)
    const body = {
      name: editNombre,
      description: editDescripcion,
      height: editHeight,
      color: editColor,
      image: preview,
      category: editCategory,
    };

    try {
      const response = await axiosInstance.patch(
        `${api}/products/${data.get("category")}/${data.get("id")}`,
        body, // here we pass the object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setGlobalMessage({ text: "✅ Producto actualizado correctamente.", type: "success" });
      } else {
        setGlobalMessage({ text: "⚠️ Error al actualizar el producto.", type: "error" });
      }
    } catch (error) {
      setGlobalMessage({ text: "❌ Error en la conexión al servidor.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Editar producto" description="Edita el producto con sus nuevos valores"/>

      <div>
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
                        <input
                          type="text"
                          name="category"
                          defaultValue={dataSelected.category}
                          placeholder="Nueva categoria"
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
                        {loading ? "Guardando..." : "Guardar"}
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
      </div>
    </>

  );
};

export default EditProducts;
