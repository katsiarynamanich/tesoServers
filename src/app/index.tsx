import { ReactElement, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

import withBrowserRouter from './providers/withBrowserRouter';
import withStore from './providers/withStore';
import Layout from './layout';
import MyErrorBoundary from './MyErrorBoundary';
import Pages from './pages';

import styles from './index.module.scss';

function App(): ReactElement {
  return (
    <Layout>
      <ToastContainer position="top-right" theme="dark" />
      <MyErrorBoundary>
        <Suspense
          fallback={
            <div className={styles.app__suspenseLoader}>
              <CircularProgress />
            </div>
          }
        >
          <Pages />
        </Suspense>
      </MyErrorBoundary>
    </Layout>
  );
}

export default withStore(withBrowserRouter(App));
