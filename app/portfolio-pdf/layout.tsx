import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Document (PDF) — Jason Abel Sugiarto",
  description:
    "Selected Systems & Engineering Project Showcase PDF Portfolio by Jason Abel Sugiarto.",
};

export default function PortfolioPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
