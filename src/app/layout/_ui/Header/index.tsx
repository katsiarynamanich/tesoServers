import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from 'app/shared/icons/LogoIcon';
import AllRoutes from 'app/shared/config/routes';
import { ACCESS_TOKEN } from 'app/shared/config/constants';

import styles from './styles.module.scss';

function Header(): ReactElement {
  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  const handleLogout = (): any => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(AllRoutes.MAIN);
  };
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
        {tsAccessToken && (
          <div className={styles.header__navItem} onClick={() => navigate(AllRoutes.SERVERS)}>
            Servers
          </div>
        )}
        {tsAccessToken && (
          <div className={styles.header__navItem} onClick={() => handleLogout()}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
