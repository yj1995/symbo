import React, { Component } from 'react';
import './style.less';
import { Parent } from './component/Parent';
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
    const pathName = window.location.pathname;
    return (
      <div className='Parent'>
        {/* <Start /> */}
        <BrowserRouter>
          <Switch>
            <Route exact path={`${pathName}`} component={Parent} />
            {/* <Route path={`${pathName}Online`} component={Online} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export { RoutePath };
