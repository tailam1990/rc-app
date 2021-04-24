import { hot } from 'react-hot-loader';
import React from 'react';
import UserList from './components/UserList';
import './App.css';

const App = () => (
  <div className="App">
    <UserList />
  </div>
);

export default hot(module)(App);
