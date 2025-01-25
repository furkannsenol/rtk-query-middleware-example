import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <div className="main-content">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
