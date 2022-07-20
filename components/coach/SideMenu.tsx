import React from 'react';
import { Button, Grid, Menu } from "semantic-ui-react";
// types //
import { MenuItemProps } from "semantic-ui-react";

interface ISideMenuProps extends React.PropsWithChildren {
  activeItem: "add_availability" | "view_schedule" | "view_past_meetings";
  createMockCoach(): any;
  handleCoachMenuNavigate(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps): any;
}

export const SideMenu: React.FunctionComponent<ISideMenuProps> = ({ children, activeItem, createMockCoach, handleCoachMenuNavigate }) => {
  return (
    <Grid.Row>
      <Grid.Column width={ 4 }>
        <Menu fluid vertical tabular>
          <Menu.Item>
            <Button color="green" content="Mock Coach Login" onClick={ () => createMockCoach() } />
          </Menu.Item>
          <Menu.Item
            as="a"
            name="add_availability"
            active={ activeItem === "add_availability" }
            onClick={ handleCoachMenuNavigate }
          />
          <Menu.Item
            as="a"
            name="view_schedule"
            active={ activeItem === "view_schedule"}
            onClick={ handleCoachMenuNavigate }
          />
          <Menu.Item
            as="a"
            name="view_past_meetings"
            active={ activeItem === "view_past_meetings"}
            onClick={ handleCoachMenuNavigate }
          />
        </Menu>
      </Grid.Column>
      <Grid.Column width={12 }>
        { children }
      </Grid.Column>
    </Grid.Row>
  );
};

