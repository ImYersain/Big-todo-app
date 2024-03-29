import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithReducers from './AppWithRedux';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);

reportWebVitals();
