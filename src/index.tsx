import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from "react-router-dom"
import history from "utils/history"
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@material-ui/core"
import { ChakraTheme, MaterialTheme } from "theme"
import configureStore from "store"
import { Provider } from "react-redux"
import * as auth from "utils/auth"
import { configureAxios } from "core/services/interceptor.service"


const store = configureStore();
configureAxios();

auth.init(store)

const Root = () => (
  <React.StrictMode>
    <Provider store={store} >
      <ChakraProvider theme={ChakraTheme} >
        <ThemeProvider theme={MaterialTheme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();