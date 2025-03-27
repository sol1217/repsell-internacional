import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import ProductMain from "@/components/pages/productos/products";

export const metadata: Metadata = {
  title: "Lista de productos",
  description:
    "Lista de Productos\n" +
    "Reconocimientos, Medallas, Promocionales, Trofeos, Copas y Impresiones.",
};

const ProductPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb
        color="text-[#000000]"
        pageName="Lista de Productos"
        description="Listado de productos actuales: Reconocimientos • Medallas • Artículos Promocionales • Trofeos • Copas • Impresión en Gran Formato."
      />

      <ProductMain />
    </div>
  );
};

export default ProductPage;
