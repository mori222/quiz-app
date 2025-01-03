"use client"

import React from "react";
import "../styles/css/reset.css";
import "../styles/css/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';


type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <html lang="ja">
      <body>
        <div className="wrap">
          <Header title={title} />
          <main>
            {children}
          </main>
          {pathname !== '/login' && pathname !== '/register' && <Footer />}
        </div>
      </body>
    </html>
  );
};

export default Layout;