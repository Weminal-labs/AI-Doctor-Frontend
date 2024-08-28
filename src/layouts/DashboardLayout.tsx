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
      <section className="m-6 min-w-[96px] h-[calc(100dvh-calc(2*24px))] max-[1140px]:hidden">
        <header className="flex items-center justify-center w-full py-6 border border-on-background-10/50 rounded-xl bg-background">
          <h1 className="font-bold text-xl">0</h1>
        </header>
        <NavigationPane />
      </section>
      <section className="float-right w-full h-[calc(100dvh-calc(2*24px))] my-6 max-[1140px]:w-full">
        <Outlet />
      </section>
    </div>
  );
}
