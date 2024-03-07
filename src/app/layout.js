import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "./index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Facilita Limpezas",
  description: "",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
        <Toaster />
      </html>
  );
}
