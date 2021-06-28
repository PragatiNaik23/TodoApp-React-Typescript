import { FC, useState } from "react";
import logo from '../../images/logo.png'
import '../../css/header.css'
import {createBrowserHistory} from 'history';
import Login from '../login/login';
import Signup from '../signup/signup';

export const history = createBrowserHistory();


const Header: FC = () => {

    const [signupItem, setSignupItem] = useState({signup: true})

    const [loginItem, setLoginItem] = useState({login:false})

    const signupPage = () => {
        setLoginItem({login:true})
        setSignupItem({signup: false})
       
    }

    const loginPage = () => {
        setLoginItem({login:false})
        setSignupItem({signup: true})
        
    }

    return(
        <div>
            <nav className="navbar navbar-default navbar-fixed-top ">
            <div className="container-fluid">
            <img className="logo" src={logo} alt="logo" />
                <ul className="navbar-nav ml-auto"> 
                    {signupItem.signup === true ? (
                    <li className="nav-item"> 
                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={signupPage} >Sign Up</button>
                    </li>): (
                    <li className="navbar-nav ml-auto">
                        <button type="submit"  id="login"  className="btn btn-primary btn-lg ml-lg-5" onClick={loginPage}>Login</button>
                    </li>)}
                </ul> 
            </div>
            </nav>
            {signupItem.signup === true ? (<Login></Login>): (<Signup></Signup>)}
        </div>

    );
}

export default Header