import { ChangeEvent, FC, useEffect, useState } from "react";
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from "react-loader-spinner";
import {createBrowserHistory} from 'history';
import tick from '../../images/tick.png';
import '../../css/style.css';
import axiosInstance from '../../axios';
import Card from './card';
import { Task } from "../../modalClass/Task";


export const history = createBrowserHistory({forceRefresh:true});

let taskList: Array<Task>
let taskgrp1:  Task[] = [], taskgrp2:  Task[] = [], taskgrp3: Task[] = []
let taskGrp1Ids:  string[] = [], taskGrp2Ids: string[] = [], taskGrp3Ids: string[] = []
let header1: string, header2: string, header3: string

const TaskListing: FC = () => {

    let username = window.localStorage.getItem('username')

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
    },[])


    const sortTaskByStatus = () => {
        taskgrp1 = []
        taskgrp2 =[]
        taskgrp3=[]
        header1 = "New"
        header2 = "In Progress"
        header3 = "Completed"
        for(let task in taskList){
            if(taskList[task].status === "New"){
                taskgrp1.push(taskList[task])
                 taskGrp1Ids.push(task)
            } else if(taskList[task].status === "In-Progress"){
                taskgrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskgrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }
        
        console.log("new", taskgrp1)
        console.log("In-Progress", taskgrp2)
        console.log("completed",taskgrp3)
        
        setstatusTaskLen({
            newLen: taskgrp1.length,
            inProgressLen: taskgrp2.length,
            completedLen: taskgrp3.length
        })
    }

    const sortTaskByPriority = () => {
        taskgrp1 = []
        taskgrp2 = []
        taskgrp3 =[]
        header1 = "Low"
        header2 = "Medium"
        header3 = "High"
        for(let task in taskList){
            if(taskList[task].priority === "Low"){
                taskgrp1.push(taskList[task])
                taskGrp1Ids.push(task)
            } else if(taskList[task].priority === "Medium"){
                taskgrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskgrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }

        console.log("low", taskgrp1)
        console.log("medium", taskgrp2)
        console.log("high",taskgrp3) 

        setstatusTaskLen({
            newLen: taskgrp1.length,
            inProgressLen: taskgrp2.length,
            completedLen: taskgrp3.length
        })
    }

    const sortTaskByType = () => {
        taskgrp1 = []
        taskgrp2 = []
        taskgrp3 = []
        header1 = "Personal"
        header2 = "Work"
        header3 = "Miscellaneous"
        for(let task in taskList){
            if(taskList[task].type === "Personal"){
                taskgrp1.push(taskList[task])
                taskGrp1Ids.push(task)
            } else if(taskList[task].type === "Work"){
                taskgrp2.push(taskList[task])
                taskGrp2Ids.push(task)
            } else{
                taskgrp3.push(taskList[task])
                taskGrp3Ids.push(task)
            }
        }

        console.log("personal", taskgrp1)
        console.log("work", taskgrp2)
        console.log("miscellaneous",taskgrp3)

        setstatusTaskLen({
            newLen: taskgrp1.length,
            inProgressLen: taskgrp2.length,
            completedLen: taskgrp3.length
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
                        <img className="tick" src={tick}></img>
                        <h1><b>Task List</b></h1>
                    </div>
                    {dataFetch.data === false ? (
                        <div id="alert">
                            <div className="alert-box row mt-5 justify-content-center" >
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
                                                                        id = {taskgrp1[i].id}
                                                                        title = {taskgrp1[i].title}
                                                                        dueDate = {taskgrp1[i].dueDate}
                                                                        status = {taskgrp1[i].status}
                                                                        description = {taskgrp1[i].description}
                                                                        type = {taskgrp1[i].type}
                                                                        priority = {taskgrp1[i].priority}
                                                                        createdDate = {taskgrp1[i].createdDate}
                                                                        comments = {taskgrp1[i].comments}
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
                                                                        id = {taskgrp2[i].id}
                                                                        title = {taskgrp2[i].title}
                                                                        dueDate = {taskgrp2[i].dueDate}
                                                                        status = {taskgrp2[i].status}
                                                                        description = {taskgrp2[i].description}
                                                                        type = {taskgrp2[i].type}
                                                                        priority = {taskgrp2[i].priority}
                                                                        createdDate = {taskgrp2[i].createdDate}
                                                                        comments = {taskgrp2[i].comments}
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
                                                                        id = {taskgrp3[i].id}
                                                                        title = {taskgrp3[i].title}
                                                                        dueDate = {taskgrp3[i].dueDate}
                                                                        status = {taskgrp3[i].status}
                                                                        description = {taskgrp3[i].description}
                                                                        type = {taskgrp3[i].type}
                                                                        priority = {taskgrp3[i].priority}
                                                                        createdDate = {taskgrp3[i].createdDate}
                                                                        comments = {taskgrp3[i].comments}
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