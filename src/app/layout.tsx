import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Legal Brief",
  description: "A Legal app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${lexendDeca.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
