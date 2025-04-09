"use client";

import { useEffect } from "react";
import { getToken } from "@/services/auth";

export const useAuthProtection = () => {
  useEffect(() => {
    const token = getToken();

    if (!token) {
      console.log("🔴 Token no encontrado o expirado");
      window.location.href = "/signin";
    } else {
      console.log("✅ Token válido:", token);
      const expiresAt = localStorage.getItem("authTokenExpiration");

      if (expiresAt) {
        const ttl = parseInt(expiresAt) - Date.now();
        const secondsLeft = Math.floor(ttl / 1000);
        console.log(`⏳ Quedan ${secondsLeft} segundos antes de expirar`);

        const interval = setInterval(() => {
          const refreshedToken = getToken();
          if (!refreshedToken) {
            console.log("⛔️ Token expirado, redirigiendo...");
            window.location.href = "/signin";
            clearInterval(interval);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, []);
};
