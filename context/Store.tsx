import React, { createContext, useReducer } from "react";
import { rootReducer } from "./reducers/rootReducer";
//
import type { Dispatch, PropsWithChildren } from "react";
//
import { INITIAL_TEST_STATE, TestAction, TestState } from "./reducers/testReducer";

export type AppAction = TestAction;

export type GeneralAppState = {
  testState: TestState;
};

export interface IGlobalAppContext {
  state: GeneralAppState;
  dispatch: Dispatch<AppAction>;
};

export const INITIAL_CONTEXT: IGlobalAppContext = {
  state: {
    testState: INITIAL_TEST_STATE,
  },
  dispatch: (value: any): void => {}
}

export const AppStore = createContext<IGlobalAppContext>(INITIAL_CONTEXT);

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [ state, dispatch ] = useReducer(rootReducer, { ...INITIAL_CONTEXT.state });

  return ( 
    <AppStore.Provider value={{ state: state, dispatch: dispatch }}>
      { children }
    </AppStore.Provider>
  )
}



