export type StudentState = {
  message?: string;
  student: any;
  coaches: any[];
  meetings: any[];
};

export type CreateStudent = {
  readonly type: "CreateStudent";
  readonly payload: { student: any };
};
export type FetchCoachesForStudent = {
  readonly type: "FetchCoachesForStudent";
  readonly payload: { coaches: any[] };
};
export type ScheduleCallWithCoach = {
  readonly type: "ScheduleCallWithCoach";
  readonly payload: { student: any, meeting?: any } // ohhhh with all the any
}

export type StudentAction = CreateStudent | FetchCoachesForStudent | ScheduleCallWithCoach;

export default function studentReducer(initState: StudentState = { student: {}, coaches: [], meetings: [] }, action: StudentAction): StudentState {
  switch (action.type) {
    case "CreateStudent": {
      return {
        ...initState,
        student: { ...action.payload.student },
      };
    }
    case "FetchCoachesForStudent": {
      return {
        ...initState,
        meetings: [ ...action.payload.coaches  ]
      };
    }
    case "ScheduleCallWithCoach": {
      return {
        ...initState,
        student: { ...action.payload.student },
        meetings: [ ...initState.meetings, action.payload.meeting ]
      };
    }
    default: return initState;
  }
};