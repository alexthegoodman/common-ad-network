import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Common Ad Network - Ad Exchange for Indie Makers",
  description: "Join the invite-only ad network for indie makers. Earn karma by displaying ads, spend karma to promote your projects. CTR-based rewards system with fraud protection.",
  keywords: "ad network, indie makers, advertising, karma system, CTR rewards",
  authors: [{ name: "Common Ad Network" }],
  openGraph: {
    title: "Common Ad Network - Ad Exchange for Indie Makers",
    description: "Join the invite-only ad network for indie makers. Earn karma by displaying ads, spend karma to promote your projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
