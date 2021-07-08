import React, { FC} from "react";
import { useLocation} from 'react-router-dom'
import {createBrowserHistory} from 'history';
import logo from '../../images/logo.png'
import '../../css/header.scss'

export const HISTORY = createBrowserHistory({forceRefresh:true});

const Header: FC = () => {

    const URL_PATH = useLocation()

    const logout = (e: React.SyntheticEvent) => {
        e.preventDefault()
        HISTORY.push('/')
        console.log("Before",window.localStorage.getItem('username'))
        localStorage.clear()
        console.log("After",window.localStorage.getItem('username'))
    }

    return(
        <div>
            <nav className="navbar navbar-default navbar-fixed-top ">
                <div className="container-fluid">
                    <img className="logo" src={logo} alt="logo" />
                    <ul className="navbar-nav ml-auto nav"> 
                        {URL_PATH.pathname === '/' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {HISTORY.push('/signup')}}>Sign Up</button>
                            </li>
                        ) : (URL_PATH.pathname === '/signup' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {HISTORY.push('/')}}>Login</button>
                            </li>
                        ) : (URL_PATH.pathname === '/listing' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {HISTORY.push('/create')}}>Create Task</button>
                            </li>
                        ) : (URL_PATH.pathname === '/create' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {HISTORY.push('/listing')}}>Tasks</button>
                            </li>
                        ) : (null))))
                        }
                    </ul> 
                </div>
            </nav>
        </div>
    );
}

export default Header