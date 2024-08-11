export type RouteData = {
  path: string;
  name: string;
  Element: JSX.Element | (() => JSX.Element);
  children?: Array<RouteData>;
};

export type LocalStateManager<InitialStateGetter, StateFnsGetter> = {
  getInitialState: InitialStateGetter;
  getStateFns: StateFnsGetter;
};
