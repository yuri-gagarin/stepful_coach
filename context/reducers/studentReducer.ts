export type StudentState = {
  message?: string;
  student: any;
  coaches: any[];
  meetings: any[];
};

export type CreateStudent = {
  readonly type: "CreateStudent";
  readonly payload: { message?: string; student: any };
};
export type FetchCoachesForStudent = {
  readonly type: "FetchCoachesForStudent";
  readonly payload: { message?: string; coaches: any[] };
};
export type ScheduleCallWithCoach = {
  readonly type: "ScheduleCallWithCoach";
  readonly payload: { message?: string; student: any, meeting?: any } // ohhhh with all the any
}

export type StudentAction = CreateStudent | FetchCoachesForStudent | ScheduleCallWithCoach;

export default function studentReducer(initState: StudentState = { student: {}, coaches: [], meetings: [] }, action: StudentAction): StudentState {
  switch (action.type) {
    case "CreateStudent": {
      return {
        ...initState,
        message: action.payload.message,
        student: { ...action.payload.student },
      };
    }
    case "FetchCoachesForStudent": {
      return {
        ...initState,
        message: action.payload.message,
        coaches: [ ...action.payload.coaches ],
        meetings: [ ...action.payload.coaches  ]
      };
    }
    case "ScheduleCallWithCoach": {
      return {
        ...initState,
        message: action.payload.message,
        student: { ...action.payload.student },
        meetings: [ ...initState.meetings, action.payload.meeting ]
      };
    }
    default: return initState;
  }
};