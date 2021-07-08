import React, {ChangeEvent, FC, useState} from 'react'
import Modal from "react-modal";
import {createBrowserHistory} from 'history';
import moment from 'moment';
import '../../css/form.scss'
import axiosInstance from '../../axios';
import { Task } from '../../modalClass/Task';
import TaskForm from '../../common/taskForm';
import { useEffect } from 'react';


export const history = createBrowserHistory({forceRefresh:true});

let taskList: Array<Task>
let idList: number[] = []

const CreateTask: FC = () => {

    let date = new Date()
    let datestring = ('0' + date.getDate()).slice(-2)  + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear();
    let today = moment(datestring).toDate()

    let username = window.localStorage.getItem('username')

    useEffect(() => {
        axiosInstance.get(`/users/${username}/Task.json`)
        .then(response => {
            console.log(response.data)
            taskList = response.data
            console.log(taskList)
        })
        .catch(error => console.log(error))
    })

    const [createTaskData, setCreateTaskData] = useState<Task>({
        id: 0,
        title:'',
        description: '',
        type: '',
        priority: '',
        dueDate: undefined,
        createdDate: today,
        comments: '',
        status: "New"
    })

    const inputData = (e: ChangeEvent<HTMLInputElement>):void => {
        setCreateTaskData({
            ...createTaskData,
            [e.target.name] : e.target.value
        })

    }
    console.log(createTaskData.id)
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

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const isEnabled = createTaskData.title !== '' && 
                      createTaskData.id !>= 0 &&
                      createTaskData.description !== '' &&
                      createTaskData.type !== '' &&
                      createTaskData.priority !== '' &&
                      createTaskData.dueDate !== undefined;

    const checkTaskId = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(taskList !== null){
            for(let task in taskList){
                idList.push(taskList[task].id as number)
            }
            if(idList.includes(createTaskData.id as number)){
                setDupId({
                    duplicate: true
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
        axiosInstance.post(`/users/${username}/Task.json`, createTaskData)
        .then(response => {
            //console.log(response)
            console.log("Go to Task Listing Page")
            history.push('/listing')
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
            <h2 className="text-danger">Task cannot be created!</h2>
            <h6>Check your internet connection</h6>
            <button type="submit"  className="btn btn-success btn-lg mt-3" id="btnLogin" onClick={toggleModal}>Close</button>
            </Modal>
            <div className="container col-lg-5 form">
                <div className="card rounded-2 shadow shadow-sm">
                    <div className="card-header" id="header" >
                        <h3 className="mb-0 text-center text-white">Create Task</h3>
                    </div>
                    <div className="card-body">
                        <small className="text-danger">Note: Id should be unique!</small>
                        <br></br>
                        <small className="text-danger ml-lg-4">&nbsp;&nbsp;&nbsp;* means required field!</small>
                        <TaskForm 
                             id = {0}
                             title = ""
                             dueDate = {undefined}
                             status = ""
                             description = ""
                             type = ""
                             priority = ""
                             createdDate = {today}
                             comments = ""
                             isEnabled = {isEnabled}
                             inputData = {inputData}
                             textareaData = {textareaData}
                             selectData = {selectData}
                             submit = {checkTaskId}
                             dupId={dupId.duplicate}
                             createTask= {true}
                        ></TaskForm>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;

