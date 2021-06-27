import { FC } from 'react';
import './App.css';
import Login from './components/login/login'
import Signup from './components/signup/signup';
import CreateTask from './components/createTask/createTask';

const App: FC = () => {
  return (
    <div className="App">
      <Signup></Signup>
    </div>
  );
}

export default App;
