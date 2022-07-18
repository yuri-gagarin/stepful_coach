import * as React from 'react';
import { Button, Grid } from 'semantic-ui-react';

interface ITestIndexProps {
}

const TestIndex: React.FunctionComponent<ITestIndexProps> = (props) => {

  const handleTestIndex = async () => {

  };

  const handleTestCreate = async () => {

  };

  const handleTestDelete = async () => {

  };

  return (
    <Grid.Row>
      <Button.Group>
        <Button size="large" color="blue" onClick={ handleTestIndex }>
          Test Index Route
        </Button>
        <Button size="large" color="green" onClick={ handleTestCreate }>
          Test Create Route
        </Button>
        <Button size="large" color="red" onClick={ handleTestDelete }>
          Test Delete Route
        </Button>
      </Button.Group>
    </Grid.Row>
  );
};

export default TestIndex;
