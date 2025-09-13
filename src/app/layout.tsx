import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WTP News",
  description: "Investigations, accountability, and civil-rights reporting."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}