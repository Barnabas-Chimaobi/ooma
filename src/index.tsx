import {Provider} from 'react-redux';
import {store} from './store';
import Screens from './navigation';
import ErrorBoundary from './components/ErrorBoundary';
import React from 'react';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Screens />
      </Provider>
    </ErrorBoundary>
  );
}
