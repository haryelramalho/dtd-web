import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { Layout as ALayout } from 'antd';

import Header from '../components/Header';
import { useAuth } from '../contexts/Auth';

import styles from './index.module.css';

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const auth = useAuth();

  return (
    <ALayout>
      <Header
        isAuthenticated={!!auth.authToken}
        onLogout={auth.signOut}
      />
      <ALayout.Content className={styles.content}>
        {children}
      </ALayout.Content>
      <ToastContainer />
    </ALayout>
  );
}
