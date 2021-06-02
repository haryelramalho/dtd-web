import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Panel from './Panel';

function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/panel">
          <Panel />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
