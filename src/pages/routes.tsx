import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/Auth';

import Home from './Home';
import SignUp from './SignUp';
import Panel from './Panel/routes';

function Routes(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/dashboard">
            <Switch>
              <Panel />
            </Switch>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
