import combineReducers from "react-combine-reducers";
//
import { itemReducer, INITIAL_ITEM_STATE } from './itemReducer';
import { testReducer, INITIAL_TEST_STATE } from "./testReducer";

import type { AppAction, GeneralAppState } from "../Store";


type RootReducer = (state: GeneralAppState, action: AppAction) => GeneralAppState;

export const [ rootReducer, state ] = combineReducers<RootReducer>({
  itemState: [ itemReducer, INITIAL_ITEM_STATE ],
  testState: [ testReducer, INITIAL_TEST_STATE ]
});

