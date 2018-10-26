export const SKETCH_PLUGIN_CLOSE = "SKETCH_PLUGIN_CLOSE";
export const SKETCH_PLUGIN_RENDER = "SKETCH_PLUGIN_RENDER";
export const CANVAS_SET_DIMENSION = "CANVAS_SET_DIMENSION";
export const APP_RESET = "APP_RESET";
export const APP_INIT = "APP_INIT";
export const SET_SOURCE = "SET_SOURCE";
export const SET_BUSY = "SET_BUSY";

export const canvasSetDimension = (width, height) => ({
  type: CANVAS_SET_DIMENSION,
  width,
  height
});

export const sketchPluginClose = () => ({
  type: SKETCH_PLUGIN_CLOSE
});

export const sketchPluginRender = (tree, markup) => ({
  type: SKETCH_PLUGIN_RENDER,
  tree,
  markup
});

export const setSource = source => ({
  type: SET_SOURCE,
  source
});

export const reset = () => ({
  type: APP_RESET
});

export const appInit = () => ({
  type: APP_INIT
});

export const setBusy = value => ({
  type: SET_BUSY,
  value
});
