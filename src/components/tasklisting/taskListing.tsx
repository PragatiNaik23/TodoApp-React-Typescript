import { ChangeEvent, FC, useEffect, useState } from "react";
import tick from '../../images/tick.png';
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
        axiosInstance.get(`/users/ram123/task.json`)
        .then(response => {
            taskList = response.data
            console.log(taskList)
            sortTaskByStatus()
        })
        .catch(error => {
            console.log(error)
        })
    },[])

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
                                                <Card task = {newTask[i].title}></Card>
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
                                            <Card task = {inProgressTask[i].title}></Card>
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
                                            <Card task = {completedtask[i].title}></Card>
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
                                            <Card task = {lowTask[i].title}></Card>
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
                                            <Card task = {mediumTask[i].title}></Card>
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
                                            <Card task = {highTask[i].title}></Card>
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
                                            <Card task = {personalTask[i].title}></Card>
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
                                            <Card task = {workTask[i].title}></Card>
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
                                            <Card task = {miscellaneousTask[i].title}></Card>
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

    );
}

export default TaskListing