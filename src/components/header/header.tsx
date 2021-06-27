import { FC } from "react";
import logo from '../../images/logo.png'

const Header: FC = () => {
    return(
        <div>
            <nav className="navbar navbar-default navbar-fixed-top ">
            <div className="container-fluid">
            <img className="logo" src={logo} alt="logo" />
                <ul className="navbar-nav ml-auto "> 
                    <li className="nav-item "> 
                        <button type="submit"  id="signup"  className="btn btn-primary btn-lg ml-lg-5">Sign Up</button>
                        <button type="submit"  id="createTask"  className="btn btn-primary btn-lg ml-lg-5">Create Task</button>
                        <button type="submit"  id="taskList" className="btn btn-primary btn-lg ml-lg-5">Task List</button>
                        <button type="submit"  id="login"  className="btn btn-primary btn-lg ">Login</button>
                        <button type="submit"  id="logout"  className="btn btn-primary btn-lg ">Logout</button>
                    </li> 
                </ul> 
            </div>
            </nav>
        </div>

    );
}

export default Header