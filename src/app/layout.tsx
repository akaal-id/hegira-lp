import type { Metadata } from "next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/smooth-scroll/SmoothScroll";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import styles from "./layout.module.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hegira.id"),
  title: "Hegira — The Integrated Event Platform for Organizers",
  description:
    "Hegira gives organizers everything to sell tickets, manage attendees, and grow B2C, B2B, and B2G events — with a whitelabel experience that feels entirely your own.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  other: {
    "msapplication-config": "/favicon/browserconfig.xml",
    "msapplication-TileColor": "#18093b",
  },
  openGraph: {
    title: "Hegira — Run Every Event. On One Platform.",
    description:
      "Sell tickets, manage attendees, and grow your events with a whitelabel platform built for every kind of organizer.",
    url: "https://hegira.id",
    siteName: "Hegira",
    images: [
      {
        url: "/icon/hegiralogo.png",
        width: 988,
        height: 386,
        alt: "Hegira",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hegira — The Integrated Event Platform",
    description: "Run every event on one platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} ${styles.html}`}
    >
      <body className={styles.body}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
