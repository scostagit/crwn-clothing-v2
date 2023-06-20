import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

/// root - reducer 
import { rootReducer } from './root-reducer';

//sagas
import { rootSaga } from './root-saga';

//saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

  const persistConfig = {
    key: 'root',
    storage,
    //blacklist: ['user'],
    whitelist: ['cart'],
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//store
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

//Saga run
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);