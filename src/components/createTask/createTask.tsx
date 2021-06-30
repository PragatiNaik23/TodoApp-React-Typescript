import React, {ChangeEvent, FC, useState} from 'react'
import '../../css/style.css'
import axiosInstance from '../../axios';
import Header from '../header/header';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:true});

let taskList: Array<any>
let idList: any = []

const CreateTask: FC = () => {

    let today = new Date()
    let todayDate = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();

    let username = window.localStorage.getItem('username')

    const [createTaskData, setCreateTaskData] = useState({
        id: '',
        title:'',
        description: '',
        type: '',
        priority: '',
        dueDate: '',
        createdDate: todayDate,
        comments: '',
        status: "New"
    })

    const inputData = (e: ChangeEvent<HTMLInputElement>) => {
        setCreateTaskData({
            ...createTaskData,
            [e.target.name] : e.target.value
        })

    }

    const textareaData = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCreateTaskData({
            ...createTaskData,
            [e.target.name] : e.target.value
        })
    }

    const selectData = (e: ChangeEvent<HTMLSelectElement>) => {
        setCreateTaskData({
            ...createTaskData,
            [e.target.name] : e.target.value
        })
    }

    const [dupId, setDupId] = useState({duplicate: false})

    const [createTask, setCreateTask] = useState({created: true})

    const isEnabled = createTaskData.title.length > 0 && 
                      createTaskData.id.length > 0 &&
                      createTaskData.description.length >0 &&
                      createTaskData.type.length > 0 &&
                      createTaskData.priority.length>0 &&
                      createTaskData.dueDate.length > 0;

    const checkTaskId = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await axiosInstance.get(`/users/${username}/task.json`)
        .then(response => {
            console.log(response.data)
            taskList = response.data
        })
        .catch(error => console.log(error))

        if(taskList !== null){
            for(let task in taskList){
                idList.push(taskList[task].id )
            }
            if(idList.includes(createTaskData.id)){
                setDupId({
                    duplicate: true
                })

                setCreateTask({
                    created: true
                })
            }
            else{
                setDupId({
                    duplicate: false
                })
                handleSubmit(e)
            }
        } else{
            handleSubmit(e)
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axiosInstance.post(`/users/${username}/task.json`, createTaskData)
        .then(response => {
            console.log(response)
            setCreateTask({
                created: true
            })
            console.log("Go to Task Listing Page")
            history.push('/listing')
        })
        .catch(error => {
            console.log(error)
            setCreateTask({
                created: false
            })
        })
    }

    return(
        <div>
            <Header comp="createTask"></Header>
        {createTask.created === false ? (
             <div id="alert">
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Task Creation Failed!</h2>
                </div>
            </div>) : (
            <div id="alert" style={{display:"none"}}>
                <div className="alert-box row mt-5 justify-content-center" >
                    <h2>Task Creation Failed!</h2>
                </div>
            </div>)}
        <div className="container col-lg-5 login">
            <div className="card rounded-2 shadow shadow-sm">
                <div className="card-header" id = "loginHeader" >
                    <h3 className="mb-0 text-center text-white">Create Task</h3>
                </div>
                <div className="card-body">
                    <form className="form" id="formcreatetask" onSubmit={checkTaskId}>
                        <small className="text-danger">Note: Id should be unique!</small>
                        <br></br>
                        <small className="text-danger ml-lg-4">&nbsp;&nbsp;&nbsp;* means required field!</small>

                        { dupId.duplicate === false ? (
                            <div className="form-group">
                                <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                                <input type="number" className="form-control form-control-lg rounded-2" onChange={inputData} name="id" placeholder="Id"  required/>
                            </div>) : (
                            <div className="form-group">
                                <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                                <input type="number" className="form-control form-control-lg rounded-2" onChange={inputData} name="id" placeholder="Id"  required/>
                                <span>ID already in use!</span>
                            </div>)}
                            

                        <div className="form-group">
                        <label><b>Title<small className="text-danger"><b>*</b></small></b></label>
                            <input type="text" className="form-control form-control-lg rounded-2" onChange={inputData} name="title" placeholder="Title"  required/>
                        </div>

                        <div className="form-group">
                        <label><b>Description<small className="text-danger"><b>*</b></small></b></label>
                            <textarea  className="form-control form-control-lg rounded-2" onChange={textareaData} name="description" placeholder="Description" required/>
                        </div>

                        <div className="form-group">
                            <label><b>Select Type <small className="text-danger"><b>*</b></small></b></label>
                            <select name="type" id="type" className="form-control form-control-lg rounded-2" onChange={selectData} required>
                                <option value=""> </option>
                                <option value="Personal"> Personal</option>
                                <option value="Work">Work</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><b>Select Priority <small className="text-danger"><b>*</b></small></b></label>
                            <select name="priority" id="priority" className="form-control form-control-lg rounded-2" onChange={selectData} required>
                                <option value=""> </option>
                                <option value="Low"> Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><b>Due Date <small className="text-danger"><b>*</b></small></b></label>
                            <input type="date"  className="form-control form-control-lg rounded-2" name="dueDate"  onChange={inputData} required/>
                        </div>

                        <div className="form-group">
                            <label><b>Created Date</b></label>
                            <input type="text"  className="form-control form-control-lg rounded-2" name="createdDate" value= {todayDate} required/>
                        </div>

                        <div className="form-group">
                        <textarea className="form-control form-control-lg rounded-2"  onChange={textareaData} name="comments" placeholder="Comments"/>  
                        </div>

                        <button type="submit" disabled = {!isEnabled} className="btn btn-success btn-lg" id="btnLogin">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CreateTask;