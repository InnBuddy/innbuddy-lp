import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Konmaike — Japan's 47 Prefectures | Landmarks, Cuisine, Festivals & Travel Etiquette",
  description:
    "An editorial English travel atlas covering all 47 prefectures of Japan: regional landmarks, local dishes, seasonal festivals, cafes, and practical traveler guidance.",
  keywords: [
    "Konmaike",
    "Japan travel guide",
    "47 prefectures of Japan",
    "Japan regional cuisine",
    "Japanese festivals",
    "Japan travel etiquette",
  ],
  authors: [{ name: "Konmaike Editorial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Konmaike",
    title: "Konmaike — Japan's 47 Prefectures Travel & Culture Atlas",
    description:
      "Explore all 47 Japanese prefectures through regional landmarks, food, festivals, and practical travel guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konmaike — Explore Japan's 47 Prefectures",
  },
};

export default function KonmaikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}