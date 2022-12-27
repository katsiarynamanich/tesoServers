import { ReactNode, ReactElement } from 'react';

import Header from './_ui/Header';
import Footer from './_ui/Footer';

import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps): ReactElement {
  return (
    <div className={styles.Layout__wrapper}>
      <Header />
      <div id="layout" className={styles.Layout__inner}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
