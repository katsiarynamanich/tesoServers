import { ReactElement } from 'react';

import styles from './styles.module.scss';

export default function Login(): ReactElement {
  return (
    <div className={styles.login__wrapper}>
      <div className={styles.login__form}>Form</div>
    </div>
  );
}
