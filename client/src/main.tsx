import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import Store from './store/store.ts';
import { createContext } from 'react';

interface StateStore {
  store: Store
}

const store = new Store();

export const Context = createContext<StateStore>({ store });

createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
)
