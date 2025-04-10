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
      const expiresAt = localStorage.getItem("authTokenExpiration");

      if (expiresAt) {
        const ttl = parseInt(expiresAt) - Date.now();
        const secondsLeft = Math.floor(ttl / 1000);

        const interval = setInterval(() => {
          const refreshedToken = getToken();
          if (!refreshedToken) {
            window.location.href = "/signin";
            clearInterval(interval);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, []);
};
