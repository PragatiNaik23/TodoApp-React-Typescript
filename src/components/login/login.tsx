import  { ChangeEvent, createContext, FC, useState} from 'react';
import Modal from "react-modal";
import {createBrowserHistory} from 'history';
import "../../css/form.scss";
import axiosInstance from '../../axios';
import { User } from '../../modalClass/user';
import React from 'react';


export const history = createBrowserHistory({forceRefresh:true});
// export let user: string


let userDetail : Array<User>

const Login: FC = () => {
    // const name = React.useContext(currentUser)
    // console.log(name)

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [usernameExist, setUsernameExist] = useState({exist: true})

    const [password, setPassword] = useState({correct: true})

    const inputData = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
          ...loginData,
          [e.target.name] : e.target.value  
        })
    }

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await axiosInstance.get(`/users/${loginData.username}/Details.json`)
        .then(response => {
            userDetail = response.data

            if(userDetail === null){
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
        })
        .catch(error => {
            console.log("here")
            console.log(error)
            toggleModal()

            setUsernameExist({
                exist: true
            })

            setPassword({
                correct: true
            })
        })
    }

    const auth = () => {
        for(let details in userDetail){
           if(userDetail[details].password=== loginData.password){
            setPassword({
                correct: true
            })

            console.log("Go to Task Listing Page");
             window.localStorage.setItem('username', loginData.username)
            // user = loginData.username
            
            history.push('/listing')
            }
            else{
                setPassword({
                    correct: false
                })
            }
        }   
    }

    return (
        <div>


            <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="editmodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
            >
            <h2 className="text-danger">Login Failed!</h2>
            <h6>Check your internet connection</h6>
            <button type="submit"  className="btn btn-success btn-lg mt-3" id="btnLogin" onClick={toggleModal}>Close</button>
            </Modal>

            <div className="container col-lg-5 form">
                <div className="card rounded-2 shadow shadow-sm">
                    <div className="card-header" id="header">
                        <h3 className="mb-0 text-center text-white">Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-success btn-lg">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;