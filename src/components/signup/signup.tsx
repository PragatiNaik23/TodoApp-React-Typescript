import  { ChangeEvent, FC, useState} from 'react';
import "../../css/style.css";
import axiosInstance from '../../axios';

let userList: Array<any>
let usernameList: any = []
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

    const [accountCreated, setAccountCreated] = useState({
        created: true
    })

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
            setAccountCreated({
                created: true
            })
        } else{
            handleSubmit(e)
        }     
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axiosInstance.post(`/users/${formData.username}.json`, formData)
        .then(response => {
            console.log(response)
            setAccountCreated({
                created: true
            })
            setUserExist({
                exist: false
            })
            console.log("Go to Login")
        })
        .catch(error => {
            console.log(error)
            setAccountCreated({
                created: false
            })
            setUserExist({
                exist: false
            })
        })
    }
    

    return (
    <div>
        {accountCreated.created === false ? (
            <div id="alert">
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Account Registration Failed!</h2>
                </div>
            </div>) : (
            <div id="alert" style={{display:"none"}}>
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Account Registration Failed!</h2>
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
                        {userExist.exist === false ? (
                         <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="username" placeholder="Username" required/>
                        </div>) : (
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={updateData} name="username" placeholder="Username" required/>
                            <span>Username already in use!</span>
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