// import React from 'react'
import { Outlet, useLocation } from "react-router-dom";

function AuthTitle(props: { type?: string }) {
  switch (props.type) {
    case "sign-up": {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2 text-on-background">
            SIGN UP
          </h1>
          <p className="text-lg text-on-background">
            Let assign your information here and become one of our users
          </p>
        </>
      );
    }

    case "activate-account": {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2 text-on-background">
            ACTIVATE YOUR ACCOUNT
          </h1>
          <p className="text-lg text-on-background">
            You aren't our official user if you don't activate your account
          </p>
        </>
      );
    }

    case "sign-in":
    default: {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2 text-on-background">
            SIGN IN
          </h1>
          <p className="text-lg text-on-background">
            Do we know you? Let's see
          </p>
        </>
      );
    }
  }
}

export default function AuthenticationLayout() {
  const location = useLocation();
  const authActionType = location.pathname.slice(1);

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full h-screen bg-background">
      <div className="mb-4">
        <AuthTitle type={authActionType} />
      </div>
      <Outlet />
    </div>
  );
}
