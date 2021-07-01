import  { ChangeEvent, FC, useState } from 'react';
import "../../css/style.css";
import axiosInstance from '../../axios';
import Header from '../header/header';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:true});


let userList : Array<any>
let user: any = []
const Login: FC = () => {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [usernameExist, setUsernameExist] = useState({exist: true})

    const [password, setPassword] = useState({correct: true})

    const [logginFailed, setLoginFailed] = useState({failed: false})


    const inputData = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
          ...loginData,
          [e.target.name] : e.target.value  
        })
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await axiosInstance.get(`/users/${loginData.username}.json`)
        .then(response => {
            userList = response.data
            setLoginFailed({
                failed: false
            })
            //console.log(userList)
        })
        .catch(error => {
            console.log(error)
            setLoginFailed({
                failed: true
            })

            setUsernameExist({
                exist: true
            })

            setPassword({
                correct: true
            })
        })

        if(userList === null){
            setUsernameExist({
                exist: false
            })

            setPassword({
                correct: true
            })
        }
        else{
            setUsernameExist({
                exist: true
            })
            auth()
        }
    }

    const auth = () => {
        for(let details in userList){
            user.push(userList[details])
        }

        if(user[0].password === loginData.password){
            setPassword({
                correct: true
            })
            console.log("Go to Task Listing Page");
            window.localStorage.setItem('username', loginData.username)
            history.push('/listing',)
        }
        else{
            setPassword({
                correct: false
            })
        }
    }

    return (
        <div>
            <Header comp="Login"></Header>
            {logginFailed.failed === false ? (
                <div id="alert" style={{display:"none"}}>
                    <div className="alert-box row mt-5 justify-content-center" >
                        <h2>Login Failed</h2>
                    </div>
                </div>
            ) : (
                <div id="alert">
                    <div className="alert-box row mt-5 justify-content-center" >
                        <h2>Login Failed</h2>
                    </div>
                </div>
            )}

            <div className="container col-lg-5 login">
                <div className="card rounded-2 shadow shadow-sm">
                    <div className="card-header" id="loginHeader">
                        <h3 className="mb-0 text-center text-white">Login</h3>
                    </div>
                    <div className="card-body">
                        <form className="form" onSubmit={handleSubmit}>
                            {usernameExist.exist === false ? (
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg rounded-2" onChange={inputData} name="username" placeholder="Username" required/>
                                    <span className="text-danger">Username does not exist!</span>
                                </div>
                            ) : (
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg rounded-2" onChange={inputData} name="username" placeholder="Username" required/>
                                </div>
                            )}
                            {password.correct === false ? (
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg rounded-2"  onChange={inputData} name="password" placeholder="Password" required/>
                                    <span className="text-danger">Password incorrect!</span>
                                </div>) : (
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg rounded-2"  onChange={inputData} name="password" placeholder="Password" required/>
                                    </div>
                                )}
                            <button type="submit" className="btn btn-success btn-lg" id="btnLogin">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;