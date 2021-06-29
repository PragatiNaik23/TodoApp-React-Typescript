import { ChangeEvent, FC, useEffect, useState } from "react";
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from "react-loader-spinner";
import tick from '../../images/tick.png';
import '../../css/style.css';
import axiosInstance from '../../axios';
import Card from './card';

let taskList: Array<any>
let newTask:  any = [], inProgressTask: any = [], completedtask: any = []
let lowTask: any = [], mediumTask: any = [], highTask: any = []
let personalTask: any = [], workTask: any = [], miscellaneousTask: any = []

const TaskListing: FC = () => {
    const [groupBy, setGroupBy] = useState({
        group: 'status'
    })

    const [headers, setHeaders] = useState({
        statusHeader: true,
        priorityHeader: false,
        typeHeader: false
    })

    const groupByUpadate = (e: ChangeEvent<HTMLSelectElement>) => {
        setGroupBy({
            ...groupBy,
            [e.target.name] : e.target.value
        })
        sort(e.target.value)
    }
    
    const [statusTaskLen, setstatusTaskLen] = useState({
        newLen: 0,
        inProgressLen: 0,
        completedLen: 0
    })

   
    useEffect(() => {
        <Loader type="ThreeDots"></Loader>
        trackPromise(
        axiosInstance.get(`/users/ram123/task.json`)
        .then(response => {
            taskList = response.data
            console.log(taskList)
            sortTaskByStatus()
        })
        .catch(error => {
            console.log(error)
        })
        )
    },[])

    console.log(usePromiseTracker())
    const sort = (sortBy: string) => {
        if(sortBy === "status" ){
            sortTaskByStatus()
            setHeaders({
                statusHeader: true,
                priorityHeader: false,
                typeHeader: false
            })
        } else if(sortBy === "priority"){
            sortTaskByPriority()
            setHeaders({
                statusHeader: false,
                priorityHeader: true,
                typeHeader: false
            })
        } else{
            sortTaskByType()
            setHeaders({
                statusHeader: false,
                priorityHeader: false,
                typeHeader: true
            })
        }
    }
    const sortTaskByStatus = () => {
        newTask = []
        inProgressTask =[]
        completedtask=[]
        for(let task in taskList){
            if(taskList[task].status === "New"){
                 newTask.push(taskList[task])
            } else if(taskList[task].status === "In-Progress"){
                inProgressTask.push(taskList[task])
            } else{
                completedtask.push(taskList[task])
            }
        }

        console.log("new", newTask)
        console.log("In-Progress", inProgressTask)
        console.log("completed",completedtask)
        
        setstatusTaskLen({
            newLen: newTask.length,
            inProgressLen: inProgressTask.length,
            completedLen: completedtask.length
        })
    }

    const sortTaskByPriority = () => {
        lowTask = []
        mediumTask = []
        highTask =[]
        for(let task in taskList){
            if(taskList[task].priority === "Low"){
                lowTask.push(taskList[task])
            } else if(taskList[task].priority === "Medium"){
                mediumTask.push(taskList[task])
            } else{
                highTask.push(taskList[task])
            }
        }

        console.log("low", lowTask)
        console.log("medium", mediumTask)
        console.log("high",highTask) 
    }

    const sortTaskByType = () => {
        personalTask = []
        workTask = []
        miscellaneousTask = []
        for(let task in taskList){
            if(taskList[task].type === "Personal"){
                personalTask.push(taskList[task])
            } else if(taskList[task].type === "Work"){
                workTask.push(taskList[task])
            } else{
                miscellaneousTask.push(taskList[task])
            }
        }

        console.log("personal", personalTask)
        console.log("work", workTask)
        console.log("miscellaneous",miscellaneousTask)
    }

    

    return(
        <div>{usePromiseTracker().promiseInProgress === true ? (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40vh",}}>
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"></Loader>
            </div>) : (
                <div>
                    <div className="mt-3 row justify-content-center">
                        <img className="tick" src={tick}></img>
                        <h1><b>Task List</b></h1>
                    </div>
                    <div id ="alert"></div>
                    <div className="container mt-lg-5">
                        <h5 className="text-center"><b>Group by</b></h5>
                        <select name="group" id="type" className="form-control rounded-2" onChange={groupByUpadate}>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                            <option value="type">Type</option>
                        </select>
                        {(() => {
                            const html = [];
                            if(headers.statusHeader === true){
                                html.push(
                                    <div id="displaystatus">
                                    <div className="row justify-content-around mt-5" >
                                        <h5 className="text-danger"><b>New</b></h5>
                                        <h5 className="text-warning"><b>In Progress</b></h5>
                                        <h5 className="text-primary"><b>Completed</b></h5>
                                    </div>
                                    <hr></hr>
                                    <div className="row justify-content-around mt-3" id = "statusListParent">
                                        <div className="col" id="newList">
                                            {(() => {
                                                const options = [];
                                                for (let i = 0 ; i< statusTaskLen.newLen; i++) {
                                                    options.push(<div>
                                                        <Card 
                                                            title = {newTask[i].title}
                                                            dueDate = {newTask[i].dueDate}
                                                            status = {newTask[i].status}
                                                            description = {newTask[i].description}
                                                            type = {newTask[i].type}
                                                            priority = {newTask[i].priority}
                                                            createdDate = {newTask[i].createdDate}
                                                            comments = {newTask[i].comments}
                                                        ></Card>
                                                    </div>);
                                                }
                                                return options;
                                            })()}
                                        </div>
                                        <div className="col" id="progressList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< statusTaskLen.inProgressLen; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {inProgressTask[i].title}
                                                            dueDate = {inProgressTask[i].dueDate}
                                                            status = {inProgressTask[i].status}
                                                            description = {inProgressTask[i].description}
                                                            type = {inProgressTask[i].type}
                                                            priority = {inProgressTask[i].priority}
                                                            createdDate = {inProgressTask[i].createdDate}
                                                            comments = {inProgressTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                        <div className="col" id="completedList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< statusTaskLen.completedLen; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {completedtask[i].title}
                                                            dueDate = {completedtask[i].dueDate}
                                                            status = {completedtask[i].status}
                                                            description = {completedtask[i].description}
                                                            type = {completedtask[i].type}
                                                            priority = {completedtask[i].priority}
                                                            createdDate = {completedtask[i].createdDate}
                                                            comments = {completedtask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                    </div>
                                </div>)
                                return html;
                            } else if(headers.priorityHeader === true){
                                html.push(
                                    <div id="displaypriority">
                                    <div className="row justify-content-around mt-5">
                                        <h5 className="text-primary"><b>Low</b></h5>
                                        <h5 className="text-warning"><b>Medium</b></h5>
                                        <h5 className="text-danger"><b>High</b></h5>
                                    </div>
                                    <hr></hr>
                                    <div className="row justify-content-around mt-3" id = "priorityListParent">
                                        <div className="col" id="lowList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< lowTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {lowTask[i].title}
                                                            dueDate = {lowTask[i].dueDate}
                                                            status = {lowTask[i].status}
                                                            description = {lowTask[i].description}
                                                            type = {lowTask[i].type}
                                                            priority = {lowTask[i].priority}
                                                            createdDate = {lowTask[i].createdDate}
                                                            comments = {lowTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                        <div className="col" id="mediumList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< mediumTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {mediumTask[i].title}
                                                            dueDate = {mediumTask[i].dueDate}
                                                            status = {mediumTask[i].status}
                                                            description = {mediumTask[i].description}
                                                            type = {mediumTask[i].type}
                                                            priority = {mediumTask[i].priority}
                                                            createdDate = {mediumTask[i].createdDate}
                                                            comments = {mediumTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                        <div className="col" id="highList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< highTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {highTask[i].title}
                                                            dueDate = {highTask[i].dueDate}
                                                            status = {highTask[i].status}
                                                            description = {highTask[i].description}
                                                            type = {highTask[i].type}
                                                            priority = {highTask[i].priority}
                                                            createdDate = {highTask[i].createdDate}
                                                            comments = {highTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                    </div>
                                </div>)
                                return html;
                            } else if(headers.typeHeader === true) {
                                html.push(
                                    <div id="displaytype">
                                    <div className="row justify-content-around mt-5">
                                        <h5 className="text-primary"><b>Personal</b></h5>
                                        <h5 className="text-danger"><b>Work</b></h5>
                                        <h5 className="text-warning"><b>Miscellaneous</b></h5>
                                    </div>
                                    <hr></hr>
                                    <div className="row justify-content-around mt-3" id = "typeListParent">
                                        <div className="col" id="personalList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< personalTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {personalTask[i].title}
                                                            dueDate = {personalTask[i].dueDate}
                                                            status = {personalTask[i].status}
                                                            description = {personalTask[i].description}
                                                            type = {personalTask[i].type}
                                                            priority = {personalTask[i].priority}
                                                            createdDate = {personalTask[i].createdDate}
                                                            comments = {personalTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                        <div className="col" id="workList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< workTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {workTask[i].title}
                                                            dueDate = {workTask[i].dueDate}
                                                            status = {workTask[i].status}
                                                            description = {workTask[i].description}
                                                            type = {workTask[i].type}
                                                            priority = {workTask[i].priority}
                                                            createdDate = {workTask[i].createdDate}
                                                            comments = {workTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                        <div className="col" id="miscellaneousList">
                                        {(() => {
                                            const options = [];
                                            for (let i = 0 ; i< miscellaneousTask.length; i++) {
                                                options.push(<div>
                                                    <Card 
                                                            title = {miscellaneousTask[i].title}
                                                            dueDate = {miscellaneousTask[i].dueDate}
                                                            status = {miscellaneousTask[i].status}
                                                            description = {miscellaneousTask[i].description}
                                                            type = {miscellaneousTask[i].type}
                                                            priority = {miscellaneousTask[i].priority}
                                                            createdDate = {miscellaneousTask[i].createdDate}
                                                            comments = {miscellaneousTask[i].comments}
                                                        ></Card>
                                                </div>);
                                            }
                                            return options;
                                        })()}
                                        </div>
                                    </div>
                                </div>)
                                return html
                            }           
                        })()}
                    </div>
                </div>
            )}
           
        </div>

    );
}

export default TaskListing