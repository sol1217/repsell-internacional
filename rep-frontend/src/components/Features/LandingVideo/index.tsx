"use client";

import Image from "next/image";
import SectionTitle from "@/components/Common/SectionTitle";
import staff1 from "public/images/hero/staff.jpg";
import staff2 from "public/images/hero/staff-2.jpg";
import staff3 from "public/images/hero/staff-3.jpg";

const LandingVideo = () => {
  return (
    <section
      className="relative z-10  break-words py-28 "
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <h3 className="mb-2 text-base font-semibold uppercase text-[#e11b24]">
          Nuestro Equipo
        </h3>
        <h2 className="mx-auto mb-6 flex max-w-3xl flex-wrap justify-center text-center font-mono text-4xl font-bold leading-relaxed text-white drop-shadow">
          Nuestro personal está siempre dispuesto a ayudarle
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-white/80">
          Nuestro equipo altamente capacitado está a su disposición para
          ayudarle a elegir el reconocimiento perfecto y asegurar que su
          experiencia con nosotros sea excepcional.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-[#101933]/60 p-8 shadow-md backdrop-blur-md transition hover:shadow-blue-500/30">
            <div className="mb-4 flex justify-center">
              <Image
                src={staff1}
                alt="Staff 1"
                className="custom-img-animation h-28 w-28 rounded-full border-4 border-[#4A6CF7] object-cover"
              />
            </div>
            <h4 className="mb-2 text-xl font-semibold">
              Atención Personalizada
            </h4>
            <p className="text-sm text-white/70">
              Le guiamos para encontrar el reconocimiento ideal para tu evento o
              institución.
            </p>
          </div>

          <div className="rounded-xl bg-[#101933]/60 p-8 shadow-md backdrop-blur-md transition hover:shadow-blue-500/30">
            <div className="mb-4 flex justify-center">
              <Image
                src={staff2}
                alt="Staff 2"
                className="custom-img-animation h-28 w-28 rounded-full border-4 border-[#4A6CF7] object-cover"
              />
            </div>
            <h4 className="mb-2 text-xl font-semibold">
              Experiencia Profesional
            </h4>
            <p className="text-sm text-white/70">
              Nuestro personal está altamente capacitado para brindarle un
              servicio ágil y confiable.
            </p>
          </div>

          <div className="rounded-xl bg-[#101933]/60 p-8 shadow-md backdrop-blur-md transition hover:shadow-blue-500/30">
            <div className="mb-4 flex justify-center">
              <Image
                src={staff3}
                alt="Staff 3"
                className="custom-img-animation h-28 w-28 rounded-full border-4 border-[#4A6CF7] object-cover"
              />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Compromiso y Calidad</h4>
            <p className="text-sm text-white/70">
              Nos aseguramos de que cada cliente quede satisfecho con su
              experiencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingVideo;
