import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import AboutUsHistory from "@/components/pages/About/AboutUsHistory ";
import GalleryAbout from "@/components/pages/About/Gallery";

export const metadata: Metadata = {
  title: "Historia Repsell international",
  description:
    "Actualmente, en Repsell Internacional, fabricamos en forma directa para todas las empresas organizadoras y gubernamentales; dorsales, lonas, trofeos, pines, grabados, medallas de metal, ecológicas y acrílicas, cristales y todo tipo de reconocimientos, promocionales y gran formato en general.",
  keywords: "medallas, trofeos, costa rica, repsell, historia, copas",
};

const AboutPage = () => {
  return (
    <div>
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Repsell Internacional"
        description="Nuestra misión es ofrecer un servicio excepcional, comprometido con la calidad, la innovación y la atención al detalle. Trabajamos con pasión para garantizar que cada cliente reciba un producto personalizado que no solo cumpla, sino que supere sus expectativas."
      />

      <AboutUsHistory />

      <GalleryAbout />
    </div>
  );
};

export default AboutPage;
