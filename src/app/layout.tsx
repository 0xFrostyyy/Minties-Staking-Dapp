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
      <div 
        className=" overflow-x-hidden max-w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }} 
        >
        <body className={inter.className}>
          <ThirdwebProvider>
            {children}
          </ThirdwebProvider>
        </body>
      </div>
    </html>
  );
}