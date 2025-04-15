"use client";

import BubbleDecoration from "@/components/Common/BubbleDecoration";
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";
import TagButton from "@/components/Blog/TagButton";
import {useAuthProtection} from "@/hook/useAuthProtection";

const AdminPage = () => {


  useAuthProtection();

  return (
    <section
      className="relative z-10 py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >
      <div className="video-repsell absolute inset-0 z-0 flex h-full w-full items-center justify-center">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-darken"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/corporativo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>

      <BubbleDecoration/>

      <div className="container  mt-20">

        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full ">
            <div className="rounded-xl bg-[#101933]/90 p-10 px-6 text-white shadow-xl backdrop-blur-md">
              <SectionTitle
                title="Bienvenidos administradores de Repsell International"
                paragraph="En este perfil administrador podrás encontrar (Agregar nuevos productos, Crear un nuevo Blog, Pedir ayuda a soporte)"
                mb="44px"
                titleColor="text-white"
              />

              <div className="mb-10  w-full overflow-hidden rounded-xl shadow-lg">
                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <Image
                    src="/images/hero/rs.jpeg"
                    alt="image"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="mb-10 rounded-xl bg-[#1a1f33]/60 p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  ¿Deseas agregar nuevos productos?
                </h2>
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <TagButton text="Nuevo Producto" href="/newProduct" />
                  <a
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full bg-[#e11b24] px-5 py-2 text-sm font-semibold text-white hover:bg-[#c8101c] transition"
                  >
                    Ver Productos
                  </a>
                </div>
              </div>

              <div className="mb-10 rounded-xl bg-[#1a1f33]/60 p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  ¿Crear un nuevo blog?
                </h2>
                <p className="mb-4 text-sm text-white/80">
                  Crear un nuevo blog de nuevos productos y experiencias Repsell international
                </p>
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <TagButton text="Nuevo Blog" href="/newBlog" />
                  <a
                    href="/checkBlog"
                    className="inline-flex items-center justify-center rounded-full bg-[#e11b24] px-5 py-2 text-sm font-semibold text-white hover:bg-[#c8101c] transition"
                  >
                    Ver Blogs
                  </a>
                </div>
              </div>

              <div className="mb-10 rounded-xl bg-[#1a1f33]/60 p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  ¿Necesitas ayuda?, Contacta a soporte
                </h2>
                <p className="mb-4 text-sm text-white/80">
                  Sol Calderón Romero
                  <br />Correo: solc0275@gmail.com
                  <br />Número: 6043-0566
                </p>
                <a
                  href="https://wa.link/h2pg27"
                  className="inline-flex items-center justify-center rounded-full bg-[#e11b24] px-5 py-2 text-sm font-semibold text-white hover:bg-[#c8101c] transition"
                >
                  Contactar
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h4 className="mb-3 text-sm font-medium text-white/70">Contactar :</h4>
                  <div className="flex items-center gap-3">
                    <TagButton text="Soporte" href="https://wa.link/h2pg27" />
                    <TagButton text="Volver..." href="/" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
