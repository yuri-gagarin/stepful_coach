import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, Menu } from "semantic-ui-react";
//
import axios from "axios";
import { faker } from '@faker-js/faker';
// store, addtl components //
import { AppStore } from "../../context/Store";
import { CallBooking } from "../../components/student/CallBooking";
// types //
import { Dispatch } from "react";
import { AxiosRequestConfig } from "axios";

interface IStudentIndexProps {
}

type StudentMenu = "book_a_call" | "my_schedule";

const hourHelper = (hour: string[]): string => {
  return hour.join(" - ")
};
const generateMockStudent = async (dispatch: Dispatch<any>): Promise<void> => {
  const reqOpts: AxiosRequestConfig = {
    url: "/api/students",
    method: "POST",
    data: { name: faker.name.firstName() }
  }
  try {
    const { data } = await axios(reqOpts);
    const { message, newStudent } = data;
    dispatch({ type: "CreateStudent", payload: { message, student: newStudent } });
    localStorage.setItem("studentData", JSON.stringify(newStudent));
  } catch (er) {
    console.log(er);
  }
}

export const StudentIndex: React.FunctionComponent<IStudentIndexProps> = (props) => {
  const [ activeItem, setActiveItem ] = useState<StudentMenu>("book_a_call");
  // context //
  const { state, dispatch } = useContext(AppStore);


  // this is our crappy mock login for a student ..../
  useEffect(() => {
    if (localStorage.getItem("studentData")) {
      const student = JSON.parse(localStorage.getItem("studentData") as string);
      dispatch({ type: "CreateStudent", payload: { message: "Student from LocalStorage", student } });
    } else {
      console.log("need to mock login a student")
    }
  }, []);

  return (
    <>
      <Grid.Row>
        <Grid.Column width={ 4 }>
          <Menu fluid vertical tabular>
            <Menu.Item>
              <Button color="green" content="Mock Student Login" onClick={ () => generateMockStudent(dispatch) } />
            </Menu.Item>
            <Menu.Item
              as="a"
              name="book_a_call"
              active={ activeItem === "book_a_call" }
            />
              <Menu.Item
              as="a"
              name="my_schedule"
              active={ activeItem === "my_schedule" }
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={ 12 }>
          <CallBooking coaches={ state.studentState.coaches } />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default StudentIndex;
