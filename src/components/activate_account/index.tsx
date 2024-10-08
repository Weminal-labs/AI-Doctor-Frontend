import React from "react";
import { useNavigate } from "react-router-dom";

// Import apis
// import { Auth_API } from "src/apis";

// Import utils
import { BrowserStorageUtils } from "src/utils/browser_storage";

// Import layouts
import FormLayoutData from "src/layouts/form/FormLayoutData";

// Import components
import Button from "../buttons/Button";
import LoadingIndicator from "../loading_indicator";
import { openSnackbar } from "../modal_items/utils";

// Import form
import { ActiveAccountForm } from "src/forms/active_account";

// Import route configs
// import { RouteNames } from 'src/routes.config';

// Import types
import type { FormPromptDataProps } from "src/types/form";

export default function ActivateAccount() {
  const [isActivating, setIsActivating] = React.useState(false);
  const navigate = useNavigate();
  const __FormContentData__ = React.useMemo(function () {
    return ActiveAccountForm as any as FormPromptDataProps;
  }, []);

  return (
    <FormLayoutData
      className="block max-w-sm w-full"
      data={__FormContentData__}
      handleOnSubmit={function () {
        // const { code } = formData;
        const username = BrowserStorageUtils.getTempItem<string>("username");

        if (!username) {
          openSnackbar({
            headerColor: "error",
            content: "Username is required",
          });
          navigate("/");
          return;
        }

        setIsActivating(true);

        // Auth_API.activateAccountAsync({ username, code }).then((result) => {
        //   let message = "";
        //   let snackbarHeaderColor = "";
        //   if (result.error) {
        //     message = result.error.message as string;
        //     snackbarHeaderColor = "error";
        //   }

        //   if (result.success) {
        //     message = result.success.message as string;
        //     snackbarHeaderColor = "success";
        //   }

        //   openSnackbar({
        //     headerColor: snackbarHeaderColor as any,
        //     content: message,
        //   });
        //   navigate("/");
        //   setIsActivating(false);
        // });
      }}
      actionElements={
        <Button
          key="submit"
          className="flex items-center justify-center w-full"
          type="submit"
          disabled={isActivating}
        >
          {isActivating ? (
            <LoadingIndicator
              text={<p className="text-on-primary ms-3">Vui lòng chờ...</p>}
            />
          ) : (
            "Kích hoạt tài khoản"
          )}
        </Button>
      }
    />
  );
}
