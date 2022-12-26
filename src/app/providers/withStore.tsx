import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

const withStore = (App: FC) =>
  function AppWithStore() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

export default withStore;
