import Image from "next/image";
import { GiConcentrationOrb } from "react-icons/gi";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historia Repsell",
  description:
    " La Historia de Repsell: Un Camino Forjado con pasión,dedicación y excelencia.",
  keywords: "exitos, repsell, excelencia, medallas, trofeos",
};

const AboutUsHistory = () => {
  return (
    <section
      className=" z-10 py-28"
      style={{
        background:
          "radial-gradient(circle at bottom right, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <span className="absolute left-0 top-0 z-0 opacity-10">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="150" cy="150" r="150" fill="#4A6CF7" />
        </svg>
      </span>
      <span className="absolute bottom-0 right-0 z-0 opacity-10">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="110" cy="110" r="110" fill="#e11b24" />
        </svg>
      </span>
      <span className="absolute bottom-10 left-10 z-0 opacity-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
        </svg>
      </span>
      <span className="absolute right-10 top-1/2 z-0 opacity-10">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="90" cy="90" r="90" fill="#4A6CF7" />
        </svg>
      </span>
      <div className="container mx-auto ">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <h2 className="mb-8 text-4xl font-bold drop-shadow-xl">
              La Historia de Repsell: Un Camino Forjado con Pasión, Dedicación y
              Excelencia.
            </h2>

            <div className="mb-10 flex items-center gap-3">
              <GiConcentrationOrb fontSize={25} className="text-[#e11b24]" />
              <span className="border-b-2 border-white font-serif text-2xl">
                Somos Repsell Internacional.
              </span>
            </div>

            <p className="mb-10 leading-relaxed text-white/80">
              Somos una empresa y marca registrada con respaldo garantizado que
              inició sus operaciones en marzo de 1996, dirigiéndonos
              primeramente a la venta de programas innovadores de diseño
              tecnológico en la educación. Llegando a vincularnos con el MEP y
              los Colegios Técnicos a nivel nacional, así mismo con empresas
              privadas y el INA
              <br /> <br />
              Luego, cambiamos nuestro giro comercial en el 2000 al fusionar la
              empresa con Grabados y Diseños Selley, para continuar con el
              legado de nuestro fundador Pal Z Selley Gyaraki.
            </p>

            <div className="mb-12 grid grid-cols-2 gap-4">
              <div className="grid grid-rows-2 gap-4">
                <div className="relative h-40 w-full overflow-hidden rounded-lg hover:shadow-blue-500/30">
                  <Image
                    src="/images/hero/story-repsell.jpeg"
                    alt="img1"
                    fill
                    className="object-cover "
                  />
                </div>
                <div className="relative h-40 w-full overflow-hidden rounded-lg hover:shadow-blue-500/30">
                  <Image
                    src="/images/hero/story-1.jpeg"
                    alt="img2"
                    fill
                    className="object-cover "
                  />
                </div>
              </div>
              <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-lg hover:shadow-blue-500/30">
                <Image
                  src="/images/hero/story-2.jpeg"
                  alt="img3"
                  fill
                  className="object-cover "
                />
              </div>
            </div>

            <p className="mb-10 leading-relaxed text-white/80">
              En el 2002, la empresa da un cambio innovador y tecnológico, con
              nuestros fundadores a cargo; el ING Pal Selley González, la Licda.
              Katty Selley González, y nuestra aliada estratégica a cargo de
              importaciones, MBA. Sara Méndez Esquivel. Incluimos maquinaria de
              alta tecnología, posicionándonos como la primera empresa de
              premiaciones y reconocimientos del país y Centroamérica. Iniciando
              una nueva era de cambio con catálogos impresos, artículos
              diferentes y no tradicionales, los cuales tuvieron y siguen
              teniendo gran acogida por nuestros clientes.
            </p>

            <div className="mb-10 grid grid-cols-3 gap-4">
              {[3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="relative h-32 w-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={`/images/hero/story-${num}.jpeg`}
                    alt={`img${num}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="mb-10 leading-relaxed text-white/80">
              A través de los conocimientos modernos del ING Pal Selley
              González, adquiridos gracias a su educación en las mejores
              universidades de Estados Unidos IIT Chicago, Bradley University, y
              su gran visión desde hace más de 22 años, se crean en el 2002 las
              medallas acrílicas grabadas a Láser y con sublimación,
              convirtiéndose en un éxito rotundo. Inclusive, para el ICODER, son
              las medallas estrella de premiaciones deportivas en la actualidad.
              <br />
            </p>

            <div className="mb-10 grid grid-cols-3 gap-4">
              {[
                "st-3.jpeg",
                "st-1.jpeg",
                "st-2.jpeg",
                "st-4.jpeg",
                "st-6.jpg",
                "st-5.jpg",
              ].map((img, i) => (
                <Image
                  key={i}
                  src={`/images/hero/${img}`}
                  alt={`history-img-${i}`}
                  width={300}
                  height={100}
                  className="h-[180px] w-full rounded-lg object-cover shadow"
                />
              ))}
            </div>

            <div className="mb-10 rounded-xl bg-[#101933]/60 p-6 shadow-md backdrop-blur-md">
              <h3 className="mb-4 text-xl font-bold text-white drop-shadow">
                Características que nos destacan.
              </h3>
              <p className="mb-6 text-white/80">
                Actualmente, en Repsell Internacional, fabricamos en forma
                directa para todas las empresas organizadoras y gubernamentales;
                dorsales, lonas, trofeos, pines, grabados, medallas de metal,
                ecológicas y acrílicas, cristales y todo tipo de
                reconocimientos, promocionales y gran formato en general.
              </p>
              <ul className="list-inside list-disc space-y-2 text-white/80">
                <li>Utilizamos materiales resistentes.</li>
                <li>Materiales amigables con el medio ambiente.</li>
                <li>Consumo nacional y extranjero.</li>
                <li>Proporcionando confianza a todos nuestros clientes.</li>
              </ul>
            </div>

            <div className="relative z-10 mb-10 overflow-hidden rounded-xl bg-[#1e2b5a]/60 p-8 text-white shadow-lg backdrop-blur-md">
              <p className="text-center text-base font-medium italic">
                Seguimos innovando y creciendo en un mundo que demanda alta
                calidad y compromiso. Gracias a nuestro equipo humano y el
                excelente servicio al cliente que nos destaca, y también,
                gracias a nuestros clientes con los que hemos desarrollado una
                estrecha relación de confianza y lealtad mutua.
              </p>
              <span className="absolute left-0 top-0 z-[-1]">
                <svg
                  width="132"
                  height="109"
                  viewBox="0 0 132 109"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M33.0354 90.11C19.9851 102.723 -3.75916 101.834 -14 99.8125V-15H132C131.456 -12.4396 127.759 -2.95278 117.318 14.5117C104.268 36.3422 78.7114 31.8952 63.2141 41.1934C47.7169 50.4916 49.3482 74.3435 33.0354 90.11Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="94.7523"
                      y1="82.0246"
                      x2="8.40951"
                      y2="52.0609"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.06" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="absolute bottom-0 right-0 z-[-1]">
                <svg
                  width="53"
                  height="30"
                  viewBox="0 0 53 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.8"
                    cx="37.5"
                    cy="37.5"
                    r="37.5"
                    fill="#4A6CF7"
                  />
                  <mask
                    id="mask0"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="75"
                    height="75"
                  >
                    <circle
                      opacity="0.8"
                      cx="37.5"
                      cy="37.5"
                      r="37.5"
                      fill="#4A6CF7"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <circle
                      opacity="0.8"
                      cx="37.5"
                      cy="37.5"
                      r="37.5"
                      fill="url(#paint1_radial)"
                    />
                    <g opacity="0.8" filter="url(#filter0_f)">
                      <circle
                        cx="40.8089"
                        cy="19.853"
                        r="15.4412"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_f"
                      x="4.36768"
                      y="-16.5881"
                      width="72.8823"
                      height="72.8823"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="10.5"
                        result="effect1_foregroundBlur"
                      />
                    </filter>
                    <radialGradient
                      id="paint1_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(37.5 37.5) rotate(90) scale(40.2574)"
                    >
                      <stop stopOpacity="0.47" />
                      <stop offset="1" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </div>

            <p className="text-white/80">
              Somos Repsell Internacional una empresa orgullosa de ser 100%
              nacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHistory;
