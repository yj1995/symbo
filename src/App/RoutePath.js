import React, { Component } from 'react';
import './style.less';
import { Parent } from './component/Parent';
import { PlanDetail } from './component/PlanDetail';
import { ComparePage } from './component/ComparePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class RoutePath extends Component {
  constructor(props) {
    super(props)
    if (performance) {
      if (performance.navigation.type == 1) {
        let currentpath = window.location.pathname.split('/');
        if (currentpath.length > 1 && window.location.hostname === 'localhost') {
          window.location.pathname = '/';
        } else {
          window.location.pathname = `/${currentpath[1]}/`;
        }
      }
      console.log(window.location.pathname);
    }
  }

  render() {
    console.log(window.location.pathname, performance.navigation.type);
    return (
      <div className='Parent'>
        {/* <Start /> */}
        <BrowserRouter>
          <Switch>
            <Route exact path={`${window.location.pathname}`} component={Parent} />
            <Route path={`${window.location.pathname}PlanDetail`} component={PlanDetail} />
            <Route path={`${window.location.pathname}ComparePage`} component={ComparePage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export { RoutePath };
