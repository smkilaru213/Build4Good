import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finch — Fewer Applications. More Interviews.",
  description: "Stop mass applying. Finch helps CS and engineering students target the right roles, tailor materials automatically, and get more interviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&family=Manrope:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}