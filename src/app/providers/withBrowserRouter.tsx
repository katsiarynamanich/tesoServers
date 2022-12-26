import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const withBrowserRouter = (App: FC) =>
  function AppWithBrowserRouter() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <App />,
      },
    ]);
    return <RouterProvider router={router} />;
  };

export default withBrowserRouter;
