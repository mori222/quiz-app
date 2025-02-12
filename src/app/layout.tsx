"use client"

import React from "react";
import "../styles/css/reset.css";
import "../styles/css/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <html lang="ja">
      <body>
        <div className="wrap">
          {!pathname.includes('/quiz') && !pathname.includes('/result') && <Header />}
          <main>{children}</main>
          {!pathname.includes('/quiz') && !pathname.includes('/result') && !pathname.includes('/login') && !pathname.includes('/register') && <Footer />}
        </div>
      </body>
    </html>
  );
};

export default Layout;
