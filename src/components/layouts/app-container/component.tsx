import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { SideBar } from "../sidebar";

export const AppContainer: React.FC = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <main className="d-flex flex-grow-1">
        <div
          className={classNames([
            "flex",
          ])}
        >
          <SideBar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};