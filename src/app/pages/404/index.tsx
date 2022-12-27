import { ReactElement } from 'react';

import NotFoundIcon from 'app/shared/icons/NotFoundIcon';

import styles from './styles.module.scss';

function NotFound(): ReactElement {
  return (
    <div className={styles.notFound}>
      <NotFoundIcon />
    </div>
  );
}

export default NotFound;
