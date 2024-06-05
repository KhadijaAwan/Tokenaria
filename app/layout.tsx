import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Providers from "./components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tokenaria",
  description: "It is an token handling application which refreshes the token in nextjs using next auth after 9 minutes because after 10 minutes access tokne is expired.",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
  keywords: ["nextjs tokens", "tokens", "refresh token", "next auth", "refresh-token", "access-token"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers></body>
    </html>
  );
}
