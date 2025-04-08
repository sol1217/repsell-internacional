"use client";

import Image from "next/image";
import { useState } from "react";
import trophy from "public/images/products/trophy.png";
import BubbleDecoration from "@/components/Common/BubbleDecoration";
import { api } from "@/utils/config";

const SigninPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${api}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user, password }),
      },
    );

    const resultado = await response.json();
    console.log(resultado);

    if (response.ok) {
      window.location.href = "/admin";
    } else {
      setErrorMessage(resultado.message || "Usuario o contraseña incorrectos.");
    }

    setLoading(false);
  };

  return (
    <section
      className="relative z-10  flex min-h-screen items-center justify-center "
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 100%)",
      }}
    >
      <div className="video-repsell absolute inset-0 z-0 flex h-full w-full items-center justify-center">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-darken"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/corporativo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>

      <BubbleDecoration/>

      <div className="absolute">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="grad1"
              cx="50%"
              cy="50%"
              r="80%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#4A6CF7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0A0F24" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="1440" height="969" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="mx-4 mb-8 mt-40 w-full max-w-md rounded-xl bg-[#101933]/90 p-10 text-white shadow-xl backdrop-blur-md">
        <div className="mb-8 flex flex-col items-center justify-center ">
          <Image
            className="custom-img-size custom-img-animation  h-auto w-[300px] sm:w-[200px]"
            src={trophy}
            alt="Trofeo"
          />
          <h3 className="text-2xl font-bold">Perfil Administrador</h3>
          <p className="mt-2 text-sm text-white/70">
            Solo personal administrador puede ingresar a este apartado.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user" className="block text-sm font-medium">
              Tu Usuario
            </label>
            <input
              type="text"
              name="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="mt-1 w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Tu Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="mt-1 w-full rounded-md bg-[#1a1f33] px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
            />
          </div>

          <div className="text-right">
            <a
              href="https://wa.link/h2pg27"
              className="text-sm text-red-700 hover:underline"
            >
              ¿Olvidaste tu cuenta?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#e11b24] px-6 py-3 font-medium text-white transition hover:bg-[#c8101c]"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>

          {errorMessage && (
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SigninPage;
