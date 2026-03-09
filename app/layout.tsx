import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISR Test App",
  description: "Next.js ISR Test für Netcup/Plesk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
            <Link href="/" className="font-bold text-lg">
              ISR Test
            </Link>
            <Link href="/produkte" className="hover:text-blue-600">
              Produkte
            </Link>
            <Link
              href="/api/revalidate?secret=test123&path=/produkte"
              className="hover:text-blue-600 text-sm text-gray-500"
            >
              Revalidate API
            </Link>
          </div>
        </nav>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
