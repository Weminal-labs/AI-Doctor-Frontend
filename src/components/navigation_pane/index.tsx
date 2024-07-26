// import React from "react";
import cn from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

// Import from components
import Button from "../buttons/Button";

// Import from routes config
import { RouteNames } from "src/routes.config";

const navigationButtonClassName =
  "flex hover:bg-first-40 hover:text-on-first mb-1 py-3 pe-6 ps-12 rounded-tr-xl rounded-br-xl";

export default function NavigationPane() {
  const routeNamekeys = Object.keys(RouteNames);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="m-6 py-6 bg-background outline outline-1 outline-on-background-10 rounded-xl h-[calc(100dvh-calc(5*24px)-28px)]">
      <nav className="flex flex-col pe-6">
        {routeNamekeys.map((key) => {
          if (RouteNames[key].canHideFromHeader) return null;

          return (
            <Button
              key={RouteNames[key].path}
              buttonType="normal"
              className={cn({
                [navigationButtonClassName]:
                  RouteNames[key].path !== location.pathname,
                [navigationButtonClassName +
                " bg-first outline outline-1 outline-on-background-10 focus:outline-none active:outline-none"]:
                  RouteNames[key].path === location.pathname,
              })}
              colorType="none"
              onClick={() => navigate(RouteNames[key].path)}
            >
              {RouteNames[key].name}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
