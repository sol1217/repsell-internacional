"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "@/components/Common/SectionTitle";

const Brands = () => {
  return (
    <section
      className="relative z-10 py-24 text-white"
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Marcas Clientes de Repsell Internacional"
          paragraph="Nos enorgullece contar con la confianza y respaldo de algunas marcas prestigiosas y reconocidas en Costa Rica."
          titleColor="text-white"
          center
        />

        <div className="mt-12 grid grid-cols-2 items-center justify-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <a
      href=""
      target="_blank"
      rel="noreferrer"
      className="group relative flex items-center justify-center"
    >
      <div className="relative flex h-28 w-28  items-center justify-center rounded-full bg-[#101933]/60  shadow-md transition duration-300 hover:shadow-blue-500/30">
        <Image
          src={imageLight}
          alt={name}
          width={100}
          height={100}
          className="object-cover grayscale-0 transition group-hover:grayscale"
        />
      </div>
    </a>
  );
};
