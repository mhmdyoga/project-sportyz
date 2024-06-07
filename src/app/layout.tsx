"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNav = pathname === "/auth/login" || pathname === "/auth/register"? false : true;
  return (
    <html lang="en">
      <title>Sportyz</title> 
      <body className={inter.className}>
        <AuthProvider>
        {showNav && <Header/>}
        {children}
         <Toaster />
         </AuthProvider>
        </body>
    </html>
  );
}
