import React, { Fragment } from 'react';
import Header from './components/Header';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Fragment>
      {/* <h1>Hello worlds</h1> */}
      <Header />
      <Todos />
    </Fragment>
  );
};

export default App;
