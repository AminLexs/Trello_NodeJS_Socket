import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheet/index.css';
import { Root } from './components/root';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/css/bootstrap.css';
import "react-table-6/react-table.css";
import "bootswatch/dist/minty/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
