import { HashRouter } from 'react-router-dom';
import { useReducer, createContext, ReactElement, ReactNode } from 'react';
import { Context } from './utils/interface';
import { defaultContext, defaultStateInit, initState } from './reducer';
import './App.css';
import RouterConfig from './route';
import { defaultState } from './reducer/index';


export const IBPay = createContext<Context>(defaultContext);


const App = (): ReactElement<ReactNode> => {
  const [state, dispatch] = useReducer(initState, defaultState, defaultStateInit);
  return (
    <HashRouter>
      <div className="App">
        <IBPay.Provider value={{state,dispatch}}>
          <RouterConfig />
        </IBPay.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
