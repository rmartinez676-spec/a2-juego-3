import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oposiciones A2 AGE · Misión Funcionario",
    short_name: "OpoJuego A2",
    description: "Videojuego de repaso de los 58 temas y supuestos prácticos oficiales para la oposición de Gestión de la Administración Civil del Estado (A2 AGE).",
    start_url: "/?source=pwa&v=3",
    id: "/?source=pwa&v=3",
    display: "standalone",
    background_color: "#54c5fd",
    theme_color: "#54c5fd",
    icons: [
      {
        src: "/favicon.ico?v=3",
        sizes: "16x16 24x24 32x32 48x48 64x64 128x128 256x256",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192.png?v=3",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
