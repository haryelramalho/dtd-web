import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logoToro from '../../assets/images/logo-toro.png';

import styles from './index.module.css';

type HeaderProps = {
  isAuthenticated?: boolean
  onLogout?: () => void | Promise<void>
}

function Header(
  {
    isAuthenticated = false,
    onLogout,
  }: HeaderProps,
): JSX.Element {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo_container}>
        <Link to="/">
          <img
            className={styles.logo_image}
            src={logoToro}
            alt="Logo Toro Investimentos"
          />
        </Link>
      </div>

      {
        isAuthenticated && (
          <Button
            data-testid="header-signout-button"
            onClick={onLogout}
            shape="round"
            icon={<LogoutOutlined />}
          >
            Sair
          </Button>
        )
      }
    </Layout.Header>
  );
}

export default Header;
