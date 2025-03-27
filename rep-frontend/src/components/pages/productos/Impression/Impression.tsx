import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import SingleImpression from "@/components/pages/productos/Impression/SingleImpression";

const Impression = () => {
  return (
    <div>
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Impresión Gran Formato"
        description="La impresión en gran formato es ideal para dar vida a tus ideas en una escala mayor. Perfecta para banners, vallas publicitarias, pósters, y más, esta técnica garantiza imágenes de alta calidad y colores vibrantes."
      />


      <SingleImpression />

    </div>
  );
};

export default Impression;
