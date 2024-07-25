import React from "react";

export type PreventUpdateFn<T, N extends keyof T> = (
  data: T[N],
  state: T
) => boolean;
export type ChangeStateCallbackFn<T, N extends keyof T> = (
  data: T[N],
  state: T
) => T[N];
export type ChangeStateFn<T> = <N extends keyof T>(
  name: N,
  fn: ChangeStateCallbackFn<T, N>,
  preventUpdate?: PreventUpdateFn<T, N>
) => void;

// export type ChangeStateFn<T> = <N extends keyof T>(name: N, fn: (data: T[N]) => T[N]
// export type PreventUpdateFn<T, N extends keyof T> = (data: T[N]) => boolean

function getState<T, N extends keyof T>(
  state: T,
  name: N,
  fn: ChangeStateCallbackFn<T, N>
) {
  return { ...state, [name]: fn(state[name], state) };
}

/**
 * This hook allow using state and generate some explicit funtions that use `setState` inside.
 * The purpose of this hook is for clearer `setState` actions and centralize state of components.
 *
 * __WESSFns__ in `useStateManager` stand for __With Explicit SetState Functions__
 * @param state
 * @returns
 */
export function useStateManager<T, O>(
  state: T,
  build: (
    changeState: ChangeStateFn<T>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => O
) {
  // Get state and setState
  const [$, set$] = React.useState<T>(state);

  // Get ESSFns from React.useMemo()
  const _fns = React.useMemo(() => {
    // Create `changeState` function.
    const changeStage = function <N extends keyof T>(
      name: N,
      fn: ChangeStateCallbackFn<T, N>,
      preventUpdate?: PreventUpdateFn<T, N>
    ) {
      set$(function (prevState) {
        if (preventUpdate && preventUpdate(prevState[name], prevState))
          return prevState;
        return getState(prevState, name, fn);
      });
    };

    // Use build() to get object that contains functions for component use.
    return build(changeStage as ChangeStateFn<T>, set$);
  }, []);

  return [$, _fns] as const;
}
