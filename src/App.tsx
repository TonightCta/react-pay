import { HashRouter } from 'react-router-dom';
import './App.css';
import RouterConfig from './route';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <RouterConfig />
      </div>
    </HashRouter>
  );
}

export default App;
