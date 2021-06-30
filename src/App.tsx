import { FC } from 'react';
import './App.css';
import Header from './components/header/header';
import Login from './components/login/login';
import TaskListing from './components/tasklisting/taskListing';


const App: FC = () => {
  return (
    <div className="App">
      {/* <Header></Header> */}
      <TaskListing></TaskListing>
    </div>
  );
  
}

export default App;
