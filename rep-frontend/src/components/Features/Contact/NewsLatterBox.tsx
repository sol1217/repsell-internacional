"use client";

import { useTheme } from "next-themes";
import { FaWaze } from "react-icons/fa";
import {Facebook, Instagram, MessageCircle, PhoneIcon} from "lucide-react";
import {useState} from "react";

const NewsLatterBox = () => {
  const { theme } = useTheme();
  const [isShowPhone, setIsShowPhone] = useState(false);

  const handleClick = () => {
    setIsShowPhone(!isShowPhone);
  };

  return (
    <div className="relative p-10 z-10 flex h-full flex-col items-center justify-center rounded-xl bg-[#101933] text-center shadow-lg backdrop-blur-md">
      <h3 className="mb-4 text-2xl font-bold text-white">
        Horario de atención:
      </h3>

      <p className="mb-10 border-b border-white/20 pb-6 text-white/80">
        Lunes a viernes de 8:00 a.m. a 5:15 p.m.
      </p>

      <div className="mb-8 mt-8 flex items-center gap-6">
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
        <button
          onClick={handleClick}
          className="flex items-center text-white transition hover:text-green-500"
        >
          {isShowPhone ? (
            <p className="text-white font-bold">2221 2827</p>
          ) : (
            <PhoneIcon size={36} />
          )}
        </button>
        <a
          href="https://www.google.com/maps/place/WWG4%2BG3H"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 transition hover:text-[#48e]"
        >
          <FaWaze size={40} />
        </a>
      </div>

      <a
        href="https://wa.link/7otvpd"
        className="mb-6 inline-block w-full max-w-[360px] rounded-full bg-[#e11b24] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#e11b25]/90"
      >
        Whatsapp 8968-2121
      </a>

      <p className="text-sm p-6 text-white/80">
        Nos ubicamos en Avenida 16, calle 34, Barrio Corazón de Jesús, San José,
        Costa Rica
      </p>

      <p className="mt-3 text-sm text-white/80">Correo: info@gruposelley.com</p>

      <span className="absolute left-2 top-7 opacity-60">
        <svg
          width="57"
          height="65"
          viewBox="0 0 57 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-18.3187"
              y1="55.1044"
              x2="37.161"
              y2="15.3509"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                stopOpacity="0.62"
              />
              <stop
                offset="1"
                stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </span>

      <span className="absolute bottom-24 left-1.5 opacity-60">
        <svg
          width="39"
          height="32"
          viewBox="0 0 39 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
            fill="url(#paint1_linear)"
          />
          <defs>
            <linearGradient
              id="paint1_linear"
              x1="39.1948"
              y1="38.335"
              x2="10.6982"
              y2="10.2511"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                stopOpacity="0.62"
              />
              <stop
                offset="1"
                stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </div>
  );
};

export default NewsLatterBox;
