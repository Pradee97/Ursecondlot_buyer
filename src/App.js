import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppRouter from './Routes';
import { rootReducer } from "./Reducer/rootReducer";

function App() {
  let store = createStore(rootReducer);
  return (
    <>
      <div className="App">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </>
  );
}

export default App;
