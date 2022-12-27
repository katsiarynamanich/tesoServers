import { BrowserRouter } from 'react-router-dom';

const withBrowserRouter = (App) =>
  function AppWithBrowserRouter() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

export default withBrowserRouter;
