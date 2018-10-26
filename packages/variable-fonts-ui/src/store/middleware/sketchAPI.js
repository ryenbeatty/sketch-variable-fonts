// import pluginCall from 'sketch-module-web-view/client';
import CONSTANTS from "sketch-module-web-view/lib/constants";

import { SKETCH_PLUGIN_CLOSE, SKETCH_PLUGIN_RENDER } from "~/store/actions";

const sketchAPI = () => next => action => {
  switch (action.type) {
    case SKETCH_PLUGIN_CLOSE: {
      if (window[CONSTANTS.JS_BRIDGE]) {
        // pluginCall("close");
      }
      break;
    }

    case SKETCH_PLUGIN_RENDER: {
      // if (window[CONSTANTS.JS_BRIDGE]) {
      //   // pluginCall("render", action.tree, action.markup);
      // }

      break;
    }

    default:
  }

  return next(action);
};

export default sketchAPI;
