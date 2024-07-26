import React from "react";

// Import from routes config
import { RouteNames } from "src/routes.config";

export default function NavigationPane() {
  return (
    <div className="my-6 h-[calc(100dvh-calc(2*24px)-28px)]">
      <nav></nav>
    </div>
  );
}
