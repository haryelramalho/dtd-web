import { ReactNode } from 'react';

import styles from './index.module.css';

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  return <div className={styles.background}>{children}</div>;
}

export default Layout;
