import { ReactNode } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils/renderWithRouter';

import { AuthContext, IAuthContext } from '../../contexts/Auth';

import SignInForm from './index';

const addAuthContext = (component: ReactNode, authContext: IAuthContext) => (
  <AuthContext.Provider value={authContext}>
    {component}
  </AuthContext.Provider>
);

const noop = () => ({}) as any;

const signIn = jest.fn();

const DEFAULT_CONTEXT: IAuthContext = {
  signIn,
  loading: false,
  checkIsAuthenticated: noop,
  signOut: noop,
  signUp: noop,
};

const INVALID_EMAIL = 'invalidemail.com';

const VALID_EMAIL = 'valid@email.com';
const VALID_PASSWORD = '123456';

const INVALID_EMAIL_ERROR = 'Digite um email válido';
const REQUIRED_EMAIL_ERROR = 'Por favor digite o seu email';
const REQUIRED_PASSWORD_ERROR = 'Por favor digite a sua senha';

describe('SignInForm', () => {
  beforeEach(() => {
    signIn.mockClear();
  });

  it('should renders', () => {
    const { container } = renderWithRouter(
      addAuthContext(<SignInForm />, DEFAULT_CONTEXT),
    );

    expect(container).toBeInTheDocument();
  });

  it('can fill form', () => {
    const { getByTestId } = renderWithRouter(
      addAuthContext(<SignInForm />, DEFAULT_CONTEXT),
    );

    const emailInput = getByTestId('signin-email-input');
    const passwordInput = getByTestId('signin-password-input');

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

    expect(emailInput.getAttribute('value')).toBe(VALID_EMAIL);
    expect(passwordInput.getAttribute('value')).toBe(VALID_PASSWORD);
  });

  it('can submit filled form', async () => {
    const { getByTestId } = renderWithRouter(
      addAuthContext(<SignInForm />, DEFAULT_CONTEXT),
    );

    const emailInput = getByTestId('signin-email-input');
    const passwordInput = getByTestId('signin-password-input');

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

    const submitButton = getByTestId('signin-submit-button');

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(signIn).toBeCalledTimes(1);
      expect(signIn).toBeCalledWith(
        expect.objectContaining({
          email: VALID_EMAIL,
          password: VALID_PASSWORD,
        }),
      );
    });
  });

  it('show error messages when submit not filled form', async () => {
    const { getByTestId, getByText } = renderWithRouter(
      addAuthContext(<SignInForm />, DEFAULT_CONTEXT),
    );

    const submitButton = getByTestId('signin-submit-button');

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(signIn).toBeCalledTimes(0);
      expect(getByText(REQUIRED_EMAIL_ERROR)).toBeInTheDocument();
      expect(getByText(REQUIRED_PASSWORD_ERROR)).toBeInTheDocument();
    });
  });

  it('show error message when invalid email filled in the form', async () => {
    const { getByTestId, getByText } = renderWithRouter(
      addAuthContext(<SignInForm />, DEFAULT_CONTEXT),
    );

    const emailInput = getByTestId('signin-email-input');

    fireEvent.change(emailInput, { target: { value: INVALID_EMAIL } });

    const submitButton = getByTestId('signin-submit-button');

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(signIn).toBeCalledTimes(0);
      expect(getByText(INVALID_EMAIL_ERROR)).toBeInTheDocument();
    });
  });
});
