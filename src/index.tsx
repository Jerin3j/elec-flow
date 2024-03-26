import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store, { persistor } from './Reducer/store';
import { Online, Offline } from "react-detect-offline";
import { PersistGate } from 'redux-persist/integration/react';
import OfflineStat from './Components/Statuses/OfflineStat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
  <Online>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>
  </Online>
  <Offline>
    <OfflineStat/>
  </Offline>
  </>
);