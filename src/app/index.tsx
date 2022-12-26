import { ReactElement } from 'react';

import withBrowserRouter from './providers/withBrowserRouter';
import withStore from './providers/withStore';

import styles from './index.module.scss';

function App(): ReactElement {
  return <div className={styles.App__wrapper}>Hi</div>;
}

export default withStore(withBrowserRouter(App));
