"use client";

import { BsFillCartXFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { FaTrashAlt } from "react-icons/fa";
import NewsLatterBox from "@/components/Features/Contact/NewsLatterBox";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("info@gruposelley.com", "cotizacion", form.current, {
        publicKey: "frFPhKvlbZ8DyyXhk",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setIsEmailSent(true);
          setEmailError(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setEmailError(true);
          setIsEmailSent(false);
        },
      );
  };

  useEffect(() => {
    const storedPromotionals =
      JSON.parse(localStorage.getItem("selectedPromotionals")) || [];
    const storedMedals =
      JSON.parse(localStorage.getItem("selectedMedals")) || [];
    const storedTrophies = JSON.parse(localStorage.getItem("trophies")) || [];
    const storedImpressions =
      JSON.parse(localStorage.getItem("impressions")) || [];
    const storedRecognitions =
      JSON.parse(localStorage.getItem("recognitions")) || [];

    const combinedItems = [
      ...storedPromotionals,
      ...storedMedals,
      ...storedTrophies,
      ...storedImpressions,
      ...storedRecognitions,
    ];
    setCartItems(combinedItems);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updateLocalStorage = (key, filterFn) => {
      const storedItems = JSON.parse(localStorage.getItem(key)) || [];
      const updatedItems = storedItems.filter(filterFn);
      localStorage.setItem(key, JSON.stringify(updatedItems));
    };

    const filterFunctions = {
      selectedPromotionals: (item) => item.id !== itemId,
      selectedMedals: (item) => item.id !== itemId,
      trophies: (item) => item.id !== itemId,
      impressions: (item) => item.id !== itemId,
      recognitions: (item) => item.id !== itemId,
    };

    for (const [key, filterFn] of Object.entries(filterFunctions)) {
      updateLocalStorage(key, filterFn);
    }

    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <section
      className=""
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >
      <Breadcrumb
        color="text-black"
        pageName="Repsell International (Cotización)"
        description="Cotice sus reconocimientos, promocionales e impresión a gran formato."
      />

      <div className="relative flex flex-row items-center justify-center py-28">
        <div className="video-repsell absolute inset-0 z-0 flex h-full w-full items-center justify-center">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-darken"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/images/video/atletismo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
        </div>
        <div className="mr-10 w-1/2 max-w-5xl rounded-xl bg-[#101933] p-8 text-white shadow-xl backdrop-blur-md">
          <h3 className="mb-4 text-center text-2xl font-bold">
            Productos Seleccionados
          </h3>

          {cartItems.length > 0 ? (
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-[#1a1f33] p-4 shadow-md"
                  >
                    <Image
                      src={item.image || "/default-image.png"}
                      alt={item.name || "Producto"}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <p className="flex-1 text-sm">
                      {item.name || `Código #${item.id}`}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      type="button"
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nombre completo"
                  className="rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <input
                  type="number"
                  name="number"
                  required
                  placeholder="Número de teléfono"
                  className="rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <input
                  type="text"
                  name="id"
                  required
                  placeholder="Número de identificación"
                  className="rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Correo electrónico"
                  className="rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <input
                  type="text"
                  name="adress"
                  required
                  placeholder="Dirección"
                  className="rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <input
                type="hidden"
                name="product_names"
                value={cartItems
                  .map((item) => item.name || `Código #${item.id}`)
                  .join(", ")}
              />

              <input
                type="submit"
                value="Cotizar Productos"
                className="w-full rounded-full bg-[#e11b24] px-6 py-3 font-medium text-white shadow-lg transition hover:bg-[#c8101c]"
              />

              {isEmailSent && (
                <p className="text-center text-green-400">
                  ¡Enviado correctamente!
                </p>
              )}
              {emailError && (
                <p className="text-center text-red-400">
                  No se pudo enviar la cotización. Inténtalo nuevamente.
                </p>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <BsFillCartXFill size={60} className="text-white/50" />
              <h3 className="text-lg">No hay productos seleccionados</h3>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-white/70">
            Una de nuestras agentes de ventas pronto se contactará con usted
            para brindarle la información solicitada.
          </p>
        </div>

        <div className="w-full lg:w-1/3">
          <NewsLatterBox />
        </div>
      </div>
    </section>
  );
};

export default Cart;
