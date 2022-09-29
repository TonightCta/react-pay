import { HashRouter } from 'react-router-dom';
import { useReducer, createContext, ReactElement, ReactNode } from 'react';
import { Context } from './utils/interface';
import { defaultContext, defaultStateInit, initState } from './reducer';
import './App.scss';
import RouterConfig from './route';
import { defaultState } from './reducer/index';
import 'antd/dist/antd.min.css';
import 'element-theme-default';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


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
