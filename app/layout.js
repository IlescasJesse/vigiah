import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "../src/theme/ThemeRegistry";
import ConditionalLayout from "../src/components/layout/ConditionalLayout";

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
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
