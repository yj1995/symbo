import React, { Component } from 'react';
import './style.less';
import { Parent } from './component/Parent';
import { PlanDetail } from './component/PlanDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class RoutePath extends Component {
  constructor(props) {
    super(props)
    if (window.performance) {
      if (performance.navigation.type == 1) {
        let currentpath = window.location.pathname.split('/');
        if (currentpath.length > 1) {
          window.location.pathname = '/';
        } else {
          window.location.pathname = `/${currentpath[1]}/`;
        }
      }
    }
  }

  render() {
    console.log(window.location.pathname);
    return (
      <div className='Parent'>
        {/* <Start /> */}
        <BrowserRouter>
          <Switch>
            <Route exact path={`${window.location.pathname}`} component={Parent} />
            <Route path={`${window.location.pathname}PlanDetail`} component={PlanDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export { RoutePath };
