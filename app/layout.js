import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "../src/theme/ThemeRegistry";
import ConditionalLayout from "../src/components/layout/ConditionalLayout";
import { AuthProvider } from "../lib/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clínica de Cardiometabolismo - Seguimiento post-ICP",
  description:
    "Clínica de Cardiometabolismo para seguimiento post-ICP (Intervención Coronaria Percutánea)",
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthProvider>
            <ProtectedRoute>
              <ConditionalLayout>{children}</ConditionalLayout>
            </ProtectedRoute>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
