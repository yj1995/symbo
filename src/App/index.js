import React from 'react';
import ReactDOM from 'react-dom';
import { RoutePath } from './RoutePath';

const root = document.createElement('div');
root.setAttribute('class', 'root');
document.body.appendChild(root);
ReactDOM.render(
    <RoutePath />,
    root
);
