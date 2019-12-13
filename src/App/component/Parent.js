import React, { Component } from 'react';
import data from '../data.json';
import _ from 'lodash';
import { Tile } from './Tile';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      tile: null
    }
    this.displayData = this.displayData.bind(this);
    this.detailPage = this.detailPage.bind(this);
  }

  displayData() {
    const tile = [];
    if (this.state.data) {
      _.each(this.state.data, (value, index) => {
        tile.push(<Tile key={'tile_' + index} data={value} click={this.detailPage} />);
      });
    }
    return tile;
  }

  detailPage(e) {
    const clickPlan = e.currentTarget.getAttribute('id');
    const planDetail = _.find(this.state.data, (value) => {
      if (value.plan.planName === clickPlan) {
        return value
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='topBar'></div>
        <div className='tileParent'>
          {this.displayData()}
        </div>
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.setState({ data: data.content });
  }
}

export { Parent };
