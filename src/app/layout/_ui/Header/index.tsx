import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { isBrowser, isMobile } from 'react-device-detect';

import LogoIcon from 'app/shared/icons/LogoIcon';
import AllRoutes from 'app/shared/config/routes';
import { ACCESS_TOKEN, handleLogout } from 'app/shared/config/constants';
import HamburgerIcon from 'app/shared/icons/HamburgerIcon';

import styles from './styles.module.scss';

function Header({ isMobileModalOpened, setIsMobileModalOpened }): ReactElement {
  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  return (
    <header className={styles.header__container}>
      <LogoIcon />
      {isBrowser && (
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
            <>
              <div className={styles.header__navItem} onClick={() => navigate(AllRoutes.SERVERS)}>
                Servers
              </div>
              <div
                className={styles.header__navItem}
                onClick={() => handleLogout(() => navigate(AllRoutes.MAIN))}
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
      {isMobile && (
        <div
          className={styles.header__hamburgerIcon}
          onClick={() => setIsMobileModalOpened(!isMobileModalOpened)}
        >
          <HamburgerIcon />
        </div>
      )}
    </header>
  );
}

export default Header;
