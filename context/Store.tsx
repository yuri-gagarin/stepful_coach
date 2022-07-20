import React, { createContext, useReducer } from "react";
import { rootReducer } from "./reducers/rootReducer";
//
import type { Dispatch, PropsWithChildren } from "react";
import type { CoachState, CoachAction } from "./reducers/coachReducer";
import type { StudentState, StudentAction } from "./reducers/studentReducer";
//

export type AppAction = CoachAction | StudentAction; // add if time //

export type GeneralAppState = {
  coachState: CoachState
  studentState: StudentState;
};

export interface IGlobalAppContext {
  state: GeneralAppState;
  dispatch: Dispatch<AppAction>;
};

export const INITIAL_CONTEXT: IGlobalAppContext = {
  state: {
      coachState: { coach: {}, meetings: [], workdays: [] },
      studentState: { student: {}, coaches: [], meetings: [] },
  },
  dispatch: (value: AppAction): void => {}
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



