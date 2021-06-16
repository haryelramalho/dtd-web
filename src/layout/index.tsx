import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './index.module.css';

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <div className={styles.background}>{children}</div>
      <ToastContainer />
    </>
  );
}
