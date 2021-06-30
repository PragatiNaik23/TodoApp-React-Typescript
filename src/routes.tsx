import { FC } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/login/login';
import Signup from './components/signup/signup'
import EditTask from "./components/editTask/editTask";
import CreateTask from "./components/createTask/createTask";
import TaskListing from "./components/tasklisting/taskListing";

const AppRouter: FC = () => {
    return(
        <Router>
            <Route path='/login' exact component={Login}/>
            <Route path='/signUp' component={Signup}/>
            <Route path='/edit' component={EditTask}/>
            <Route path='/create' component={CreateTask}/>
            <Route path='/listing' component={TaskListing}/>
        </Router>
    );
}

export default AppRouter