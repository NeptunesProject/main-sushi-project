import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { persistor, store } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import ReactGA from "react-ga4";

ReactGA.initialize("G-SN15RF6KQZ");
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Neptunes delivery analyst" });

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
