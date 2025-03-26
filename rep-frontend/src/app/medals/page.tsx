import { Metadata } from "next";
import Medals from "@/components/pages/productos/Medals/Medals";

export const metadata: Metadata = {
  title: "Medallas Repsell International",
  description:
    "Las Medallas Repsell International destacan por su artesanía superior y su diseño distintivo. Perfectas para premiar a los mejores en cualquier competencia, estas medallas reflejan el prestigio y la dedicación que define a los ganadores.",
  keywords: "medallas, reconocimientos, diseño,premios,competencia, ganadores",
};

const MedalsPage = () => {
  return (
    <div className="bg-white">
      <Medals />
    </div>
  );
};

export default MedalsPage;
