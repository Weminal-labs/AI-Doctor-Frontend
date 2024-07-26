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
      <section className="float-left w-[25%] h-screen bg-background-10">
        <header className="m-6 p-6 outline outline-1 outline-on-background-10 rounded-xl bg-background">
          <h1 className="font-semibold text-xl">Aptopus</h1>
        </header>
        <NavigationPane />
      </section>
      <section className="float-right w-[75%] h-screen py-6 bg-background">
        <Outlet />
      </section>
    </>
  );
}
