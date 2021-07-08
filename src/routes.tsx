import { FC } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login, { user } from './components/login/login';
import Signup from './components/signup/signup'
import EditTask from "./components/editTask/editTask";
import CreateTask from "./components/createTask/createTask";
import TaskListing from "./components/tasklisting/taskListing";
import currentUser from "./utils/context";



const AppRouter: FC = () => {
//    console.log("route",user)
    return(
        <Router>
            <Switch >
            {/* <currentUser.Provider value={user}> */}
                <Route path='/' exact component={Login}/>
                <Route path='/signup' exact component={Signup} />
                <Route path='/edit' exact component={EditTask}/>
                <Route path='/create' exact component={CreateTask}/>
                <Route path='/listing' exact component={TaskListing}/>
            {/* </currentUser.Provider> */}
            </Switch>
        </Router>
    );
}

export default AppRouter