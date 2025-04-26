import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/reducerConfig';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Make sure it's the right file and not undefined

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('✅ i18n instance at root:', i18n);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading translations...</div>}>
          <App />
        </Suspense>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>
);
