import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oposiciones A2 AGE · Misión Funcionario",
    short_name: "OpoJuego A2",
    description: "Videojuego de repaso de los 58 temas y supuestos prácticos oficiales para la oposición de Gestión de la Administración Civil del Estado (A2 AGE).",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1524",
    theme_color: "#0c1524",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
