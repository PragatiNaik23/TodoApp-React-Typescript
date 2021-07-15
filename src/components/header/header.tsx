import React, {FC} from "react";
import {useHistory, useLocation} from 'react-router-dom'
import logo from '../../images/logo.png'
import '../../css/header.scss'


const Header: FC = () => {

    const HISTORY = useHistory()
    const URL_PATH = useLocation()

    const logout = (e: React.SyntheticEvent) => {
        e.preventDefault()
        HISTORY.push('/')
    }

    return(
        <div>
            <nav className="navbar navbar-default navbar-fixed-top ">
                <div className="container-fluid">
                    <img className="logo" src={logo} alt="logo" />
                    <ul className="navbar-nav ml-auto nav"> 
                        { URL_PATH.pathname === '/' ? (
                            <li className="navbar-nav ml-auto">
                                <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {HISTORY.push('/signup')}}>Sign Up</button>
                            </li>
                        ) : ( URL_PATH.pathname === '/signup' ? (
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