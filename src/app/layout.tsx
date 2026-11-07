import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Fresh Groceries Delivered to Your Door",
  description:
    "FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.",
};

import { Toaster } from "@/components/ui/sonner";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureStrip from "@/components/home/FeatureStrip";
import { getAllCategories } from "@/api/services/api.service";
import type { CategoryType } from "@/types";
import { MyProvider } from "@/components/layout/MyProvider";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let categories: CategoryType[] = [];
  try {
    categories = await getAllCategories();
  } catch {
    categories = [];
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MyProvider>
          <TopBar />
          <Navbar categories={categories} />
          <main className="flex-1">{children}</main>
          <FeatureStrip />
          <Footer />
          <Toaster position="top-right" closeButton />
        </MyProvider>
      </body>
    </html>
  );
}
