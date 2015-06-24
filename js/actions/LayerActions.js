'use strict';

import MapConstants from '../constants/MapConstants.js';
import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  setVisible: (layer, visible) => {
    AppDispatcher.handleAction({
      type: MapConstants.CHANGE_VISIBILITY,
      layer: layer,
      visible: visible
    });
  },
  zoomToLayer: (layer) => {
    AppDispatcher.handleAction({
      type: MapConstants.ZOOM_TO_LAYER,
      layer: layer
    });
  },
  moveLayerDown: (layer) => {
    AppDispatcher.handleAction({
      type: MapConstants.MOVE_LAYER_DOWN,
      layer: layer
    });
  },
  moveLayerUp: (layer) => {
    AppDispatcher.handleAction({
      type: MapConstants.MOVE_LAYER_UP,
      layer: layer
    });
  },
  downloadLayer: (layer) => {
    AppDispatcher.handleAction({
      type: MapConstants.DOWNLOAD_LAYER,
      layer: layer
    });
  },
  setOpacity: (layer, opacity) => {
    AppDispatcher.handleAction({
      type: MapConstants.SET_LAYER_OPACITY,
      layer: layer,
      opacity: opacity
    });
  }
};
