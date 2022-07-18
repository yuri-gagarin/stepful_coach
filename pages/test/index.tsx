import React, { useContext, useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
//
import { AppStore } from "../../context/Store";
// action handlers //
import { testIndexCall, testCreateCall, testDeleteCall } from "../../actions/api/testAPIActions";

interface ITestIndexProps {
}

const TestIndex: React.FunctionComponent<ITestIndexProps> = (props) => {

  const { dispatch, state } = useContext(AppStore);

  useEffect(() => {
    console.log(state.testState);

  }, [ state.testState ]);

  return (
    <Grid.Row>
      <Button.Group>
        <Button size="large" color="blue" onClick={ () => testIndexCall(dispatch) }>
          Test Index Route
        </Button>
        <Button size="large" color="green" onClick={ () => testCreateCall(dispatch) }>
          Test Create Route
        </Button>
        <Button size="large" color="red" onClick={ () => testDeleteCall(dispatch) }>
          Test Delete Route
        </Button>
      </Button.Group>
    </Grid.Row>
  );
};

export default TestIndex;
