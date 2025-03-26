import Image from "next/image";
import trofeo from "public/images/products/repsell-2.png";
import SectionTitle from "@/components/Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSection = () => {
  const List = ({ text }) => (
    <div className="mb-5 flex text-lg font-medium text-white">
      <span className="mr-4 flex items-center justify-center rounded-md text-red-700">
        {checkIcon}
      </span>
      <p>{text}</p>
    </div>
  );

  return (
    <section
      id="about"
      className="relative z-10 bg-dark  pt-16 md:pt-20 lg:pt-28"
    >
      <div className="video-repsell absolute inset-0 z-0 flex h-full w-full items-center justify-center">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-darken"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/corporativo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10">
        <div className="border-b border-body-color/[.15] pb-16  md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                titleColor="text-[#ffffff]"
                title="Comprometidos con nuestros clientes"
                paragraph="Nos enfocamos en la calidad, la creatividad y la satisfacción de nuestros clientes. Convertimos cada reconocimiento en una experiencia inolvidable."
                mb="44px"
              />

              <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className=" mx-[-12px] flex flex-wrap items-center justify-center ">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Calidad Superior en Productos y Servicios" />
                    <List text="Personalización y Creatividad" />
                    <List text="Entrega Puntual y Fiable" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Innovación Continua" />
                    <List text="Atención al Cliente Excepcional" />
                    <List text="Responsabilidad Social y Ambiental" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  className="trofeo-image"
                  src={trofeo}
                  alt="trofeo"
                  height={400}
                  width={450}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
