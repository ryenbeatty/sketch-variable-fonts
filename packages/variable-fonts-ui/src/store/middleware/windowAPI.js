import { canvasSetDimension, setSource } from "../actions";

const windowAPI = store => next => action => {
  window.canvasSetDimension = (width, height) => {
    store.dispatch(canvasSetDimension(width, height));
  };

  window.setInitialSource = source => {
    store.dispatch(setSource(source));
  };

  return next(action);
};

export default windowAPI;
