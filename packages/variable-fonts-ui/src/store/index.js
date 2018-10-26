import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import windowAPI from '~/store/middleware/windowAPI';
import rootReducer from '~/store/reducer';
import sketchAPI from '~/store/middleware/sketchAPI';
import { appInit } from '~/store/actions';

export default () => {
  const middleware = composeWithDevTools(applyMiddleware(windowAPI, sketchAPI));
  const store = createStore(rootReducer, middleware);
  store.dispatch(appInit()); // Initialize middlewares
  return store;
};
