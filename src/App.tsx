import {FC} from 'react';
import './App.css';
import Routes from './routes'
import { UserProvider } from './utils/context';

const App: FC = () => {

  return (
    <UserProvider>
        <div className="App">
          <Routes/>
        </div>
    </UserProvider>
  );
  
}

export default App;
