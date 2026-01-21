import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "../src/theme/ThemeRegistry";
import MainLayout from "../src/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VIGIAH - Sistema de Vigilancia Médica",
  description:
    "Sistema de Vigilancia e Indicadores de Gestión en Intervención y Angioplastia-Hemodinámica",
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ThemeRegistry>
          <MainLayout>{children}</MainLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
