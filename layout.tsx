import type { Metadata } from "next";
import { Sidebar, BottomNav } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nítido Studio",
  description: "Content Studio — gestión de contenido para clientes, en un solo lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="lg:flex lg:min-h-screen">
          <Sidebar />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
