import { ReactNode, ReactElement, useState } from 'react';

import Header from './_ui/Header';
import MobileNavBarModal from 'app/pages/mobile-nav-bar';

import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps): ReactElement {
  const [isMobileModalOpened, setIsMobileModalOpened] = useState(false);
  return (
    <div className={styles.layout__wrapper}>
      <Header
        isMobileModalOpened={isMobileModalOpened}
        setIsMobileModalOpened={setIsMobileModalOpened}
      />
      <div className={styles.layout__inner}>{children}</div>
      {isMobileModalOpened && <MobileNavBarModal setIsMobileModalOpened={setIsMobileModalOpened} />}
    </div>
  );
}

export default Layout;
