import {
  Form, Input, Button, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './index.module.css';
import { useAuth } from '../../contexts/Auth';

type FormValues = {
  name: string
  email: string
  password: string
}

const confirmPasswordValidation = ({
  getFieldValue,
}: {
  getFieldValue: (name: string) => string
}) => ({
  validator(_: any, confimaPassword: string) {
    return new Promise<void>((resolve, reject) => {
      if (!confimaPassword || getFieldValue('password') === confimaPassword) {
        return resolve();
      }
      return reject(new Error('As suas senhas não estão iguais'));
    });
  },
});

function SignUpForm(): JSX.Element {
  const auth = useAuth();

  const onFinish = async (values: FormValues): Promise<void> => {
    await auth.signUp(values);
  };

  return (
    <Form
      name="signup"
      className={styles.signup_form}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[
          { required: true, message: 'Por favor digite o seu Nome Completo' },
        ]}
        hasFeedback
      >
        <Input placeholder="Nome" />
      </Form.Item>
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
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor confirma a sua senha',
          },
          confirmPasswordValidation,
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirmar senha"
        />
      </Form.Item>
      <Form.Item>
        <Button
          className={styles.signup_form_button}
          type="primary"
          htmlType="submit"
          disabled={auth.loading}
        >
          {
            auth.loading
              ? <Spin />
              : 'Criar conta'
          }
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;
