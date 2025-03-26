import { Metadata } from "next";
import Impression from "@/components/pages/productos/Impression/Impression";

export const metadata: Metadata = {
  title: "Impresiones Repsell International",
  description:
    "La impresión en gran formato es ideal para dar vida a tus ideas en una escala mayor. Perfecta para banners, vallas publicitarias, pósters, y más, esta técnica garantiza imágenes de alta calidad y colores vibrantes, asegurando que tu mensaje se destaque en cualquier entorno.",
};

const ImpressionPage = () => {
  return (
    <div className="bg-white">
      <Impression />
    </div>
  );
};

export default ImpressionPage;
