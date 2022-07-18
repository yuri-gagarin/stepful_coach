import combineReducers from "react-combine-reducers";
//
import { testReducer, INITIAL_TEST_STATE } from "./testReducer";

import type { AppAction, GeneralAppState } from "../Store";


type RootReducer = (state: GeneralAppState, action: AppAction) => GeneralAppState;

export const [ rootReducer, state ] = combineReducers<RootReducer>({
  testState: [ testReducer, INITIAL_TEST_STATE ]
});

