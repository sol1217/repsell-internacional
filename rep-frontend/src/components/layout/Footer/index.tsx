"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagramSquare, FaWaze } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiConcentrationOrb } from "react-icons/gi";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-gradient-to-br from-[#0A0F24] via-[#1E3A8A] to-[#0A0F24] pb-10 pt-20 text-[#0A0F24]">
        <div className="container ">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/hero/logo-repsell-icono.png"
                  alt="logo"
                  width={30}
                  height={40}
                />
                <p className="font-bold text-[#ffffff]/80">
                  Repsell Internacional
                </p>
              </div>
              <p className="mb-3 text-sm text-[#ffffff]/80">
                Horario de atención: Lunes a viernes de 8:00a.m a 5:15pm
              </p>
              <p className="mb-3 text-sm text-[#ffffff]/80 drop-shadow-md">
                Nos ubicamos en Barrio Corazón de Jesús, San José, Costa Rica
              </p>
              <p className="mb-4 text-sm text-[#ffffff]/80 drop-shadow-md">
                info@gruposelley.com
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://www.facebook.com/repsellcr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffff]/80 transition hover:text-[#e11b24]"
                >
                  <FaFacebookF size={30} />
                </a>
                <a
                  href="https://wa.link/26xce4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffff]/80 transition hover:text-[#25D366]"
                >
                  <IoLogoWhatsapp size={30} />
                </a>
                <a
                  href="https://www.instagram.com/repsellcr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffff]/80 transition hover:text-pink-500"
                >
                  <FaInstagramSquare size={30} />
                </a>
                <a
                  href="https://www.google.com/maps/place/WWG4%2BG3H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffff]/80 transition hover:text-[#4A6CF7]"
                >
                  <FaWaze size={30} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#ffffff]/80">
                Enlaces Útiles
              </h3>
              <ul className="space-y-2 text-sm text-[#0A0F24]/80">
                <li>
                  <Link
                    href="/contact"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signin"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Perfil Administrador
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#ffffff]/80">
                Productos
              </h3>
              <ul className="space-y-2 text-sm text-[#0A0F24]/80">
                <li>
                  <Link
                    href="/medals"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Medallas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trophiesAndCups"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Copas y Trofeos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recognitions"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Reconocimientos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#ffffff]/80">
                Más productos
              </h3>
              <ul className="space-y-2 text-sm text-[#0A0F24]/80">
                <li>
                  <Link
                    href="/promotional"
                    className="text-[#ffffff]/80 hover:text-red-700"
                  >
                    Promocionales y empresariales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/impression"
                    className="text-[#ffffff]/80 hover:text-red-700 "
                  >
                    Impresión Gran Formato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#0A0F24]/30 to-transparent" />

          <div className=" flex flex-col items-center justify-center gap-3 text-sm text-[#0A0F24]/60">
            <GiConcentrationOrb
              size={25}
              className="text-[#ffffff]/80 hover:text-red-700"
            />
            <p className="font-serif text-xl text-[#ffffff]/80">
              Más allá de la medalla
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
