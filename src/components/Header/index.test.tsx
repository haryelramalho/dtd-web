import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../test-utils/renderWithRouter';

import Header from './index';

describe('Header', () => {
  describe('when not authenticated', () => {
    it('should renders', () => {
      const { container } = renderWithRouter(<Header />);

      expect(container).toBeInTheDocument();
    });
  });

  describe('when authenticated', () => {
    it('should renders signout button', () => {
      const { getByTestId } = renderWithRouter(<Header isAuthenticated />);

      const signoutButton = getByTestId('header-signout-button');

      expect(signoutButton).toBeInTheDocument();
    });

    it('should trigger onLogout when signout button pressed', () => {
      const onLogout = jest.fn();

      const { getByTestId } = renderWithRouter(
        <Header isAuthenticated onLogout={onLogout} />,
      );

      const signoutButton = getByTestId('header-signout-button');

      fireEvent.click(signoutButton);

      expect(onLogout).toBeCalledTimes(1);
    });
  });
});
