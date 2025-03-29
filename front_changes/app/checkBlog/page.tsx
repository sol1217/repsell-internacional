"use client";

import React, { Fragment, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import logo from "../../../public/images/hero/logo-repsell-icono.png";
import Image from "next/image";
import { api } from "@/utils/config";

const BlogPageCheck = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
        `${api}/blogs/${id}`
      );
      if (response.status === 200) {
        setMessage("✅ Blog eliminado correctamente.");
        fetchBlogs();
      } else {
        setMessage("❌ Error al eliminar el blog.");
      }
    } catch (error) {
      setMessage("❌ Error en el servidor.");
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
                <p className="mb-8 text-center text-white/80">
                  Estos son todos los blogs ingresados y publicados en la página.
                  <br /> ¿Deseas añadir uno nuevo?
                  <Link href="/newBlog" className="text-[#4A6CF7] hover:underline">
                    Añadir Blog
                  </Link>
                </p>

                {message && (
                  <div className="mb-6 text-center text-sm font-medium text-green-400">
                    {message}
                  </div>
                )}

                {loading ? (
                  <p className="text-center text-white/80">Cargando...</p>
                ) : (
                  renderBlogs(blog, "Blogs Publicados", "blogs")
                )}
              </div>
            </div>
          </div>
        </div>
      </section></>

  );
};

export default BlogPageCheck;
