import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from 'app/shared/icons/LogoIcon';
import AllRoutes from 'app/shared/config/routes';

import styles from './styles.module.scss';

function Header(): ReactElement {
  const tsAccessToken = localStorage.getItem('TS_access_token');
  const navigate = useNavigate();
  return (
    <header className={styles.header__container}>
      <LogoIcon />
      <div className={styles.header__navPanel}>
        <div className={styles.header__navItem} onClick={() => navigate(AllRoutes.MAIN)}>
          Main
        </div>
        {!tsAccessToken && (
          <div className={styles.header__navItem} onClick={() => navigate(AllRoutes.LOGIN)}>
            Login
          </div>
        )}
        {tsAccessToken && <div className={styles.header__navItem}>Logout</div>}
      </div>
      {tsAccessToken && (
        <div className={styles.header__navItem} onClick={() => navigate(AllRoutes.SERVERS)}>
          Servers
        </div>
      )}
    </header>
  );
}

export default Header;
