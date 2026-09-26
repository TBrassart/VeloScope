import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeloScope — Comprendre et composer son vélo",
  description:
    "Explorez 8 846 composants vélo, construisez votre montage et vérifiez les dimensions et compatibilités à partir de sources documentées.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
