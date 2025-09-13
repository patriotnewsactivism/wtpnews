import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "../components/Nav";

export const metadata: Metadata = {
  title: "WTP News",
  description: "Investigations, accountability, and civil-rights reporting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Nav />
        {children}
      </body>
    </html>
  );
}
