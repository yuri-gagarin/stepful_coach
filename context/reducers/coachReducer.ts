export type CoachState = {
  message?: string;
  coach: any;
  meetings: any[];
  workdays: any[];
};

export type CreateCoach = {
  readonly type: "CreateCoach";
  readonly payload: { message?: string; coach: any };
};
export type FetchCoachSchedule = {
  readonly type: "FetchCoachSchedule";
  readonly payload: { message?: string;  meetings: any[] };
};
export type AddWorkDay = {
  readonly type: "AddWorkDay";
  readonly payload: { message?: string; coach: any, workday?: any } // ohhhh with all the any
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
      console.log(action.payload.coach)
      return {
        ...initState,
        coach: { ...action.payload.coach },
        workdays: [ ...initState.workdays, action.payload.workday ]
      };
    }
    default: return initState;
  }
};