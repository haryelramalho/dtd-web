import { Typography } from 'antd';

import { useAuth } from '../../../contexts/Auth';
import { Layout } from '../../../layout';

function Main(): JSX.Element {
  const auth = useAuth();

  const grettingMessage = `Olá ${auth.userName}`;

  return (
    <Layout>
      <Typography.Title level={2}>
        {grettingMessage}
      </Typography.Title>
    </Layout>
  );
}

export default Main;
