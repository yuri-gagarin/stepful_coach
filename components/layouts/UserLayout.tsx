import React, { useContext, useEffect } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
// next //
import Link from "next/link";
// context //

interface IUserLayoutProps extends React.PropsWithChildren {
  pageProps?: any;
}

export const UserLayout: React.FunctionComponent<IUserLayoutProps> = ({ children }): JSX.Element => {

  /*
  const { state } = useContext(AppStore);

  useEffect(() => {
    console.log(state);
  },  [ state ])
  */

  return (
    <Grid style={{ border: "10px solid red" }}>
      <Grid.Row>
        <Menu fluid>
          <Link href={ "/coach" }>
            <Menu.Item as="a">
              Coach Menu
            </Menu.Item>
          </Link>
          <Link href={ "/student" }>
            <Menu.Item as="a">
              Student Menu
            </Menu.Item>
          </Link>   
        </Menu>
      </Grid.Row>
      { children }
    </Grid>
  );
};

