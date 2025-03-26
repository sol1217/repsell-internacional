"use client";
import { useState } from "react";
import CheckList from "./CheckList";
import Image from "next/image";
import repsell from "public/images/hero/RepselInternacional.png";
import SectionTitle from "@/components/Common/SectionTitle";
import FeatureBox from "@/components/Features/ServicesShowcase/FeatureBox ";
import { CheckCircle } from "lucide-react";

const services = [
  {
    title: "Lite",
    icon: "/images/hero/3.jpg",
    description:
      "¡Impacta desde la primera impresión! Contamos con tecnología de punta en impresión digital.",
    items: [
      "Fabricantes 100% costarricenses",
      "Amplia gama de productos",
      "Calidad y Durabilidad",
      "Personalización",
      "Flexibilidad y Variedad",
      "Orientación al cliente",
      "Pines (Sublimados o full color)",
      "Cristales grabados a láser",
      "Maderas con placa sublimada",
    ],
  },
  {
    title: "Basic",
    icon: "/images/hero/2.jpeg",
    description:
      "Hemos estado trabajando arduamente para llevar la calidad y la excelencia.",
    items: [
      "Trofeos (Metal y Polímeros)",
      "Copas (Metal y Polímeros)",
      "Resinas",
      "Medallas (Metal, Acrílicas y Ecológicas)",
      "Dorsales deportivos",
      "Pines personalizados",
      "Maderas grabadas a láser",
    ],
  },
  {
    title: "Plus",
    icon: "/images/hero/1.jpg",
    description:
      "En Repsell, convertimos tus ideas en obras maestras de gran formato.",
    items: [
      "Diseño y Calidad",
      "Premiaciones personalizadas",
      "Fabricación de placas",
      "Medallas únicas",
      "Acrílicos full color",
      "Grabado láser preciso",
    ],
  },
];

const ServicesShowcase = () => {
  return (
    <section className="relative z-10 py-24 text-white">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/voleibol.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto  px-4 text-center">
        <div className="mb-10 flex items-center justify-center">
          <Image
            src={repsell}
            alt="Repsell logo"
            height={300}
            width={300}
            className="z-10"
          />
        </div>

        <h2 className="mb-4 font-mono text-4xl font-bold drop-shadow">
          Nuestros Servicios y Productos
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-white/80">
          Únase a nosotros en este emocionante viaje mientras continuamos
          celebrando logros junto a ustedes.
        </p>

        <div className="grid grid-cols-1 gap-10 text-left md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-[#4A6CF7]/20 bg-[#101933] p-6 shadow-md backdrop-blur-md transition hover:shadow-blue-500/30"
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={150}
                  height={150}
                  className="rounded-lg border border-[#4A6CF7]/30 shadow-md"
                />
              </div>

              <p className="mb-4 text-center text-sm text-white/80">
                {service.description}
              </p>

              <ul className="mt-4 space-y-2">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={18} className="mt-0.5 text-[#e11b24]" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
