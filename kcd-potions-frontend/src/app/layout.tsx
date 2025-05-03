import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "KCD Potion Guide",
  description: "All potions from Kingdom Come: Deliverance 2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <nav className="p-4 border-b border-gray-700 flex gap-6 text-lg">
          <Link href="/">Home</Link>
          <Link href="/potions">Potions</Link>
        </nav>
        <div className="max-w-6xl mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
