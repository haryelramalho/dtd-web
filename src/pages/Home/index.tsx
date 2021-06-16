import { useEffect } from 'react';

import { Layout } from '../../layout';
import SignInForm from '../../containers/SignInForm';

import { useAuth } from '../../contexts/Auth';

function Home(): JSX.Element {
  const auth = useAuth();

  useEffect(() => {
    auth.checkIsAuthenticated();
  }, []);

  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}

export default Home;
