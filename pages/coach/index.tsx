import React, { useEffect, useState, useContext } from 'react';
import { Button, Label, Form } from "semantic-ui-react";
import Calendar from "react-calendar";
// additinal node deps //
import axios  from "axios";
import { faker } from "@faker-js/faker";
// components, store, context
import { AppStore } from "../../context/Store";
import { CoachPastMeetings } from '../../components/coach/CoachPastMeetings';
import { CoachSchedule } from '../../components/coach/CoachSchedule';
import { SideMenu } from "../../components/coach/SideMenu";
//  types //
import type { AxiosRequestConfig } from "axios";
import type { Dispatch } from "react";
import type { CheckboxProps, MenuItemProps } from "semantic-ui-react";
import type { CoachAction } from '../../context/reducers/coachReducer';
//
import "react-calendar/dist/Calendar.css";


interface ICoachIndexProps {
  // not needed for now ...
}
type AvailFormState = {
  formOpen: boolean;
  currentDay?: string;
  availableHours: string[];
};
type CoachMenu = "add_availability" | "view_schedule" | "view_past_meetings";


const hours = [
  [ "00:00", "02:00" ],
  [ "02:00", "04:00" ],
  [ "04:00", "06:00" ],
  [ "06:00", "08:00" ],
  [ "08:00", "10:00" ],
  [ "10:00", "12:00" ],
  [ "12:00", "14:00" ],
  [ "14:00", "16:00" ],
  [ "16:00", "18:00" ],
  [ "18:00", "20:00" ],
  [ "20:00", "22:00" ],
  [ "22:00", "24:00" ],
]; // i guess 2 hour string increments work for now //
   // better way to do it maybe with int/float values, but that creates a whole new problem of itself //

// actions, helpers //
const hourHelper = (hour: string[]): string => {
  return hour.join(" - ")
};
const createMockCoach = async (dispatch: Dispatch<CoachAction>): Promise<void> => {
  const reqOpts: AxiosRequestConfig = {
    url: "/api/coaches",
    method: "POST",
    data: { name: faker.name.firstName() }
  };
  try {
    const { data } = await axios(reqOpts);
    const { message, newCoach } = data;
    dispatch({ type: "CreateCoach", payload: { message, coach: newCoach } });
    // set to local storage - because - reasons... (page refresh??)
    localStorage.setItem("coachData", JSON.stringify(newCoach))
  } catch (e) {
    console.log(e);
  }
};
const handleSubmitDaysAvailability = async (dispatch: Dispatch<CoachAction>, coachId: string, availForm: AvailFormState): Promise<void> => {
  // types needed for axios response //
  const req: AxiosRequestConfig = {
    url: "/api/workdays",
    method: "POST",
    data: { coachId, day: availForm.currentDay, hours: availForm.availableHours.sort() }
  };
  try {
    const { data } = await axios(req);
    const { message, newWorkDay, updatedCoach } = data;
    dispatch({ type: "AddWorkDay", payload: { message, coach: updatedCoach } });
  } catch (error) {
    throw error;
  }
};

export const CoachIndex: React.FunctionComponent<ICoachIndexProps> = (props) => {
  // local state //
  const [ startDate ] = useState<Date>(new Date());
  const [ activeItem, setActiveItem ] = useState<CoachMenu>("add_availability");
  const [ availFormState, setAvailFormState ] = useState<AvailFormState>({ formOpen: false, currentDay: "", availableHours: [] });
  // refs //
  // context //
  const { state, dispatch } = useContext(AppStore);

  const handleCoachMenuNavigate = (e: any, data: MenuItemProps): void => {
    setActiveItem(data.name as CoachMenu);
  };

  // coach availability-calendae related //
  // calendar listeners //
  const handleCalendarDateChange = (date: Date): void => {
    setAvailFormState({ ...availFormState, currentDay: date.toDateString(), formOpen: true, availableHours: [] });
  };
  const handleCheckboxChange = (_e: React.FormEvent<HTMLInputElement>, data: CheckboxProps): void => {
    if (data.checked) {
      setAvailFormState({ ...availFormState, availableHours: [ ...availFormState.availableHours, data.value as string ] });
    } else {
      const updatedHours: string[] = availFormState.availableHours.filter((hour) => hour !== data.value as string);
      setAvailFormState({ ...availFormState, availableHours: [ ...updatedHours ] });
    }
  };
  // update availability close and clear checkboxes //
  const submitAvailability = async () => {
    const coachId = state.coachState.coach._id as string;
    try {
      await handleSubmitDaysAvailability(dispatch, coachId, availFormState);
      setAvailFormState({ formOpen: false, currentDay: "", availableHours: [] });
    } catch (error) {
      // should have error popups/modals and updated AppState for the user //
      console.log(error)
    }
  }
  // END //


  // and this is our crappy mock login for a coach .... ///
  useEffect(() => {
    if (localStorage.getItem("coachData")) {
      const coach = JSON.parse(localStorage.getItem("coachData") as string);
      dispatch({ type: "CreateCoach", payload: { message: "Coach from LocalStorage", coach } });
    } else {
      console.log("need to mock login a coach")
    }
  }, []);



  return (
    <SideMenu activeItem={activeItem} createMockCoach={() => createMockCoach(dispatch) } handleCoachMenuNavigate={ handleCoachMenuNavigate }>
      {
        activeItem == "add_availability"
        ?
        <>
          <Calendar 
            value={ startDate }
            minDate={ new Date() }
            onChange={ handleCalendarDateChange }
          />
          {
            availFormState.formOpen &&
            <Form style={{ marginTop: "1em" }}>
              <Form.Group>
                <Label color="olive" content={ availFormState.currentDay } />
              </Form.Group>
              <Form.Group>
                <Label>Select available hours:</Label>
              </Form.Group>
              <Form.Group style={{ overflowY: "scroll" }}>
              {
                hours.map((hourData, i) => {
                  return (
                    <Form.Checkbox 
                      className='avail-checkbox'
                      key={i} label={ hourHelper(hourData) } 
                      style={{ border: "1px solid green", borderRadius: "2px", padding: "1em"  }}
                      onChange={ handleCheckboxChange } 
                      value={hourHelper(hourData)} />
                  
                  )
                })
              }
              </Form.Group>     
              <Button.Group>
                <Button 
                  basic 
                  color='green' 
                  content="Submit" 
                  onClick={ submitAvailability } />
                <Button 
                  basic  
                  color="orange" 
                  content="Cancel" 
                  onClick={ () => setAvailFormState({ formOpen: false, availableHours: [] } )} 
                />  
              </Button.Group> 
            </Form>
          }
        </>
        :
        activeItem === "view_schedule"
        ?
        <CoachSchedule />
        :
        <CoachPastMeetings />
      }
    </SideMenu>
  );
          
};

export default CoachIndex;
