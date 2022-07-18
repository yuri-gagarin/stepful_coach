import React, { createContext, useReducer } from "react";
import { rootReducer } from "./reducers/rootReducer";
//
import type { Dispatch, PropsWithChildren } from "react";
import { INITIAL_TEST_STATE, TestAction, TestState } from "./reducers/testReducer";
import { INITIAL_ITEM_STATE, ItemAction, ItemState } from "./reducers/itemReducer";

export type AppAction = ItemAction | TestAction;

export type GeneralAppState = {
  testState: TestState;
  itemState: ItemState;
};

export interface IGlobalAppContext {
  state: GeneralAppState;
  dispatch: Dispatch<AppAction>;
};

export const INITIAL_CONTEXT: IGlobalAppContext = {
  state: {
    testState: INITIAL_TEST_STATE,
    itemState: INITIAL_ITEM_STATE
  },
  dispatch: (value: any): void => {}
}

const AppStore = createContext<IGlobalAppContext>(INITIAL_CONTEXT);

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [ state, dispatch ] = useReducer(rootReducer, { ...INITIAL_CONTEXT.state });

  return ( 
    <AppStore.Provider value={{ state: state, dispatch: dispatch }}>
      { children }
    </AppStore.Provider>
  )
}



