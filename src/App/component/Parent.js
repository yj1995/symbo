import React, { Component } from 'react';
import data from '../data.json';
import _ from 'lodash';
import { Tile } from './Tile';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      tile: null,
      count: 0
    }
    this.displayData = this.displayData.bind(this);
    this.detailPage = this.detailPage.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.comparePage = this.comparePage.bind(this);
  }

  comparePage() {
    const data = document.querySelectorAll('input');
    const selected = [];
    data.forEach((key, i) => {
      if (key.getAttribute('click') === 'true') {
        this.state.data.forEach((val, i) => {
          if (val.plan.planName === key.getAttribute('id') && val.sumInsured === Number(key.getAttribute('amount'))) {
            selected.push(val);
          };
        });
      }
    });
    let pathName = window.location.pathname;
    pathName = '';
    this.props.history.push({
      pathname: `${pathName}ComparePage`,
      selected,
    });
  }

  displayData() {
    const tile = [];
    if (this.state.data) {
      _.each(this.state.data, (value, index) => {
        tile.push(<Tile key={'tile_' + index} data={value} click={this.detailPage} checkBox={this.checkBox} />);
      });
    }
    return tile;
  }

  detailPage(e) {
    const clickPlan = e.currentTarget.getAttribute('id');
    const amount = e.currentTarget.getAttribute('amount');
    const data = _.find(this.state.data, (value) => {
      if (value.plan.planName === clickPlan && Number(amount) === value.sumInsured) {
        return value
      }
    });
    if (data) {
      let pathName = window.location.pathname;
      pathName = '';
      this.props.history.push({
        pathname: `${pathName}PlanDetail`,
        data,
      })
    }
  }

  checkBox(e) {
    let count = 0;
    e.stopPropagation();
    if (count < 3) {
      if (!e.target.getAttribute('click') || e.target.getAttribute('click') === 'false') {
        e.target.setAttribute('click', true);
      } else {
        e.target.setAttribute('click', false);
      }
    }
    const data = document.querySelectorAll('input');
    data.forEach((val, i) => {
      if (val.getAttribute('click') === 'true') {
        count++;
      }
    })
    if (count === 3) {
      data.forEach((val, i) => {
        if (!val.getAttribute('click') || val.getAttribute('click') === 'false') {
          val.setAttribute('disabled', true);
        }
      })
    } else if (count < 3) {
      data.forEach((val, i) => {
        if (!val.getAttribute('click') || val.getAttribute('click') === 'false' || val.getAttribute('disabled')) {
          val.removeAttribute('disabled');
        }
      })
    }
    this.setState({ count });
  }

  render() {
    return (
      <React.Fragment>
        <div className='topBar'></div>
        <div className='tileParent'>
          {this.displayData()}
        </div>
        {this.state.count > 1 ? <button className='comparePlan' onClick={this.comparePage}>Compare Between Plan</button> : null}
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.setState({ data: data.content });
  }
}

export { Parent };
