import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/app/providers";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Enekele",
  description: "Expect greatness, Achieve Excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={`${outfit.variable} antialiased`}>{children}</body>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </html>
  );
}
