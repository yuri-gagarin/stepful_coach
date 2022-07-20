import React, { useEffect, useState, useContext } from 'react';
// additinal node deps //
import axios  from "axios";
import { faker } from "@faker-js/faker";
// components, store, context
import { AppStore } from "../../context/Store";
import { SideMenu } from "../../components/coach/SideMenu";
//  types //
import type { AxiosRequestConfig } from "axios";
import type { Dispatch } from "react";
import type { CheckboxProps, MenuItemProps } from "semantic-ui-react";

interface ICoachIndexProps {

}

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


type CoachMenu = "add_availability" | "view_schedule" | "view_past_meetings";

const createMockCoach = async (dispatch: Dispatch<any>): Promise<void> => {
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

export const CoachIndex: React.FunctionComponent<ICoachIndexProps> = (props) => {
  // local state //
  const [ activeItem, setActiveItem ] = useState<CoachMenu>("add_availability");
  // refs //
  // context //
  const { state, dispatch } = useContext(AppStore);


  const handleCoachMenuNavigate = (e:any, data: MenuItemProps): void => {
    setActiveItem(data.name as CoachMenu);
  };



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
      <div>Does it work?</div>
    </SideMenu>
  );
          
};

export default CoachIndex;
