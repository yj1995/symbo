import React, { Component } from 'react';
import './style.less';
import { Parent } from './component/Parent';
import { PlanDetail } from './component/PlanDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class RoutePath extends Component {
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
