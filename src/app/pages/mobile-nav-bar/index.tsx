import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, handleLogout } from 'app/shared/config/constants';
import AllRoutes from 'app/shared/config/routes';

import styles from './styles.module.scss';

export default function MobileNavBarModal({ setIsMobileModalOpened }): ReactElement {
  const navigate = useNavigate();

  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);

  const handleLogoutFromNavBar = (): void => {
    setIsMobileModalOpened(false);
    handleLogout(() => navigate(AllRoutes.LOGIN));
  };

  const handleClickNavBar = (route): void => {
    setIsMobileModalOpened(false);
    navigate(route);
  };

  return (
    <div className={styles.mobileNavBar__wrapper}>
      <div className={styles.mobileNavBar__navPanel}>
        <div
          className={styles.mobileNavBar__navItem}
          onClick={() => handleClickNavBar(AllRoutes.MAIN)}
        >
          Main
        </div>
        {!tsAccessToken && (
          <div
            className={styles.mobileNavBar__navItem}
            onClick={() => handleClickNavBar(AllRoutes.LOGIN)}
          >
            Login
          </div>
        )}
        {tsAccessToken && (
          <>
            <div
              className={styles.mobileNavBar__navItem}
              onClick={() => handleClickNavBar(AllRoutes.SERVERS)}
            >
              Servers
            </div>
            <div className={styles.mobileNavBar__navItem} onClick={() => handleLogoutFromNavBar()}>
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
}
