import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>,
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
