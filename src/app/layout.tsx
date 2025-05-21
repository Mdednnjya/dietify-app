import type { Metadata } from "next";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { poppins } from "@/src/components/ui/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dietify - Smart Meal Planning",
  description: "Personalized meal plans tailored to your dietary goals and preferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}