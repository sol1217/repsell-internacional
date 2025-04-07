"use client";

import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import logo from "../../../public/images/hero/logo-repsell-icono.png";
import Image from "next/image";
import {api} from "@/utils/config";

const BlogPageCheck = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogs = (
        (await axios.get(
          `${api}/blogs`
        )) as any
      ).data.data;
      console.log(blogs);
      setBlog(blogs);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
      setBlog([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `https://repsell-international-backend.onrender.com/delete-blog/${id}`
      );
      if (response.status === 200) {
        setGlobalMessage({ text: "✅ Blog eliminado correctamente.", type: "success" });
        fetchBlogs();
      } else {
        setGlobalMessage({ text: "❌ Error al eliminar el blog.", type: "error" });
      }
    } catch (error) {
      setGlobalMessage({ text: "❌ Error en el servidor al eliminar.", type: "error" });
    } finally {
      setTimeout(() => setGlobalMessage(null), 3000);
    }
  };


  const renderBlogs = (blogs, title, category) => (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow">
        {title}
      </h2>
      <div>
        {blogs.length > 0 ? (
          blogs.map((product) => (
            <div
              key={product.id}
              className="mb-6 flex flex-col items-center justify-center gap-3"
            >
              <div className="flex w-full justify-between rounded-md border border-white/10 bg-[#101933]/60 px-6 py-3 text-base text-white shadow-md backdrop-blur-md">
                {product.title || "Sin título"}
                <div className="flex flex-row gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => deleteBlog(product.id)}
                  >
                    <FaRegTrashAlt fontSize={20} className="text-white" />
                  </button>
                  <a href={`/editBlogs?id=${product.id}`} className="cursor-pointer hover:underline">
                    Editar
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70">No hay blogs disponibles.</p>
        )}
      </div>
    </>
  );

  return (
    <>
      <Breadcrumb pageName="BLOGS PUBLICADOS" description="Listado de nuestras publicaciones recientes y artículos informativos sobre tendencias, novedades y soluciones de Repsell Internacional."/>

      <section
        className="relative z-10  overflow-hidden py-24"
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
                  BLOGS PUBLICADOS
                </h3>
                <p className="mb-8  text-center text-white/80">
                  A continuación, se muestra el listado completo de todas las entradas de blog que han sido ingresadas y publicadas en la página.                  <br /> ¿Deseas añadir uno nuevo?
                  <Link href="/newBlog" className="text-red-700 hover:underline">
                    Añadir Blog
                  </Link>
                </p>

                {loading ? (
                  <p className="text-center text-white/80">Cargando...</p>
                ) : (
                  renderBlogs(blog, "Blogs Publicados", "blogs")
                )}
              </div>
              {globalMessage && (
                <div
                  className={` rounded-md px-4 py-3 text-center text-sm font-medium ${
                    globalMessage.type === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"
                  }`}
                >
                  {globalMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section></>

  );
};

export default BlogPageCheck;
