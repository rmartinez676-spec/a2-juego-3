import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OPOS · Repaso Oficial 58 Temas y Casos Prácticos · Gestión A2 AGE",
  description: "Videojuego de plataformas de repaso para la oposición de Gestión de la Administración Civil del Estado (GACE A2) con test y casos prácticos.",
  applicationName: "OpoJuego A2",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OpoJuego A2",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=3" },
      { url: "/icons/icon-512.png?v=3", sizes: "512x512", type: "image/png" },
      { url: "/icons/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#1b2430",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
