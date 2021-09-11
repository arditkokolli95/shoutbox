import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './components/Router';
import StoreWrapper from './store/StoreWrapper';

function App() {
  return (
    <div className="App">
      <StoreWrapper>
        <Router />
      </StoreWrapper>
    </div>
  );
}

export default App;
