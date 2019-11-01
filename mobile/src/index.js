import React from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';
import '~/config/StatusBarConfig';

import store from './store';

import App from './App';

const Root = () => (
  <Provider store={store}>
    <>
      <App />
      <Toast />
    </>
  </Provider>
);

export default Root;
