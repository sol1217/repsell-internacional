"use client";
import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import NewsLatterBox from "@/components/Features/Contact/NewsLatterBox";

const Contact = () => {
  const [globalMessage, setGlobalMessage] = useState<{ text: string; type: "success" | "warning" } | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const [buttonText, setButtonText] = useState("Enviar Mensaje");
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "info@gruposelly.com",
          "template_9zcv0pr",
          form.current,
          "frFPhKvlbZ8DyyXhk",
        )
        .then(
          () => {
            setIsSent(true);
            setButtonText("Enviado ✅");
          },
          (error) => {
            console.error("FAILED...", error.text);
            setButtonText("Error al enviar mensaje");
          },
        );
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-24 text-white"
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <div className="video-repsell absolute inset-0 z-0 flex h-full w-full items-center justify-center">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-darken"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/corporativo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="contact-form  rounded-xl bg-[#101933] p-8  shadow-md backdrop-blur-md lg:mb-5">
              <h2 className="mb-3 text-3xl font-bold text-white">
                Nuestro equipo está aquí para ayudarle
              </h2>
              <p className="mb-10 text-base text-white/80">
                ¿Tienes alguna consulta o necesitas asesoría sobre nuestros
                productos?
              </p>
              <form ref={form} onSubmit={sendEmail}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Nombre Completo:
                      </label>
                      <input
                        name="from_name"
                        type="text"
                        placeholder="Escriba su nombre"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Correo Electrónico:
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Escriba su correo"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Número de identificación:
                      </label>
                      <input
                        type="id"
                        name="id"
                        placeholder="Número de identificación"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Tipo de identificación:
                      </label>
                      <input
                        type="type_id"
                        name="type_id"
                        placeholder="Tipo de identificación"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Dirección:
                      </label>
                      <input
                        type="address"
                        name="address"
                        placeholder="Dirección"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2  focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Teléfono:
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        placeholder="Teléfono"
                        className="w-full rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Mensaje:
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="¿Cómo podemos ayudarle?"
                        className="w-full resize-none rounded-md border border-white/10 bg-[#1a1f33] px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-700"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={isSent}
                      className="rounded-full bg-[#e11b24] px-8 py-3 text-base font-medium text-white shadow-lg transition duration-300 hover:bg-[#e11b24]/90"
                    >
                      {buttonText}
                    </button>
                  </div>

                  {globalMessage && (
                    <div
                      className={`px-6 py-4 text-center text-base font-medium shadow-lg ${
                        globalMessage.type === "success" ? "bg-green-800 text-green-200" : "bg-yellow-700 text-yellow-100"
                      }`}
                    >
                      {globalMessage.text}
                    </div>
                  )}

                </div>
              </form>
            </div>
          </div>

          <div className="w-full px-4 lg:w-5/12 xl:w-4/12 mt-10 lg:mt-0">
            <NewsLatterBox />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
