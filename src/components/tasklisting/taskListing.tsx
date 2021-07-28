import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from "react-loader-spinner";
import tick from '../../images/tick.png';
import '../../css/listing.scss';
import axiosInstance from '../../axios';
import Card from './card';
import { Task } from "../../modalClass/Task";
import currentUserContext from "../../utils/context";


let taskList: Array<Task>
let taskGrp1:  Task[] = [], taskGrp2:  Task[] = [], taskGrp3: Task[] = []
let taskGrp1Ids:  string[] = [], taskGrp2Ids: string[] = [], taskGrp3Ids: string[] = []
let header1: string, header2: string, header3: string

const TaskListing: FC = () => {

    const username = useContext(currentUserContext)?.username  

    const [groupBy, setGroupBy] = useState({
        group: 'status'
    })

    const groupByUpadate = (e: ChangeEvent<HTMLSelectElement>) => {
        setGroupBy({
            ...groupBy,
            [e.target.name] : e.target.value
        })
        e.target.value === "status" ? (sortTaskByStatus()) : (e.target.value === "priority" ? sortTaskByPriority() : sortTaskByType())
    }

    const [statusTaskLen, setstatusTaskLen] = useState({
        newLen: 0,
        inProgressLen: 0,
        completedLen: 0
    })

    const [dataFetch, setDataFetch] = useState({data: true})

    useEffect(() => {
        <Loader type="ThreeDots"></Loader> 
        trackPromise(
        axiosInstance.get(`/users/${username}/Task.json`)
        .then(response => {
            taskList = response.data
            console.log("Tasks",taskList)
            if(taskList === null){
                setDataFetch({
                    data:false
                })
            } else{
                setDataFetch({
                    data:true
                })
                sortTaskByStatus()
            }
            
        })
        .catch(error => {
            console.log(error)
        })
        )
    },[username])
  

    const sortTaskByStatus = () => {
        taskGrp1 = []
        taskGrp2 =[]
        taskGrp3=[]
        header1 = "New"
        header2 = "In Progress"
        header3 = "Completed"
        for(let task in taskList){
            if(taskList[task].status === "New"){
                taskGrp1.push(taskList[task])
                 taskGrp1Ids.push(task)
            } else if(taskList[task].status === "In-Progress"){
                taskGrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskGrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }
        
        console.log("new", taskGrp1)
        console.log("In-Progress", taskGrp2)
        console.log("completed",taskGrp3)
        
        setstatusTaskLen({
            newLen: taskGrp1.length,
            inProgressLen: taskGrp2.length,
            completedLen: taskGrp3.length
        })
    }

    const sortTaskByPriority = () => {
        taskGrp1 = []
        taskGrp2 = []
        taskGrp3 =[]
        header1 = "Low"
        header2 = "Medium"
        header3 = "High"
        for(let task in taskList){
            if(taskList[task].priority === "Low"){
                taskGrp1.push(taskList[task])
                taskGrp1Ids.push(task)
            } else if(taskList[task].priority === "Medium"){
                taskGrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskGrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }

        console.log("low", taskGrp1)
        console.log("medium", taskGrp2)
        console.log("high",taskGrp3) 

        setstatusTaskLen({
            newLen: taskGrp1.length,
            inProgressLen: taskGrp2.length,
            completedLen: taskGrp3.length
        })
    }

    const sortTaskByType = () => {
        taskGrp1 = []
        taskGrp2 = []
        taskGrp3 = []
        header1 = "Personal"
        header2 = "Work"
        header3 = "Miscellaneous"
        for(let task in taskList){
            if(taskList[task].type === "Personal"){
                taskGrp1.push(taskList[task])
                taskGrp1Ids.push(task)
            } else if(taskList[task].type === "Work"){
                taskGrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskGrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }

        console.log("personal", taskGrp1)
        console.log("work", taskGrp2)
        console.log("miscellaneous",taskGrp3)

        setstatusTaskLen({
            newLen: taskGrp1.length,
            inProgressLen: taskGrp2.length,
            completedLen: taskGrp3.length
        })
    }

    return(
        <div>
            {usePromiseTracker().promiseInProgress === true ? (
            <div className="loading">
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"></Loader>
            </div>) : (
                <div>
                    <div className="mt-3 row justify-content-center">
                        <img className="tick" src={tick} alt="tick"></img>
                        <h1><b>Task List</b></h1>
                    </div>
                    {dataFetch.data === false ? (
                        <div className="alert-box">
                            <div className="row justify-content-center" >
                                <h2>No task created!</h2>
                            </div>
                        </div>) : (null)}
                    {(() => {
                        const outerHTML = [];
                        if(dataFetch.data === true){
                            outerHTML.push(
                                <div className="container mt-lg-5">
                                    <h5 className="text-center"><b>Group by</b></h5>
                                    <select name="group" id="type" className="form-control rounded-2" onChange={groupByUpadate}>
                                        <option value="status">Status</option>
                                        <option value="priority">Priority</option>
                                        <option value="type">Type</option>
                                    </select>
                                    {(() => {
                                        const html = [];
                                        html.push(
                                            <div>
                                                <div className="row justify-content-around mt-5" >
                                                    <h5 className="text-danger"><b>{header1}</b></h5>
                                                    <h5 className="text-warning"><b>{header2}</b></h5>
                                                    <h5 className="text-primary"><b>{header3}</b></h5>
                                                </div>
                                                <hr></hr>
                                                <div className="row justify-content-around mt-3">
                                                    <div className="col">
                                                        {(() => {
                                                            const options = [];
                                                            for (let i = 0 ; i< statusTaskLen.newLen; i++) {
                                                                options.push(<div>
                                                                    <Card 
                                                                        uId = {taskGrp1Ids[i]}
                                                                        id = {taskGrp1[i].id}
                                                                        title = {taskGrp1[i].title}
                                                                        dueDate = {taskGrp1[i].dueDate}
                                                                        status = {taskGrp1[i].status}
                                                                        description = {taskGrp1[i].description}
                                                                        type = {taskGrp1[i].type}
                                                                        priority = {taskGrp1[i].priority}
                                                                        createdDate = {taskGrp1[i].createdDate}
                                                                        comments = {taskGrp1[i].comments}
                                                                    ></Card>
                                                                </div>);
                                                            }
                                                            return options;
                                                        })()}
                                                    </div>
                                                    <div className="col">
                                                        {(() => {
                                                            const options = [];
                                                            for (let i = 0 ; i< statusTaskLen.inProgressLen; i++) {
                                                                options.push(<div>
                                                                    <Card 
                                                                        uId = {taskGrp2Ids[i]}
                                                                        id = {taskGrp2[i].id}
                                                                        title = {taskGrp2[i].title}
                                                                        dueDate = {taskGrp2[i].dueDate}
                                                                        status = {taskGrp2[i].status}
                                                                        description = {taskGrp2[i].description}
                                                                        type = {taskGrp2[i].type}
                                                                        priority = {taskGrp2[i].priority}
                                                                        createdDate = {taskGrp2[i].createdDate}
                                                                        comments = {taskGrp2[i].comments}
                                                                        ></Card>
                                                                </div>);
                                                            }
                                                            return options;
                                                        })()}
                                                    </div>
                                                    <div className="col">
                                                        {(() => {
                                                            const options = [];
                                                            for (let i = 0 ; i< statusTaskLen.completedLen; i++) {
                                                                options.push(<div>
                                                                    <Card 
                                                                        uId = {taskGrp3Ids[i]}
                                                                        id = {taskGrp3[i].id}
                                                                        title = {taskGrp3[i].title}
                                                                        dueDate = {taskGrp3[i].dueDate}
                                                                        status = {taskGrp3[i].status}
                                                                        description = {taskGrp3[i].description}
                                                                        type = {taskGrp3[i].type}
                                                                        priority = {taskGrp3[i].priority}
                                                                        createdDate = {taskGrp3[i].createdDate}
                                                                        comments = {taskGrp3[i].comments}
                                                                        ></Card>
                                                                </div>);
                                                            }
                                                            return options;
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>)
                                        return html;
                                    })()}
                                </div>
                            )
                        }
                        return outerHTML;
                    })()}
                </div>
            )}
        </div>
    );
}

export default TaskListing