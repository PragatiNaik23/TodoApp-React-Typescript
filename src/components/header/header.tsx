import React, { FC} from "react";
import logo from '../../images/logo.png'
import '../../css/header.css'
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:true});

interface ParentCompProps {
    comp: React.ReactNode
}

const Header: FC<ParentCompProps> = ({comp}) => {
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
                                    <button type="submit" className="btn btn-primary btn-lg ml-lg-5">Logout</button>
                                    <button type="submit" className="btn btn-primary btn-lg ml-lg-5" onClick={() => {history.push('/create')}}>Create Task</button>
                                </li>
                            )
                            return options;
                        } else if(comp === "createTask"){
                            options= []
                            options.push(
                                <li className="navbar-nav ml-auto">
                                    <button type="submit" className="btn btn-primary btn-lg ml-lg-5">Logout</button>
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