import React, { Component } from 'react';
import './style.less';
import { Parent } from './component/Parent';
import { PlanDetail } from './component/PlanDetail';
import { ComparePage } from './component/ComparePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class RoutePath extends Component {
  constructor(props) {
    super(props)
    console.log(performance);
    if (performance) {
      console.log(performance, 'console.log(performance);');
      if (performance.navigation.type == 1) {
        console.log(performance.navigation.type, 'performance.navigation.type');
        let currentpath = window.location.pathname.split('/');
        console.log('currentpath[2].length', currentpath[2].length);
        if (currentpath.length > 1 && window.location.hostname === 'localhost') {
          window.location.pathname = '/';
        } else if (currentpath[2].length) {
          window.location.pathname = `/${currentpath[1]}/`;
          console.log(' window.location.pathname', window.location.pathname);
        } else {
          window.location.pathname = `/${currentpath[1]}/`;
        }
      }
    }
  }

  render() {
    const pathName = window.location.pathname;
    return (
      <div className='Parent'>
        {/* <Start /> */}
        <BrowserRouter>
          <Switch>
            <Route exact path={`${pathName}`} component={Parent} />
            <Route path={`${pathName}PlanDetail`} component={PlanDetail} />
            <Route path={`${pathName}ComparePage`} component={ComparePage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export { RoutePath };
