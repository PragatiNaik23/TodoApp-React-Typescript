import { FC } from 'react';
import './App.css';
import Login from './components/login/login'
import Signup from './components/signup/signup';
import CreateTask from './components/createTask/createTask';
import Header from './components/header/header'

const App: FC = () => {
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
