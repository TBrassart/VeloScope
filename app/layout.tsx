import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeloScope — Montez le vélo qui vous ressemble",
  description:
    "Explorez les composants vélo, vérifiez leur compatibilité et composez votre prochain montage avec VeloScope.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
