import React, {Component} from 'react';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import history from '../data/history.json';
import { setBoundaryOfYear } from '../actions';
import { Header, Table, Grid } from 'semantic-ui-react'

class SP500DisplayTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataToDispay: history,
      yearRange: [0, 1]
    }

    this.handleData = this.handleData.bind(this);
  }

  componentWillMount(){
    this.handleData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.yearRange[0] != this.props.yearRange[0]){
      this.setState({
        minYearToDisplay: this.props.yearRange[0],
        maxYearToDisplay: this.props.yearRange[1]
      })
    }
  }

  handleData(){
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    this.state.dataToDispay.forEach(row => {
      max = Math.max(max, row['year']);
      min = Math.min(min, row['year']);
    })

    this.setState({
      minYearToDisplay: min,
      maxYearToDisplay: max
    })

    let boundaryOfYear = {
      lowerBound: min,
      upperBound: max
    }

    this.props.setBoundaryOfYear(boundaryOfYear);
  }

  renderList(){
    let cumulative = 0;
    let filteredData = this.state.dataToDispay.filter((row) => {
      return row["year"] >= this.props.yearRange[0] && row["year"] <= this.props.yearRange[1];
    });

    return filteredData.reverse().map((row, i) => {
      cumulative += parseFloat(row["totalReturn"], 2);
      return (
        <Table.Body key={i}>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  {row["year"]}
                  <Header.Subheader>Return: {row["totalReturn"]}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{cumulative.toFixed(2)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }, this).reverse();
  }

  render() {
    return(
      <div className="ui grid centered">
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Cumulative Return</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.renderList()}
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    yearRange: state.selectedYearRange
  }
}

export default connect(mapStateToProps, { setBoundaryOfYear })(SP500DisplayTable);