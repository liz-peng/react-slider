import React from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import YearRange from '../containers/YearRange';
import SP500DisplayTable from '../containers/SP500DisplayTable';
import { Divider, Header, Grid } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>
            <Header as='h3'>
              Cumulative Return / Year
            </Header>
          </Divider>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <YearRange />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <SP500DisplayTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  );
}

export default App;
