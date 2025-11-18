import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MediGen - Personalized Meditation Generator",
  description: "Generate personalized guided meditations tailored to your goals, dreams, and desired state. Merge neuroscience and meditation in a calming digital experience.",
  keywords: ["meditation", "guided meditation", "visualization", "relaxation", "mindfulness", "theta frequencies", "neuroplasticity"],
  authors: [{ name: "MediGen" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
