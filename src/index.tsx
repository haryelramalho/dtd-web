import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './pages/routes';

import './index.less';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);
