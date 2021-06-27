import { FC } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/login/login';
import Signup from './components/signup/signup'

const AppRouter: FC = () => {
    return(
        <Router>
            <Route path='/' exact component={Login}/>
            <Route path='/signUp' component={Signup}/>
        </Router>
    );
}

export default AppRouter