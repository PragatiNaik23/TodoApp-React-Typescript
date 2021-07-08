import  { ChangeEvent, FC, useState} from 'react';
import Modal from "react-modal";
import {createBrowserHistory} from 'history';
import "../../css/form.scss";
import axiosInstance from '../../axios';
import { User } from '../../modalClass/user';


export const HISTORY = createBrowserHistory({forceRefresh:true});

let userList: Array<User>
let usernameList: string[] = []

const Signup: FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const updateData = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const [userExist, setUserExist] = useState({
        exist: false
    })

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const checkUsername = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await axiosInstance.get(`/users.json`)
        .then(response => {
            userList = response.data
            usernameList = []
            for(let user in userList){
                usernameList.push(user)  
            } 
        })
        .catch(error => {
            console.log(error)
        })
       
        console.log(usernameList)
        if(usernameList.includes(formData.username)){
            setUserExist({
                exist: true
            })
        } else{
            handleSubmit(e)
        }     
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axiosInstance.post(`/users/${formData.username}/Details.json`, formData)
        .then(response => {
            console.log(response)
            setUserExist({
                exist: false
            })
            console.log("Go to Login")
            HISTORY.push('/')
        })
        .catch(error => {
            console.log(error)
            setUserExist({
                exist: false
            })
            toggleModal()
        })
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
            <h2 className="text-danger">Account cannot be created!</h2>
            <h6>Check your internet connection</h6>
            <button type="submit"  className="btn btn-success btn-lg mt-3" id="btnLogin" onClick={toggleModal}>Close</button>
        </Modal>

        <div className="container col-lg-5 form">
            <div className="card rounded-2 shadow shadow-sm">
                <div className="card-header" id="header">
                    <h3 className="mb-0 text-center text-white">Create Account</h3>
                </div>
                <div className="card-body">
                    <form id="formLogin" onSubmit={checkUsername}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="name" placeholder="Name" required/>
                        </div>
                        {userExist.exist === false ? (
                         <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="username" placeholder="Username" required/>
                        </div>) : (
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="username" placeholder="Username" required/>
                            <span className="text-danger">Username already in use!</span>
                        </div>
                        )}
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