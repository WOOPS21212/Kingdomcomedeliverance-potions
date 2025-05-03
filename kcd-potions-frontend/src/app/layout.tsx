import Link from "next/link";

export const metadata = {
  title: "KCD Potion Guide",
  description: "All potions from Kingdom Come: Deliverance 2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#111', color: 'white', margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ 
          padding: '16px', 
          borderBottom: '1px solid #333', 
          display: 'flex', 
          gap: '24px',
          fontSize: '18px'
        }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link href="/potions" style={{ color: 'white', textDecoration: 'none' }}>Potions</Link>
        </nav>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>{children}</div>
      </body>
    </html>
  );
}
