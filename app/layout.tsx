import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio — Digital Solutions & Creative Work",
  description: "Active Student · Freelance Web & Business · Musician",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
