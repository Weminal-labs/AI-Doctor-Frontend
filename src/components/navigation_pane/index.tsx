// import React from "react";
import cn from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

// Import from components
import Button from "../buttons/Button";

// Import from routes config
import { RouteNames } from "src/routes.config";

const _baseButtonClassName =
  "flex mb-1 py-4 pe-6 ps-12 rounded-tr-lg rounded-br-lg text-lg";

const _buttonClassNames = {
  hover: _baseButtonClassName + " hover:bg-first-10/20 hover:text-on-first",
  focus:
    _baseButtonClassName +
    " bg-gradient-to-r from-first to-second/50 outline outline-1 outline-first focus:outline-none active:outline-none font-bold",
};

export default function NavigationPane() {
  const routeNamekeys = Object.keys(RouteNames);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="m-6 py-6 bg-background border border-on-background-10/50 rounded-xl h-[calc(100dvh-calc(5*24px)-28px)]">
      <nav className="flex flex-col pe-6">
        {routeNamekeys.map((key) => {
          if (RouteNames[key].canHideFromHeader) return null;

          return (
            <Button
              key={RouteNames[key].path}
              buttonType="normal"
              className={cn({
                [_buttonClassNames.hover]:
                  RouteNames[key].path !== location.pathname,
                [_buttonClassNames.focus]:
                  RouteNames[key].path === location.pathname,
              })}
              colorType="none"
              onClick={() => navigate(RouteNames[key].path)}
            >
              <div className="flex justify-center">
                {RouteNames[key].ggIcon && (
                  <span className="material-symbols-outlined me-6">
                    {RouteNames[key].ggIcon}
                  </span>
                )}
                <span>{RouteNames[key].name}</span>
              </div>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
