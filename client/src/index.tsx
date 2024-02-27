import React,  { createContext }from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store/store';

interface State{
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
)