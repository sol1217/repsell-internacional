"use client";

import Image from "next/image";
import trophy from "public/images/products/trophy.png";
import slogan from "public/images/hero/SOMOS-LÍDER.png";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const InformationSection = () => {
  return (
    <section
      className="relative overflow-hidden px-10 py-24"
      style={{
        background:
          "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="max-w-xl text-white">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#4A6CF7]">
            Innovación & diseño en Repsell Internacional.
          </h3>

          <h2 className="mb-6 w-full break-words font-mono text-5xl font-bold leading-tight text-white drop-shadow-md">
            SOMOS LÍDER PREMIAMOS SU ESFUERZO
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            En premiaciones y reconocimientos con nuevas tendencias y productos.
            <br />
            Al ir de la mano con la innovación y diseño, garantizamos una
            experiencia única para nuestros clientes.
          </p>
          <a
            href="/trophiesAndCups"
            className="text-center inline-block rounded-full bg-[#e11b24] px-8 py-3 text-base font-medium text-white shadow-xl transition duration-300 hover:bg-[#c7181f]"
          >
            Conoce nuestros productos: Copas y Trofeos
          </a>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            className="custom-img-size custom-img-animation h-auto w-[370px] sm:w-[270px]"
            src={trophy}
            alt="Trofeo"
          />
          <Image
            src={slogan}
            alt="Slogan somos líderes"
            className="w-[400px] drop-shadow-lg sm:w-[300px]"
          />

          <p className="text-lg font-bold text-white">Visita nuestras redes sociales:</p>
          <div className="mt-8 flex items-center gap-6">
            <a
              href="https://www.instagram.com/repsellcr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-pink-500"
            >
              <Instagram size={36} />
            </a>
            <a
              href="https://www.facebook.com/repsellcr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-blue-500"
            >
              <Facebook size={36} />
            </a>
            <a
              href="https://wa.link/7otvpd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-green-500"
            >
              <MessageCircle size={36} />
            </a>
          </div>

          <div className="star animate-star absolute left-[60%] top-[20%] h-1 w-1 rounded-full bg-white opacity-70" />
          <div className="star animate-star delay-2000 absolute left-[70%] top-[40%] h-1 w-1 rounded-full bg-white opacity-50" />
          <div className="star animate-star absolute left-[80%] top-[60%] h-1 w-1 rounded-full bg-white opacity-60 delay-1000" />
        </div>
      </div>

      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692..."
              stroke="url(#paint3_linear)"
            />
            <defs>
              <linearGradient
                id="paint3_linear"
                x1="256.267"
                y1="76.6717"
                x2="-40.8688"
                y2="31.1572"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default InformationSection;
