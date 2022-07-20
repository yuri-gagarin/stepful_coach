import combineReducers from "react-combine-reducers";
//
import coachReducer from "./coachReducer";
import studentReducer from "./studentReducer";
//
import type { AppAction, GeneralAppState } from "../Store";


type RootReducer = (state: GeneralAppState, action: any) => GeneralAppState; // add types if time //

export const [ rootReducer, state ] = combineReducers<RootReducer>({
  coachState: [ coachReducer, { coach: {}, meetings: [], workdays: [] }],
  studentState: [ studentReducer, { student: {}, coaches: [], meetings: [] }]
});

