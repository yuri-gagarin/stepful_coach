import React, { useEffect, useReducer, useContext } from 'react';
// 
import { Grid } from 'semantic-ui-react';
// context //
import { AppStore } from "../../context/Store";

interface IUserLayoutProps extends React.PropsWithChildren {
  pageProps?: any;
}

export const UserLayout: React.FunctionComponent<IUserLayoutProps> = ({ children }): JSX.Element => {

  /*
  const { state } = useContext(AppStore)

  useEffect(() => {
    console.log(state)
  }, []);
  */

  return (
    <Grid style={{ border: "10px solid red" }}>
      { children }
    </Grid>
  );
};

