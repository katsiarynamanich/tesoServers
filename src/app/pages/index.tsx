import { lazy, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import AllRoutes from 'app/shared/config/routes';

const Main = lazy(async () => await import('app/pages/main'));
const Login = lazy(async () => await import('app/pages/login'));
const Servers = lazy(async () => await import('app/pages/servers'));
const NotFound = lazy(async () => await import('app/pages/404'));

function Pages(): ReactElement {
  return (
    <Routes>
      <Route path={AllRoutes.MAIN} element={<Main />} />
      <Route path={AllRoutes.LOGIN} element={<Login />} />
      <Route path={AllRoutes.SERVERS} element={<Servers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Pages;
