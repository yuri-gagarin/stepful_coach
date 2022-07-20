import  React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Header } from 'semantic-ui-react';
//
import axios from "axios";
// additional comps, state //
import { AppStore } from "../../context/Store";
// types //
import type { AxiosRequestConfig } from "axios";
import type { Dispatch } from "react";

interface ICoachPastMeetingsProps {

}


// actions //
const getCoachesMeetings = async (coachId: string, dispatch: Dispatch<any>): Promise<any> => {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: "/api/meetings",
    params: { coachId, completed: 1 }
  }
  try {
    const { data } = await axios(req);
    const { message, meetings } = data;
    // ok we want meetings to show up by the day.... eventually, 
    // and probably sorted by hour //
    dispatch({ type: "FetchCoachSchedule", payload: { message,  meetings }});
  } catch (error: any) {
    console.error(error);
  }
} ;

export const CoachPastMeetings: React.FunctionComponent<ICoachPastMeetingsProps> = (props): JSX.Element => {
  const [ openNotes, setOpenNotes ] = useState<boolean>(false);
  // context //
  const { state, dispatch } = useContext(AppStore);

  useEffect(() => {
    state.coachState.coach && getCoachesMeetings(state.coachState.coach._id, dispatch)
  }, [ state.coachState.coach ]);

  return (
    <Card.Group>
      {
        state.coachState.meetings && state.coachState.meetings.map((completedMeeting: any) => {
          return (
            <Card key={completedMeeting._id}>
              <Card.Content>
                <Card.Header>{completedMeeting.day}</Card.Header>
                <Card.Meta>Time: {completedMeeting.time}</Card.Meta>
                <Card.Description>Student: {completedMeeting.student.name} </Card.Description>
                <Card.Description>Rating: { completedMeeting.rating }</Card.Description>
                {
                   openNotes &&
                  <Card.Description>
                    <Header>Meeting notes:</Header>
                    { completedMeeting.meetingNotes }
                  </Card.Description>
                }
                <Card.Description>
                  <Button color="green" content={ openNotes ? "Close" : "View Notes" } onClick={ () => setOpenNotes(!openNotes) } />
                </Card.Description>
                
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  );
};

