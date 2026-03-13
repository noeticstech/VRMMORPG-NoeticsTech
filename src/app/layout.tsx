import type { Metadata, Viewport } from "next";
import { Orbitron, Sora } from "next/font/google";
import { getThemeStyle } from "@/config/theme";
import "./globals.css";

const headingFont = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noeticstech.example"),
  title: "NoeticsTech",
  description:
    "NoeticsTech builds a persistent VRMMORPG universe platform for virtual societies, AI ecosystems, and player-driven economies.",
  keywords: [
    "NoeticsTech",
    "VRMMORPG",
    "virtual universe",
    "metaverse technology",
    "AAA game studio",
    "VR platform",
  ],
  openGraph: {
    title: "NoeticsTech",
    description:
      "A futuristic landing page for a persistent VRMMORPG platform with AI ecosystems and player-driven worlds.",
    images: ["/images/hero-vr-world.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoeticsTech",
    description:
      "Building the future of VR MMORPG worlds where players live inside the game.",
    images: ["/images/hero-vr-world.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#030817",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={getThemeStyle()}
        className={`${headingFont.variable} ${bodyFont.variable} bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
