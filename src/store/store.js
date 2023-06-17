import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

/// root - reducer 
import { rootReducer } from './root-reducer';


//Middlewares will be trigged between the start and end of action
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};


const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//store
export const store = createStore(rootReducer, undefined, composedEnhancers);