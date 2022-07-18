import axios from "axios";
// types //
import type { Dispatch } from "react";
import type { AxiosRequestConfig } from "axios";
import type { TestAction } from "../../context/reducers/testReducer";

export const testIndexCall = async (dispatch: Dispatch<TestAction>): Promise<void> => {

  const requestConfig: AxiosRequestConfig = {
    withCredentials: true,
    url: "/api/test",
    method: "GET"
  };

  try {
    const { data } = await axios(requestConfig);
    const message = data.message as string;
    dispatch({ type: "TestIndex", payload: { loading: false,  value: message} });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const testCreateCall = async (dispatch: Dispatch<TestAction>): Promise<void> => {
  const requestConfig: AxiosRequestConfig = {
    url: "/api/test",
    method: "POST",
    data: {}
  };

  try {
    const { data } = await axios(requestConfig);
    const message = data.message as string;
    dispatch({ type: 'TestCreate', payload: { loading: false,  value: message} });
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};

export const testDeleteCall = async (dispatch: Dispatch<TestAction>): Promise<void> => {
  const requestConfig: AxiosRequestConfig = {
    url: "/api/test/idhere",
    method: "DELETE",
  };

  try {
    const { data } = await axios(requestConfig);
    const message = data.message as string;
    dispatch({ type: 'TestDelete', payload: { loading: false,  value: message} });
  } catch (e: any) {
    console.log(e);
    throw e;
  }
} 