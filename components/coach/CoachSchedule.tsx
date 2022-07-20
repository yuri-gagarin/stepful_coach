import React, { useContext, useEffect, useState} from 'react';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
//
import axios from "axios";
// store. state, components //
import { AppStore } from "../../context/Store";
// types ./
import { AxiosRequestConfig } from "axios";
import { Dispatch } from "react"; 
import { CoachAction } from '../../context/reducers/coachReducer';
 
interface ICoachScheduleProps {
}

export const getCoachesMeetings = async (coachId: string, dispatch: Dispatch<CoachAction>): Promise<any> => {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: "/api/meetings",
    params: { coachId, completed: 0 }
  }
  try {
    const { data } = await axios(req);
    const { message, meetings } = data;
    // ok we want meetings to show up by the day...., 
    // also ugly i know //
    meetings.sort((a : any, b: any) => {
      console.log(new Date(a.day));
      console.log(new Date(b.day))
      new Date(b.day).getSeconds() - new Date(a.day).getSeconds()
    });
    dispatch({ type: "FetchCoachSchedule", payload: { message, meetings } 
    });
  } catch (error: any) {
    console.error(error);
  }
} 
const handleCompleteMeeting = async (meetingId: string, rating: any, notes: string): Promise<any> => {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: "/api/meetings/" + meetingId,
    data: { rating, notes }
  }
  try {
    await axios(req)
  } catch (error) {
    throw error;
  }
}

export const CoachSchedule: React.FunctionComponent<ICoachScheduleProps> = () => {
  const [ notesFormState, setNotesFormState ] = useState<{ open: boolean; currentMeetingId: string; notes: string; rating: number | string; }>({ open: false, currentMeetingId: "", notes: "", rating: 0 });
  const { state, dispatch } = useContext(AppStore);
 
  const confirmCompleteMeeting = async (): Promise<any> => {
    const { currentMeetingId, rating, notes  } = notesFormState;
    try {
      await handleCompleteMeeting(currentMeetingId, rating, notes);
      // again this is a dumb shortcut, we should have a separete reducer action to update state correctly //
      await getCoachesMeetings(state.coachState.coach._id, dispatch);
      setNotesFormState({ open: false, currentMeetingId: "", notes: "", rating: "" });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
   
    state.coachState.coach && getCoachesMeetings(state.coachState.coach._id, dispatch);
   
  }, [ state.coachState.coach ]);

  return (
    <Grid.Row>
      <Grid.Column>
      {
        notesFormState.open ?
        <Form>
          <Form.Field>
            <Form.Input 
              label="Rate your meeting 1-5"
              placeholder={ "Rating here... should really be a slider/star rating etc"}
              onChange={ (e, data) => setNotesFormState({ ...notesFormState, rating: data.value as string })}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Notes about your meeting"
              onChange={ (e, data) => setNotesFormState({ ...notesFormState, notes: data.value as string }) }
            />
          </Form.Field>
          <Form.Field>
            <Button.Group>
              <Button color="green" content="Submit and mark complete" onClick={ confirmCompleteMeeting } />
              <Button color="orange" content="Cancel changes" onClick={() => setNotesFormState({ open: false, currentMeetingId: "", notes: "", rating: 0 })} />
            </Button.Group>
          </Form.Field>
        </Form>
        :
        <Item.Group>
        {
          state.coachState.meetings && state.coachState.meetings.map((meeting: any) => {
            return (
              <Item key={ meeting._id }>
                <Item.Content>
                  <Item.Header>{meeting.day}</Item.Header>
                  <Item.Description>
                    Student: { meeting.student.name }
                  </Item.Description>
                  <Item.Description>
                    Hours: { meeting.time }
                  </Item.Description>
                </Item.Content>
                <Item.Content>
                  <Button color="green" content="Mark Complete" onClick={() => setNotesFormState({ ...notesFormState, open: true, currentMeetingId: meeting._id } )} />
                </Item.Content>
              </Item>
            )
          })
        }
      </Item.Group>
      }
      </Grid.Column>
    </Grid.Row>
  );
};
