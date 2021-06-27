import { FC } from 'react';
import './App.css';
import Login from './login/login'
import Signup from './signup/signup';
import CreateTask from './createTask/createTask';

const App: FC = () => {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
