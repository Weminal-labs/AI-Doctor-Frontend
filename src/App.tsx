import React from "react";
import { TunangnModal } from "tunangn-react-modal";

// Import routes
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
import UserRoutes from "./routes/UserRoutes";

// Import themes
import { NormalTheme } from "./themes/normal";

// Import components
import Snackbar from "./components/modal_items/Snackbar";
import { __ModalItemNames } from "./components/modal_items/utils";

function App() {
  const [isAuthenticated] = React.useState(true);

  React.useEffect(function () {
    NormalTheme.enable("dark");
  }, []);

  return (
    <>
      {!isAuthenticated ? <AuthenticationRoutes /> : <UserRoutes />}

      <TunangnModal
        items={{
          [__ModalItemNames.Snackbar]: {
            element: Snackbar,
            position: "top",
            type: "snack-bar",
          },
        }}
      />
    </>
  );
}

export default App;
