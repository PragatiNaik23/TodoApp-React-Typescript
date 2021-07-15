import React, { ChangeEvent, FC, useContext, useState } from "react"
import TaskForm from "../../common/taskForm";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import '../../css/form.scss'
import axiosInstance from '../../axios';
import currentUserContext from "../../utils/context";


interface ParentCompProps {
    uId: string | undefined;
    id:number | undefined;
    title:string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;
    description: string | undefined;
    type: string | undefined;
    priority: string | undefined;
    createdDate: string | undefined;
    comments: string | undefined;
}

const EditTask:FC<ParentCompProps> = ({uId, id, title, dueDate, status,description, type, priority,
     createdDate, comments}) => {

    const HISTORY = useHistory()
    
    const username = useContext(currentUserContext)?.username  

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

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const isEnabled = editTask.title !== '' && 
                      editTask.description !== '' &&
                      editTask.type!== '' &&
                      editTask.priority !== '' &&
                      editTask.dueDate !== undefined &&
                      editTask.status !== '';

    const updateTask = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axiosInstance.patch(`/users/${username}/Task/${uId}.json`, editTask)
        .then(response => {
            console.log(response);
            HISTORY.replace('/listing')
        })
        .catch(error => {
            console.log(error)
            toggleModal()
        })
    }

    return(
        <div> 
            <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="editmodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
            >
            <h2 className="text-danger">Task Cannot be Updated!</h2>
            <h6>Check your internet connection</h6>
            <button type="submit"  className="btn btn-success btn-lg mt-3" id="btnLogin" onClick={toggleModal}>Close</button>
            </Modal>
            <div>
                <div className="card-header" id = "header" >
                    <h3 className="mb-0 text-center text-white" >Edit Your Task</h3>
                </div>
                <TaskForm 
                    id = {id}
                    title = {title}
                    dueDate = {dueDate}
                    status = {status}
                    description = {description}
                    type = {type}
                    priority = {priority}
                    createdDate = {createdDate}
                    comments = {comments}
                    isEnabled = {isEnabled}
                    inputData = {updateInput}
                    textareaData = {updateTextarea}
                    selectData = {updateSelect}
                    submit = {updateTask}
                    dupId={false}
                    createTask= {false}
                ></TaskForm>
            </div>
        </div>
    );
}
export default EditTask