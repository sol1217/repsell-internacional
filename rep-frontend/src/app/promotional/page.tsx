import { Metadata } from "next";
import Promotional from "@/components/pages/productos/Promotional/Promotional";

export const metadata: Metadata = {
  title: "Promocionales y empresariales",
  description:
    "Nuestros productos promocionales y empresariales están diseñados para fortalecer la identidad de tu marca y crear un impacto duradero. Desde regalos corporativos hasta material publicitario, ofrecemos soluciones personalizadas que reflejan la esencia de tu empresa.",
  keywords:
    "promocionales, empresariales, diseños, ganadores, marca, publicitario,personalizados",
};

const PromotionalPage = () => {
  return (
    <div className="bg-white">
      <Promotional />
    </div>
  );
};

export default PromotionalPage;
