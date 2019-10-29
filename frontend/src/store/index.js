import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from 'routes/history';
import createRootReducer from './ducks';
import rootSaga from './sagas';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const tronMiddleware =
  process.env.NODE_ENV === 'development'
    ? console.tron.createEnhancer
    : () => {};

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware()
  )
);

sagaMiddleware.run(rootSaga);

export default store;
