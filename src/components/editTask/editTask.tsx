import React, { ChangeEvent, FC, useState } from "react"
import '../../css/style.css'
import axiosInstance from '../../axios';
import TaskListing from "../tasklisting/taskListing";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:true});
interface ParentCompProps {
    uId: React.ReactNode;
    id:React.ReactNode;
    title:React.ReactNode;
    dueDate: React.ReactNode;
    status: React.ReactNode;
    description: React.ReactNode;
    type: React.ReactNode;
    priority: React.ReactNode;
    createdDate: React.ReactNode;
    comments: React.ReactNode;
}


const EditTask:FC<ParentCompProps> = ({uId, id, title, dueDate, status,description, type, priority, createdDate, comments}) => {

    let username = window.localStorage.getItem('username')

    const [editTask, setEditTask] = useState({
        title,
        description,
        type,
        priority,
        dueDate,
        comments,
        status
    })

    const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTask({
            ...editTask,
            [e.target.name] : e.target.value
        })
    }

    const updateTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditTask({
            ...editTask,
            [e.target.name] : e.target.value
        })
    }

    const updateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setEditTask({
            ...editTask,
            [e.target.name] : e.target.value
        })
    }

    const [updated, setUpdated] = useState(true)

    const updateTask = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axiosInstance.patch(`/users/${username}/task/${uId}.json`, editTask)
        .then(response => {
            console.log(response);
            setUpdated(!updated)
            history.replace('/listing')
        })
        .catch(error => {
            console.log(error)
            setUpdated(!updated)
        })
    }

    return(
        <div>
            {updated === false ? (
                 <div id="alert">
                 <div className="alert-box row mt-5 justify-content-center" >
                     <h2>Task not updated!</h2>
                 </div>
             </div>) : null }
            <div>
                <div className="card-header" id = "loginHeader" >
                    <h3 className="mb-0 text-center text-white" >Edit Your Task</h3>
                </div>
                <form className="form" id="formcreatetask" onSubmit={updateTask}>
                    <div className="form-group mt-2">
                        <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                        <input type="text" className="form-control form-control-lg rounded-2"  name="title" placeholder="Title" defaultValue={id?.toString()} required disabled/>
                    </div>

                    <div className="form-group mt-2">
                        <label><b>Title<small className="text-danger"><b>*</b></small></b></label>
                        <input type="text" className="form-control form-control-lg rounded-2"  name="title" placeholder="Title" defaultValue={title?.toString()} onChange={updateInput} required/>
                    </div>

                    <div className="form-group">
                        <label><b>Description<small className="text-danger"><b>*</b></small></b></label>
                        <textarea  className="form-control form-control-lg rounded-2"  name="description" placeholder="Description" defaultValue={description?.toString()} onChange={updateTextarea} required/>
                    </div>

                    <div className="form-group">
                        <label><b>Status <small className="text-danger"><b>*</b></small></b></label>
                        <select name="status" id="status" className="form-control form-control-lg rounded-2" defaultValue={status?.toString()} onChange={updateSelect} required>
                            <option value=""> </option>
                            <option value="New">New</option>
                            <option value="In-Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><b>Select Type <small className="text-danger"><b>*</b></small></b></label>
                        <select name="type" id="type" className="form-control form-control-lg rounded-2" defaultValue={type?.toString()} onChange={updateSelect} required>
                            <option value=""> </option>
                            <option value="Personal"> Personal</option>
                            <option value="Work">Work</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><b>Select Priority <small className="text-danger"><b>*</b></small></b></label>
                        <select name="priority" id="priority" className="form-control form-control-lg rounded-2" defaultValue={priority?.toString()} onChange={updateSelect} required>
                            <option value=""> </option>
                            <option value="Low"> Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><b>Due Date <small className="text-danger"><b>*</b></small></b></label>
                        <input type="date"  className="form-control form-control-lg rounded-2" name="dueDate" defaultValue={dueDate?.toString()} onChange={updateInput} required/>
                    </div>

                    <div className="form-group">
                        <label><b>Created Date</b></label>
                        <input type="text"  className="form-control form-control-lg rounded-2" name="createdDate" defaultValue={createdDate?.toString()} required disabled/>
                    </div>

                    <div className="form-group">
                    <textarea className="form-control form-control-lg rounded-2"   name="comments" placeholder="Comments" defaultValue={comments?.toString()} onChange={updateTextarea}/>  
                    </div>

                    <button type="submit"  className="btn btn-success btn-lg" id="btnLogin">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default EditTask