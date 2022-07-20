import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

interface IBookingFormProps {
  coach: any;
  handleCancel(): any;
  handleBooking(coachId: string, day: string, hour: string): any;
}

export const BookingForm: React.FunctionComponent<IBookingFormProps> = ({ coach, handleCancel, handleBooking }): JSX.Element => {
   
  return (
    <Segment>
      <Header>Availability for: { coach.name }</Header>
      {
        coach.availabilityDays.map((day: any) => {
          return (
            <Segment key={ day.day }>
              <Header>{ day.day }</Header>
              {
                day.hours.map((hour: any) => {
                  return (
                    <Button
                      key={hour}
                      basic
                      color='green'
                      onClick={() => handleBooking(coach._id, day.day, hour)}
                      content={hour}
                     />
                  )
                })
              }
            </Segment>
          )
        })
      }
      <Button basic color="orange" content="Cancel" onClick={ handleCancel } />
    </Segment>
  );
};

