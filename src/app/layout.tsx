import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Georgian } from "next/font/google";
import Header from "../components/Header";
import AuthProvider from "@/providers/AuthProvider";
import Logo from "../../public/assets/logo.png";

const NotoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-NotoSansGeorgian",
});

export const metadata: Metadata = {
  title: "English Journey",
  description: "English-Blog",
  icons: [{ rel: "icon", url: Logo.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NotoSansGeorgian.variable} bg-primary text-premium text-base`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
