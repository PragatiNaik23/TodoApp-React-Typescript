import  { ChangeEvent, FC, useEffect, useState} from 'react';
import "../css/style.css";
import axiosInstance from '../axios';
// import {BrowserHistory } from 'react-history';

// export const history = createBrowserHistory({forceRefresh:true});

let userList: []
const Signup: FC = () => {

    useEffect(() => {
        axiosInstance.get(`/users.json`)
        .then(response => {
            userList = response.data
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const [userExist, setUserExist] = useState({
        exist: false
    })

    const [accountCreated, setAccountCreated] = useState({
        created: false
    })

    const updateData = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const checkUsername = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formData)
         console.log(userList)
        for(let user in userList){
            if(user === formData.username){
                setUserExist({
                    exist: true
                })
            }
        } 
        
        if(userExist.exist === false)
            handleSubmit(e)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log('here')
        axiosInstance.post(`/users/${formData.username}.json`, formData)
        .then(response => {
            console.log(response)
            setAccountCreated({
                created: true
            })
        })
        .catch(error => console.log(error))
    }
    

    return (
    <div>
        {accountCreated.created ? (
            <div id="alert" style={{display:"none"}}>
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Account Registration Failed!</h2>
                </div>
            </div>) : (
            <div id="alert">
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Account Registration Failed!</h2>
                </div>
            </div>)}
        {userExist.exist ? (
            <div id="userAlert">
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Username must be unique!</h2>
                </div>
            </div>) : (
            <div id="userAlert" style={{display:"none"}}>
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Username must be unique!</h2>
                </div>
            </div>)}
        <div className="container col-lg-5 login">
            <div className="card rounded-2 shadow shadow-sm">
                <div className="card-header" id = "loginHeader">
                    <h3 className="mb-0 text-center text-white">Create Account</h3>
                </div>
                <div className="card-body">
                    <form className="form" id="formLogin" onSubmit={checkUsername}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="name" placeholder="Name" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="username" placeholder="Username" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-lg rounded-2" onChange={updateData} name="email" placeholder="Email"  required/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-lg rounded-2" onChange={updateData} name="password" placeholder="Password" required/>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg" id="btnLogin">Sign UP</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Signup;