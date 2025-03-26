import Image from "next/image";
import trofeo from "../../../public/images/products/repsell-3.jpeg";

const AboutSectionTwo = () => {
  return (
    <section className=" bg-white py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex  flex-col-reverse flex-wrap items-center justify-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                className="trofeo-image"
                src={trofeo}
                alt="trofeo"
                height={400}
                width={450}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Creatividad y Originalidad
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Capacidad para crear productos únicos y personalizados que
                  capturen la esencia de cada logro.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Flexibilidad y Adaptabilidad
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Satisfacemos las necesidades de nuestros y preferencias de
                  nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
