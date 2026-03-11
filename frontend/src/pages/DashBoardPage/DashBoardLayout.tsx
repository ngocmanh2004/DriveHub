import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="container-scroller">
      {/* <ProBanner /> */}
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Header />
        <div className="main-panel">
          <div className="pb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
