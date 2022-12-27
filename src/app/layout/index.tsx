import { ReactNode, ReactElement } from 'react';

import Header from './_ui/Header';

import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps): ReactElement {
  return (
    <div className={styles.layout__wrapper}>
      <Header />
      <div className={styles.layout__inner}>{children}</div>
    </div>
  );
}

export default Layout;
