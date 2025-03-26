import Brands from "@/components/Features/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import FeaturesSection from "@/components/Features";
import Hero from "@/components/Features/Hero";
import ServicesShowcase from "@/components/Features/ServicesShowcase";
import Testimonials from "@/components/Features/Testimonials";
import { Metadata } from "next";
import InformationSection from "@/components/Features/InformationSection/InformationSection";
import LandingVideo from "@/components/Features/LandingVideo";
import Contact from "@/components/Features/Contact";
import AboutSection from "@/components/Features/AboutSection/AboutSection";

export const metadata: Metadata = {
  title: "Repsell Internacional – Líder en Premiaciones y Reconocimientos",
  description:
    "Repsell Internacional es el líder en la venta de trofeos, medallas y reconocimientos personalizados. Innovación en premiaciones y cristales en Costa Rica.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <InformationSection />
      <AboutSection />
      <LandingVideo />
      <FeaturesSection />
      <Testimonials />
      <ServicesShowcase />
      <Brands />
      <Contact />
    </>
  );
}
