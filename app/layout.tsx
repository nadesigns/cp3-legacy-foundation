import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cp3legacyfoundation.com"),
  title: "CP3 Family Legacy Foundation",
  description:
    "Connecting People, Potential & Purpose in Families — faith-based nonprofit in Hampton Roads / Suffolk, VA.",
  icons: {
    icon: "/images/cp3logo.png",
    shortcut: "/images/cp3logo.png",
    apple: "/images/cp3logo.png",
  },
  openGraph: {
    title: "CP3 Family Legacy Foundation",
    description: "Connecting People, Potential & Purpose in Families",
    url: "https://cp3legacyfoundation.com",
    siteName: "CP3 Family Legacy Foundation",
    type: "website",
    images: [
      {
        url: "/images/cp3logo.png",
        width: 1536,
        height: 1024,
        alt: "CP3 Family Legacy Foundation logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CP3 Family Legacy Foundation",
    description: "Connecting People, Potential & Purpose in Families",
    images: ["/images/cp3logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
