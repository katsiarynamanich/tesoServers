import { ReactElement } from 'react';

import styles from './styles.module.scss';

function Header(): ReactElement {
  return <header className={styles.Header__container}>Header</header>;
}

export default Header;
