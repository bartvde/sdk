/** Demonstrate labeling points, lines and polygons.
 *
 */

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import RendererSwitch from '../rendererswitch';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as mapActions from '@boundlessgeo/sdk/actions/map';
import SdkLayerList from '@boundlessgeo/sdk/components/layer-list';

// This will have webpack include all of the SDK styles.
import '@boundlessgeo/sdk/stylesheet/sdk.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({
  map: SdkMapReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunkMiddleware));

function main() {
  store.dispatch(mapActions.setGlyphs('https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key={key}'));

  // Set group metadata for layer list
  store.dispatch(mapActions.updateMetadata({
    'mapbox:groups': {
      polygon: {
        name: 'Polygons',
      },
      lines: {
        name: 'Lines',
      },
      points: {
        name: 'Points',
      },
    }
  }));

  // Start with a reasonable global view of the map.
  store.dispatch(mapActions.setView([-15, 30], 2));

  // add the OSM source
  store.dispatch(mapActions.addOsmSource('osm'));

  // and an OSM layer.
  // Raster layers need not have any paint styles.
  store.dispatch(mapActions.addLayer({
    id: 'osm',
    source: 'osm',
    type: 'raster',
  }));

  store.dispatch(mapActions.addSource('polygons', {
    type: 'geojson',
    data: './gz_2010_us_040_00_20m.json'
  }));

  store.dispatch(mapActions.addLayer({
    id: 'polygons',
    metadata: {
      'mapbox:group': 'polygon',
    },
    source: 'polygons',
    type: 'line',
    paint: {
      'line-color': '#00ffff'
    },
  }));

  store.dispatch(mapActions.addLayer({
    id: 'polygon-labels',
    metadata: {
      'mapbox:group': 'polygon',
    },
    type: 'symbol',
    source: 'polygons',
    layout: {
      'text-field': '{NAME}',
    },
  }));

  store.dispatch(mapActions.addSource('lines', {
    type: 'geojson',
    data: './us_highways.json'
  }));

  store.dispatch(mapActions.addLayer({
    id: 'lines',
    metadata: {
      'mapbox:group': 'lines',
    },
    source: 'lines',
    type: 'line',
    paint: {
      'line-color': '#000000'
    },
  }));

  store.dispatch(mapActions.addLayer({
    id: 'line-labels',
    metadata: {
      'mapbox:group': 'lines',
    },
    type: 'symbol',
    source: 'lines',
    layout: {
      'text-field': '{ROUTE}',
      'symbol-placement': 'line'
    },
  }));

  // 'geojson' sources allow rendering a vector layer
  // with all the features stored as GeoJSON. "data" can
  // be an individual Feature or a FeatureCollection.
  store.dispatch(mapActions.addSource('points', {
    type: 'geojson',
    data: './earthquake_realtime_data.json'
  }));

  // The points source has both null island
  // and random points on it. This layer
  // will style all random points as purple instead
  // of orange.
  store.dispatch(mapActions.addLayer({
    id: 'points',
    metadata: {
      'mapbox:group': 'points',
    },
    type: 'circle',
    source: 'points',
    paint: {
      'circle-radius': 5,
      'circle-color': '#756bb1',
      'circle-stroke-color': '#756bb1',
      'circle-stroke-width': 1,
    },
  }));

  store.dispatch(mapActions.addLayer({
    id: 'point-labels',
    metadata: {
      'mapbox:group': 'points',
    },
    type: 'symbol',
    source: 'points',
    layout: {
      'text-field': '{mag}',
      'text-anchor': 'bottom-left',
      'text-offset': [0.25, -0.25],
    },
  }));

  // place the map on the page.
  ReactDOM.render(<Provider store={store}>
    <RendererSwitch defaultRenderer='mapbox'>
      <SdkZoomControl />
    </RendererSwitch>
  </Provider>, document.getElementById('map'));

  // add some buttons to demo some actions.
  ReactDOM.render((
    <div>
      <h3>Try it out</h3>
      <div className="sdk-layerlist">
        <Provider store={store}>
          <SdkLayerList />
        </Provider>
      </div>
    </div>
  ), document.getElementById('controls'));

}

main();
