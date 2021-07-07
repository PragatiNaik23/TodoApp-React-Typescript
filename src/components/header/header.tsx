import React, { FC} from "react";
import { useLocation} from 'react-router-dom'
import {createBrowserHistory} from 'history';
import logo from '../../images/logo.png'
import '../../css/header.css'

export const history = createBrowserHistory({forceRefresh:true});

const Header: FC = () => {

    const urlPath = useLocation()

    const logout = (e: React.SyntheticEvent) => {
        e.preventDefault()
        history.push('/')
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
                        {urlPath.pathname === '/' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/signup')}}>Sign Up</button>
                            </li>
                        ) : (urlPath.pathname === '/signup' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/')}}>Login</button>
                            </li>
                        ) : (urlPath.pathname === '/listing' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/create')}}>Create Task</button>
                            </li>
                        ) : (urlPath.pathname === '/create' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/listing')}}>Tasks</button>
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