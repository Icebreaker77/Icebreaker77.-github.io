import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.scss';
import store from './store';
import {Provider} from 'react-redux';

const container = document.getElementById('root') as HTMLElement;

if (container) {
  const root = ReactDOM.createRoot(container);

  const render = (Component: React.FC) => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <Component/>
        </Provider>
      </React.StrictMode>
    );
  };

  render(App);

  // Enable Hot Module Replacement (HMR)
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(NextApp);
    });
  }
}
