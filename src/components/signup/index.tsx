import React from "react";
// import { useNavigate } from "react-router-dom";

// Import apis
// import { Auth_API } from "src/apis";

// Import utils
// import { BrowserStorageUtils } from "src/utils/browser_storage";

// Import layouts
import FormLayoutData from "src/layouts/form/FormLayoutData";

// Import components
import Button from "../buttons/Button";
import LoadingIndicator from "../loading_indicator";
// import { openSnackbar } from "../modal_items/utils";

// Import form
import { SignupForm } from "src/forms/signup";

// Import route configs
// import { RouteNames } from "src/routes.config";

// Import types
import type { RegisterUser } from "src/objects/User";
import type { FormPromptDataProps } from "src/types/form";

export default function Signup() {
  const [isSigningup, setIsSigningup] = React.useState(false);
  // const navigate = useNavigate();
  const __FormContentData__ = React.useMemo(function () {
    return SignupForm as any as FormPromptDataProps;
  }, []);

  return (
    <FormLayoutData
      className="block max-w-sm w-full"
      data={__FormContentData__}
      handleOnSubmit={function (formData) {
        if (formData.password !== formData.confirmedPassword) {
          return;
        }

        const registra: RegisterUser = formData;

        console.log("Registra: ", registra);

        setIsSigningup(true);

        // Auth_API.signupAsync(registra).then((result) => {
        //   let message = "";
        //   let snackbarHeaderColor = "";
        //   if (result.error) {
        //     message = result.error.message as string;
        //     snackbarHeaderColor = "error";
        //   }

        //   if (result.success) {
        //     message = result.success.message as string;
        //     snackbarHeaderColor = "success";
        //     BrowserStorageUtils.setTempItem("username", formData.username);
        //   }

        //   openSnackbar({
        //     headerColor: snackbarHeaderColor as any,
        //     content: message,
        //   });
        //   if (result.success) navigate(RouteNames.activateAccount.path);
        // });
      }}
      actionElements={
        <Button
          key="submit"
          className="flex items-center justify-center w-full"
          type="submit"
          disabled={isSigningup}
        >
          {isSigningup ? (
            <LoadingIndicator
              text={<p className="text-on-primary ms-3">Vui lòng chờ...</p>}
            />
          ) : (
            "Đăng ký"
          )}
        </Button>
      }
    />
  );
}
