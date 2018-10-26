import {
  CANVAS_SET_DIMENSION,
  SET_SOURCE,
  APP_RESET,
  SET_BUSY,
  SKETCH_PLUGIN_RENDER
} from "~/store/actions";

const initialState = {
  canvas: {
    width: 500,
    height: 500
  },
  artboard: {
    width: 1200,
    height: 1200
  },
  source: "",
  isBusy: false,
  counter: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SKETCH_PLUGIN_RENDER:
    case APP_RESET:
      return Object.assign({}, state, {
        source: "",
        counter: state.counter + 1,
        isBusy: false
      });
    case SET_BUSY:
      return Object.assign({}, state, {
        isBusy: action.value
      });
    case CANVAS_SET_DIMENSION:
      return Object.assign({}, state, {
        canvas: {
          width: action.width,
          height: action.height
        }
      });
    case SET_SOURCE:
      return Object.assign({}, state, {
        source: action.source
      });
    default:
      return state;
  }
}

export default rootReducer;
