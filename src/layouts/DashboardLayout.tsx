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
    <div className="flex bg-background-10">
      <section className="float-left w-full max-w-[412px] h-[calc(100dvh-calc(2*24px))] my-6 max-[1140px]:hidden">
        <header className="mx-6 p-6 border border-on-background-10/50 rounded-xl bg-background">
          <h1 className="font-bold text-xl">Aptopus</h1>
        </header>
        <NavigationPane />
      </section>
      <section className="float-right w-full h-[calc(100dvh-calc(2*24px))] my-6 max-[1140px]:w-full">
        <Outlet />
      </section>
    </div>
  );
}
