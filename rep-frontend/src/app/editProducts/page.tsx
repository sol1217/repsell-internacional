"use client";
import { Suspense, } from "react";

import EditProducts from "@/components/pages/productos/EditProducts/EditProducts";

const EditProductsPage = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
       <EditProducts/>
      </Suspense>
    </>

  );
};

export default EditProductsPage;
