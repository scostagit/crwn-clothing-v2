import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

/// root - reducer 
import { rootReducer } from './root-reducer';

/*const myMiddleware = (store)=>(next)=>(action)=>{

  if(!action.type){
    return next(action);
  }

  console.log('type: ' + action.type);
  console.log('paylod: ' + action.payload);
  console.log('current state: ' + store.getState());
  
  next(action);

  console.log('next state: ' + store.getState());
  console.log('sergio')
}


const middleWares = [myMiddleware];*/
//Middlewares will be trigged between the start and end of action
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

//store
export const store = createStore(rootReducer, undefined, composedEnhancers);