import Link from "next/link";
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
//
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Grid.Row>
      <Grid.Column width={16} style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Segment>
          <Button.Group>
            <Link href="/coach">
              <Button color="green" content="Coach Dashboard" />
            </Link>
            <Button.Or></Button.Or>
            <Button color="blue" content="Student Dashboard" />
          </Button.Group>
        </Segment>
       
      </Grid.Column>
    </Grid.Row>
  )
}

export default Home
