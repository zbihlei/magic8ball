
import { Space_Mono } from 'next/font/google';
import "./globals.css";

const sm = Space_Mono({ subsets: ['latin'] , weight:'400' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sm.className}>{children}</body>
    </html>
  );
}

