import React, { FC} from "react";
import {createBrowserHistory} from 'history';
import logo from '../../images/logo.png'
import '../../css/header.css'


export const history = createBrowserHistory({forceRefresh:true});

interface ParentCompProps {
    comp: React.ReactNode
}

const Header: FC<ParentCompProps> = ({comp}) => {

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
                        {(() => {
                            let options = [];
                            if(comp === "Login"){
                                options= []
                                options.push(
                                <li className="navbar-nav ml-auto">
                                    <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/signup')}}>Sign Up</button>
                                </li>
                                )
                                return options;
                            } else if (comp === "Signup"){
                                options= []
                                options.push(
                                    <li className="navbar-nav ml-auto">
                                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/')}}>Login</button>
                                    </li>
                                )
                                return options;
                            } else if(comp === "Listing"){
                                options= []
                                options.push(
                                    <li className="navbar-nav ml-auto">
                                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/create')}}>Create Task</button>
                                    </li>
                                )
                                return options;
                            } else if(comp === "createTask"){
                                options= []
                                options.push(
                                    <li className="navbar-nav ml-auto">
                                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={logout}>Logout</button>
                                        <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/listing')}}>Tasks</button>
                                    </li>
                                )
                                return options;
                            }   
                        })()}
                    </ul> 
                </div>
            </nav>
        </div>
    );
}

export default Header