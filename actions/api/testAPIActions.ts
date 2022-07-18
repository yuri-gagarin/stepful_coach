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
    const { message, testModels } = data as { message: string; testModels: any };
    dispatch({ type: "TestIndex", payload: { loading: false,  value: message, testModels } });
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
    const { message, newTestModel } = data as { message: string; newTestModel: any };
    dispatch({ type: 'TestCreate', payload: { loading: false,  value: message, newTestModel} });
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
    const { message, deletedTestModel } = data as { message: string; deletedTestModel: any };
    dispatch({ type: 'TestDelete', payload: { loading: false,  value: message, deletedTestModel } });
  } catch (e: any) {
    console.log(e);
    throw e;
  }
} 