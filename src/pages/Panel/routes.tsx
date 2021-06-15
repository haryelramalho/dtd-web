import {
  Redirect, Route, useLocation,
} from 'react-router-dom';

import { useAuth } from '../../contexts/Auth';

import Dashboard from './Dashboard';

function Routes(): JSX.Element {
  const auth = useAuth();
  const location = useLocation();

  return auth.authToken
    ? (
      <>
        <Route path="/">
          <Dashboard />
        </Route>
      </>
    )
    : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    );
}

export default Routes;
