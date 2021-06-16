import { useEffect } from 'react';
import {
  Form, Input, Button, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Layout } from '../../layout';

import styles from './index.module.css';
import { useAuth } from '../../contexts/Auth';

type FormValues = {
  email: string
  password: string
}

function Home(): JSX.Element {
  const auth = useAuth();

  useEffect(() => {
    auth.checkIsAuthenticated();
  }, []);

  const onFinish = async (values: FormValues): Promise<void> => {
    await auth.signIn(values);
  };

  return (
    <Layout>
      <Form
        name="login"
        className={styles.login_form}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Digite um email válido',
            },
            { required: true, message: 'Por favor digite o seu email' },
          ]}
          hasFeedback
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Por favor digite a sua senha' },
          ]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Link to="/signup">
            Criar nova conta
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.login_form_button}
            type="primary"
            htmlType="submit"
            disabled={auth.loading}
          >
            {
              auth.loading
                ? <Spin />
                : 'Acessar minha conta'
            }
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Home;
