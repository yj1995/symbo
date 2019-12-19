import React, { Component } from 'react';
import data from '../data.json';
import _ from 'lodash';
import { Tile } from './Tile';
import { timingSafeEqual } from 'crypto';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: null,
      tile: null,
      count: 0,
      showFilter: false
    }
    this.insuranceProviderName = [];
    this.serviceAreaIds = [];

    // Used to bind all the function together.
    _.bindAll(this, ['displayData', 'detailPage', 'checkBox', 'comparePage', 'sorting', 'createFilter', 'createFilterElement', 'applyFilter', 'clickCheckbox', 'showFilter', 'preClick'])
  }

  // This function is used to show or hide filter
  showFilter() {
    if (!this.state.showFilter) {
      this.setState({
        showFilter: true
      })
    } else {
      this.setState({
        showFilter: false
      })
    }
  }

  // This function is used to click the checkbox
  clickCheckbox(e) {
    if (!e.target.getAttribute('click') || e.target.getAttribute('click') === 'false') {
      e.target.setAttribute('click', true);
      e.target.checked = true;
    } else {
      e.target.setAttribute('click', false);
      e.target.checked = false;
    }
  }

  // This function is used to create filter element
  createFilterElement(value, id) {
    const element = [];
    _.each(value, (key) => {
      element.push(<div className='filterRow'>
        <input className='filterInput' key={'filterInput' + key} type='checkbox' id={id + '_' + key} text={key} onChange={this.clickCheckbox} />
        <div className='filterCheckbox' key={'filterCheckbox' + key}>{key}</div>
      </div>
      );
    })
    return element;
  }

  // This function is used to route to compare page and get is plan is used to compare
  comparePage() {
    const data = document.querySelectorAll('input');
    const selected = [];
    data.forEach((key, i) => {
      if (key.getAttribute('click') === 'true') {
        this.state.originalData.forEach((val, i) => {
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

  // This function is used to create each product tile
  displayData() {
    const tile = [];
    if (this.state.originalData && this.state.originalData.length) {
      _.each(this.state.originalData, (value, index) => {
        tile.push(<Tile key={'tile_' + index} data={value} click={this.detailPage} checkBox={this.checkBox} />);
      });
    } else {
      tile.push(<div className='noData'>No Data Found</div>);
    }
    return tile;
  }

  // This function is used to route to detail page
  detailPage(e) {
    const clickPlan = e.currentTarget.getAttribute('id');
    const amount = e.currentTarget.getAttribute('amount');
    const data = _.find(this.state.originalData, (value) => {
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

  // This function is used to check whether the compare box is no click more then 3. If this is 3 then it will display all the un click compare box.
  // This also use to make Compare button visible when two tile is compared

  checkBox(e) {
    let count = 0;
    e.stopPropagation();
    if (count < 3) {
      this.clickCheckbox(e);
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

  // This function is used for sorting of data as per ur click
  sorting(e) {
    const selected = e.target.value.split(' ');
    switch (selected[0]) {
      case 'Premium': let sort = [];
        if (selected[1] === 'High') {
          sort = this.state.originalData.sort(function (a, b) {
            // subtract the two amountValue 
            // to get a value that is either negative, positive, or zero.
            return b.totalAmount.amountValue - a.totalAmount.amountValue;
          });
        } else {
          sort = this.state.originalData.sort(function (a, b) {
            // subtract the two amountValue 
            // to get a value that is either negative, positive, or zero.
            return a.totalAmount.amountValue - b.totalAmount.amountValue;
          });
        }
        this.setState({ originalData: sort })
        break;
      case 'Created': if (selected[1] === 'High') {
        sort = this.state.originalData.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.plan.createdAt) - new Date(a.plan.createdAt);
        });
      } else {
        sort = this.state.originalData.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.plan.createdAt) - new Date(b.plan.createdAt);
        });
      }
        this.setState({ originalData: sort })
        break;
    }
  }

  // This function is used for filtering purpose
  applyFilter(e) {
    this.setState({
      showFilter: false
    });
    const checkBox = document.querySelectorAll('.filterInput');
    this.insuranceProviderName = [];
    let filterData = [];
    this.serviceAreaIds = [];
    _.each(checkBox, (val) => {
      const split = val.getAttribute('id').split('_');
      if (val.getAttribute('click') === 'true') {
        if (split[0] === 'insuranceProviderName') {
          this.insuranceProviderName.push(split[1]);
        } else {
          this.serviceAreaIds.push(split[1]);
        }
      }
    });
    if (this.serviceAreaIds.length) {
      _.each(data.content, (val) => {
        _.each(this.serviceAreaIds, (key) => {
          if (key === val.plan.planEligibility.serviceAreaIds[0]) {
            filterData.push(val);
          }
        });
      });
    }

    if (this.insuranceProviderName.length) {
      let filter = [];
      _.each(data.content, (val) => {
        _.each(this.insuranceProviderName, (key) => {
          if (key === val.plan.insuranceProviderName) {
            filterData.push(val);
          }
        });
      });
      if (filterData.length) {
        _.each(filterData, (val) => {
          _.each(this.insuranceProviderName, (key) => {
            if (key === val.plan.insuranceProviderName) {
              filter.push(val);
            }
          })
        });
      }
      const uniqueData = filter.map(e => e.plan.createdAt).
        // store the keys of the unique objects
        map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & return unique objects
        .filter((e) => filter[e]).map(e => filter[e]);
      if (this.serviceAreaIds.length) {
        filterData = [];
        _.each(this.serviceAreaIds, (key) => {
          _.each(uniqueData, (val) => {
            if (key === val.plan.planEligibility.serviceAreaIds[0]) {
              filterData.push(val);
            }
          });
        });
      }
    }
    this.setState({ originalData: filterData });
  }

  preClick() {
    const target = document.querySelectorAll('.filterInput');
    if (this.insuranceProviderName.length) {
      _.each(target, (val) => {
        _.each(this.insuranceProviderName, (key) => {
          if (val.getAttribute('id').split('_')[1] === key) {
            val.checked = true;
            val.setAttribute('click', true);
          }
        })
      })
    }
    if (this.serviceAreaIds.length) {
      _.each(target, (val) => {
        _.each(this.serviceAreaIds, (key) => {
          if (val.getAttribute('id').split('_')[1] === key) {
            val.checked = true;
            val.setAttribute('click', true);
          }
        })
      })
    }
  }

  // This function is used to create filter
  createFilter() {
    const ProviderName = data.content.map(item => item.plan.insuranceProviderName).filter((value, index, self) => self.indexOf(value) === index);
    const Area = data.content.map(item => item.plan.planEligibility.serviceAreaIds[0]).filter((value, index, self) => self.indexOf(value) === index)
    const element = <div className='filterParent'>
      <div className='filterTable'>Insurance Providers</div>
      {this.createFilterElement(ProviderName, 'insuranceProviderName')}
      <div className='filterTable'>Service Area Ids</div>
      {this.createFilterElement(Area, 'serviceAreaIds')}
      <button className='filterButton' onClick={this.applyFilter}>Apply</button>
    </div>
    if (this.insuranceProviderName.length || this.serviceAreaIds.length) {
      _.defer(() => {
        this.preClick();
      });
    }
    return element;
  }

  render() {
    return (
      <React.Fragment>
        <div className='topBar'>
          <button className='filterButton' onClick={this.showFilter}>Filter Button</button>
          <select className='sortBy' onChange={this.sorting}>
            <option value='Premium Low'>Sort by</option>
            <option value='Premium High'>Sort by: Premium High to Low</option>
            <option value='Premium Low'>Sort by: Premium Low to High</option>
            <option value='Created High'>Sort by: Created At New to Old</option>
            <option value='Created Low'>Sort by: Created At Old to New</option>
          </select>
        </div>
        <div className='tileParent'>
          {this.displayData()}
        </div>
        {this.state.count > 1 ? <button className='comparePlan' onClick={this.comparePage}>Compare Between Plan</button> : null}
        {this.state.showFilter ? this.createFilter() : null}
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.setState({ originalData: data.content });
  }
}

export { Parent };
