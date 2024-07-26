// import React from 'react'
import { Outlet } from "react-router-dom";

// Import from components
import NavigationPane from "src/components/navigation_pane";

/**
 * Render dashboard layout, including the navigation pane in left and main content in right
 * @returns
 */
export default function DashboardLayout() {
  return (
    <>
      <section className="float-left w-3/12 h-screen bg-background">
        <header className="m-6 p-6 outline outline-1 outline-on-background-10 rounded-lg">
          <h1 className="font-semibold text-xl">Aptopus</h1>
        </header>
        <NavigationPane />
      </section>
      <section className="float-right w-9/12 h-screen bg-background">
        <Outlet />
      </section>
    </>
  );
}
