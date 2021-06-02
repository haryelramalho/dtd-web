import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './pages/routes';

import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);
