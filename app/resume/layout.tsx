import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Jason Abel Sugiarto",
  description:
    "Backend-focused Full Stack Developer & Information Systems student at Institut Widya Pratama Pekalongan. Resume of Jason Abel Sugiarto.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
