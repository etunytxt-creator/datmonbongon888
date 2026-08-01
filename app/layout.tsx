import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // Bắt buộc để tràn viền
  themeColor: "#f8fafc", // Màu slate-50 trùng với nền ứng dụng
};

export const metadata: Metadata = {
  title: "Bò Ngon 888 - Menu Gọi Món",
  description: "Phở, Combo, Lẩu, Nướng - Bò tươi mỗi ngày",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default", // Đổi thành default để hiển thị thanh trạng thái sáng/tối tự nhiên
    title: "Bò Ngon 888",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="bg-slate-50 h-full">
      <head>
        {/* Meta tag bắt buộc cho Safari trên iOS để đổi màu dải trên Dynamic Island */}
        <meta name="theme-color" content="#f8fafc" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased select-none touch-manipulation bg-slate-50 min-h-full">
        {children}
      </body>
    </html>
  );
}