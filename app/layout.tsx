import type { Metadata } from "next";
import { Orbitron, Rajdhani, Space_Mono } from "next/font/google";
import "./globals.css";
import { AstroFlowProvider } from "@/components/providers/AstroFlowProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AstroFlow — Mission Intelligence & Structural Analysis",
  description:
    "Mission failure archive, dashboards, and fused physics + historical-risk screening with AI interpretation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceMono.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AstroFlowProvider>{children}</AstroFlowProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
