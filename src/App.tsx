import { HashRouter } from 'react-router-dom';
import { useReducer, createContext, ReactElement, ReactNode } from 'react';
import { Context } from './utils/interface';
import { defaultContext, defaultStateInit, initState } from './reducer';
import './App.less';
import RouterConfig from './route';
import { defaultState } from './reducer/index';
import 'element-theme-default';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import SiteNav from './views/site/components/nav';
import { useEffect } from 'react';
moment.locale('zh-cn');


export const IBPay = createContext<Context>(defaultContext);


const App = (): ReactElement<ReactNode> => {
  const [state, dispatch] = useReducer(initState, defaultState, defaultStateInit);
  useEffect(() => {
    if(/Mobile|Android|iPhone/i.test(navigator.userAgent)){
      window.location.href = 'https://m.hlwzc.com/#/login';
    }
  },[])
  return (
    <HashRouter>
      <div className="App">
        <IBPay.Provider value={{ state, dispatch }}>
          {/* <SiteNav /> */}
          <RouterConfig />
        </IBPay.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
