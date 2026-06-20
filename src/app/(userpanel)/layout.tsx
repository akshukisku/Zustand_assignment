import { Navbar } from "@/components/Navbar";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
};
export default MainLayout;
