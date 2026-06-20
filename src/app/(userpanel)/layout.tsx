import { Navbar } from "@/components/Navbar";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;