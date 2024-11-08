import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minties Staking dApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className="h-screen bg-[#B0FE76]">
        <body className={inter.className}>
          <ThirdwebProvider>
            {children}
          </ThirdwebProvider>
        </body>
        </div>
    </html>
  );
}
