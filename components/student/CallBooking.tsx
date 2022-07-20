import React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Segment } from 'semantic-ui-react';
//
import axios from 'axios';
// store, addtl components //
import { BookingForm } from "./BookingForm";
import { AppStore } from "../../context/Store";
// types //
import type { AxiosRequestConfig } from "axios";
import type { Dispatch }from "react";
import type { StudentAction } from '../../context/reducers/studentReducer';

// these should be typed and in its own Actions folder ... 
const fetchAvailableCoaches = async (dispatch: Dispatch<StudentAction>): Promise<void> => {
  const reqOpts: AxiosRequestConfig = {
    url: "/api/coaches",
    method: "GET" // technically we only need to return ones that have availability ... but.. for now
  }
  try {
    const { data } = await axios(reqOpts);
    const { message, coaches } = data;
    // some more uglinesss //
    // so that availibity is sorted by day, even if a coach adds days not in order //
    console.log(coaches)
    for (const coach of coaches) {
      coach.availabilityDays = coach.availabilityDays.sort((a: any, b: any) => new Date(a.day).getTime() - new Date(b.day).getTime());
    } 
    dispatch({ type: "FetchCoachesForStudent", payload: { message, coaches } });
  } catch (error) {
    throw error;
  }
};
const handleNewBooking = async (dispatch: Dispatch<StudentAction>, coachId: string, day: string, time: string, studentId: string): Promise<void> => {
  const reqOpts: AxiosRequestConfig = {
    url: "/api/meetings",
    method: "POST",
    data: { coachId, studentId, day, time }
  }
  try {
    await axios(reqOpts);
  } catch (error) {
    console.log(error);
  }
};

interface ICallBookingProps {
  coaches: any[];
}

export const CallBooking: React.FunctionComponent<ICallBookingProps> = ({ coaches }): JSX.Element => {
  // local state //
  const [ bookingFormState, setBookingFormState ] = useState({ open: false, coach: null });

  const { state, dispatch } = useContext(AppStore);

  const triggerBookingForm = (coach: any): void => {
    setBookingFormState({ open: true, coach });
  };

  const handleBooking = async (coachId: string, day: string, time: string,): Promise<any> => {
    const studentId: string = state.studentState.student._id;
    try {
      await handleNewBooking(dispatch, coachId, day, time, studentId)
      // we shouldn't do this, in reality should update appstate to reflect changes to coaches, but... for times sake ...
      await fetchAvailableCoaches(dispatch).catch((e) => console.error(e));
      setBookingFormState({ open: false, coach: null });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAvailableCoaches(dispatch).catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    //console.log(coaches)
  }, [ coaches ])

  return (
    <Segment>
      {
        bookingFormState.open 
        ?
          <BookingForm 
            coach={ bookingFormState.coach } 
            handleBooking={ handleBooking }
            handleCancel={ () => setBookingFormState({ open:false, coach: null } )} 
          />
        :
        <Card.Group>
        {
          coaches && coaches.map((coach) => {
            return (
              <Card key={ coach._id } fluid>
                <Card.Content>
                  <Card.Meta>Coach name:</Card.Meta>
                  <Card.Header>{ coach.name }</Card.Header>
                  <Card.Description>Available days: { coach.availabilityDays.length }</Card.Description>
                  <Button color="blue" content="Book" onClick={ () => triggerBookingForm(coach) } />
                </Card.Content>
              </Card>
            )
          })
        }
      </Card.Group>
      }
    </Segment>
  );
};

