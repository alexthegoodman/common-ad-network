import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/contexts/AuthContext";
import Navbar from "@/app/components/Navbar";
import { DM_Serif_Display } from "next/font/google";
import { Trophy } from "@phosphor-icons/react";
import { Footer } from "./components/Footer";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Common Ad Network - Ad Exchange for Indie Makers",
  description:
    "Join the invite-only ad network for indie makers. Earn karma by displaying ads, spend karma to promote your projects. CTR-based rewards system with fraud protection.",
  keywords: "ad network, indie makers, advertising, karma system, CTR rewards",
  authors: [{ name: "Common Ad Network" }],
  openGraph: {
    title: "Common Ad Network - Ad Exchange for Indie Makers",
    description:
      "Join the invite-only ad network for indie makers. Earn karma by displaying ads, spend karma to promote your projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSerifDisplay.className}>
      <body className="font-serif antialiased bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
