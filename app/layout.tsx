import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookProvider } from "./contexts/BookContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} box-border py-8`}>
        <BookProvider>{children}</BookProvider>
      </body>
    </html>
  );
}
