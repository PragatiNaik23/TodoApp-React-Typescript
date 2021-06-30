import { FC } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './components/login/login';
import Signup from './components/signup/signup'
import EditTask from "./components/editTask/editTask";
import CreateTask from "./components/createTask/createTask";
import TaskListing from "./components/tasklisting/taskListing";

const AppRouter: FC = () => {
    return(
        <Router>
            <Switch >
                <Route path='/' exact component={Login}/>
                <Route path='/signup' exact component={Signup} />
                <Route path='/edit' exact component={EditTask}/>
                <Route path='/create' exact component={CreateTask}/>
                <Route path='/listing' exact component={TaskListing}/>
            </Switch>
        </Router>
    );
}

export default AppRouter