import { ClientProvider } from "@/hooks/useClient";
import React from "react";
import { Link, NavLink, Outlet } from "react-router";

function App() {
  return (
    <>
      <ClientProvider>
        <div className="flex flex-col items-start justify-items-start h-screen w-screen">
          <nav>
            <NavLink to="/">Logger</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
          <Outlet />
        </div>
      </ClientProvider>
    </>
  );
}

export default App;
