import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import AllRoutes from 'app/shared/config/routes';
import { ACCESS_TOKEN } from 'app/shared/config/constants';

function AuthRoute({ children }): ReactElement {
  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!tsAccessToken) {
    return <Navigate to={AllRoutes.LOGIN} />;
  }
  return children;
}

export default AuthRoute;
