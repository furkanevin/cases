import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gate.io: Buy/Sell Bitcoin, Ethereum | Cryptocurrency Exchange',
  description:
    'Leading cryptocurrency exchange with over 1700+ cryptocurrencies & stablecoins such as Bitcoin ✓ Ethereum ✓ Dogecoin ✓ Start trading crypto with Gate.io ...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
