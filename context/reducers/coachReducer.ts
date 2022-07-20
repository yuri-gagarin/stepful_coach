export type CoachState = {
  coach: any;
  meetings: any[];
  workdays: any[];
};

export type CreateCoach = {
  readonly type: "CreateCoach";
  readonly payload: { coach: any };
};
export type FetchCoachSchedule = {
  readonly type: "FetchCoachSchedule";
  readonly payload: { meetings: any[] };
};
export type AddWorkDay = {
  readonly type: "AddWorkDay";
  readonly payload: { coach: any, workday?: any } // ohhhh with all the any
}

export type CoachAction = CreateCoach | FetchCoachSchedule | AddWorkDay;

export default function coachReducer(initState: CoachState = { coach: {}, meetings: [], workdays: [] }, action: CoachAction): CoachState {
  switch (action.type) {
    case "CreateCoach": {
      return {
        ...initState,
        coach: { ...action.payload.coach },
      };
    }
    case "FetchCoachSchedule": {
      return {
        ...initState,
        meetings: [ ...action.payload.meetings ]
      };
    }
    case "AddWorkDay": {
      return {
        ...initState,
        coach: { ...action.payload.coach },
        workdays: [ ...initState.workdays, action.payload.workday ]
      };
    }
    default: return initState;
  }
};