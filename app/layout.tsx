import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // 
};

export const metadata: Metadata = {
  title: "Bò Ngon 888 - Menu Gọi Món",
  description: "Phở, Combo, Lẩu, Nướng - Bò tươi mỗi ngày",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bò Ngon 888",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased select-none touch-manipulation bg-slate-50">
        {children}
      </body>
    </html>
  );
}