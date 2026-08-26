import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abel Jason — Full Stack Developer",
  description: "Backend-focused Full Stack Developer & Information Systems student. Building systems that solve real operational problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased" suppressHydrationWarning>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
