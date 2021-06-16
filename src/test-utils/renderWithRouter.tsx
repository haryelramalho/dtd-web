import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderWithRouter = (component: ReactNode) => render(
  <Router>
    {component}
  </Router>,
);
