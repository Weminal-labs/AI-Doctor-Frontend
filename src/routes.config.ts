type RouteName = {
  path: string;
  name: string;
  canHideFromHeader?: boolean;
};

/**
 * Use this metadata to build a navigation bar is recommended
 */
export const RouteNames: { [K: string]: RouteName } = {
  home: {
    path: "/home",
    name: "Home",
  },
  chat: {
    path: "/chat",
    name: "Ask me",
  },
  signup: {
    path: "/sign-up",
    name: "Sign Up",
    canHideFromHeader: true,
  },
  activateAccount: {
    path: "/activate-account",
    name: "Acctivate Account",
    canHideFromHeader: true,
  },
};
