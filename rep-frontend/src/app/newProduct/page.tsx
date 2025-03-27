import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import NewProducts from "@/components/pages/productos/NewProducts/NewProducts";

export const metadata: Metadata = {
  title: "Nuevo productos",
  description: "Nuevos productos en Repsell International",
};

const NewProductPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb
        color="text-[#000000]"
        pageName="¿Deseas agregar nuevos productos?"
        description="Agrega nuevos productos: Reconocimientos, Medallas, Artículos Promocionales, Trofeos, Copas e Impresiones en Gran Formato."
      />

        <NewProducts />

    </div>
  );
};

export default NewProductPage;
