import React, { ChangeEvent, FC } from "react";

interface ParentCompProps {
    id:number | undefined;
    title:string | undefined;
    dueDate: Date | undefined;
    status: string | undefined;
    description: string | undefined;
    type: string | undefined;
    priority: string | undefined;
    createdDate: Date | undefined;
    comments: string | undefined;
    isEnabled: boolean;
    inputData: (e:ChangeEvent<HTMLInputElement>) => void;
    textareaData: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    selectData: (e: ChangeEvent<HTMLSelectElement>) => void;
    submit: (e:React.SyntheticEvent) => Promise<void> | void;
    dupId: boolean;
    createTask: boolean;
}

const TaskForm:FC<ParentCompProps> = (
    {id, title, dueDate, status,description, type, priority, createdDate, comments, 
        isEnabled,inputData,textareaData,selectData, submit, dupId, createTask}
    ) => {
    return(
        <form className="form" id="formcreatetask" onSubmit={submit}>
            {createTask === false ? (
            <div className="form-group mt-2">
                <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                <input type="number" className="form-control form-control-lg rounded-2"  name="id" placeholder="Id"  onChange={inputData} defaultValue={id}required disabled/>
            </div>) : (dupId === false ? (
                    <div className="form-group mt-2">
                        <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                        <input type="number" className="form-control form-control-lg rounded-2"  name="id" placeholder="Id"  onChange={inputData} defaultValue={id}required/>
                    </div>) : (
                    <div className="form-group mt-2">
                        <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                        <input type="number" className="form-control form-control-lg rounded-2"  name="id" placeholder="Id"  onChange={inputData} defaultValue={id}required/>
                        <span className="text-danger">Id already in use!</span>
                    </div>)
            )}

            <div className="form-group">
            <label><b>Title<small className="text-danger"><b>*</b></small></b></label>
                <input type="text" className="form-control form-control-lg rounded-2"  name="title" placeholder="Title" onChange={inputData} defaultValue={title} required/>
            </div>

            <div className="form-group">
            <label><b>Description<small className="text-danger"><b>*</b></small></b></label>
                <textarea  className="form-control form-control-lg rounded-2"  name="description" placeholder="Description" onChange={textareaData} defaultValue={description} required/>
            </div>
            
            { createTask === false ? (
                <div className="form-group">
                <label><b>Status <small className="text-danger"><b>*</b></small></b></label>
                <select name="status" id="status" className="form-control form-control-lg rounded-2" onChange={selectData} defaultValue={status} required>
                    <option value=""> </option>
                    <option value="New">New</option>
                    <option value="In-Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>) : null}
            
            <div className="form-group">
                <label><b>Select Type <small className="text-danger"><b>*</b></small></b></label>
                <select name="type" id="type" className="form-control form-control-lg rounded-2" onChange={selectData} defaultValue={type} required>
                    <option value=""> </option>
                    <option value="Personal"> Personal</option>
                    <option value="Work">Work</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            </div>

            <div className="form-group">
                <label><b>Select Priority <small className="text-danger"><b>*</b></small></b></label>
                <select name="priority" id="priority" className="form-control form-control-lg rounded-2" onChange={selectData} defaultValue={priority} required>
                    <option value=""> </option>
                    <option value="Low"> Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="form-group">
                <label><b>Due Date <small className="text-danger"><b>*</b></small></b></label>
                <input type="date"  className="form-control form-control-lg rounded-2" name="dueDate" onChange={inputData} defaultValue={dueDate?.toString()} required/>
            </div>
            
            {createTask === false ? (
                <div className="form-group">
                    <label><b>Created Date</b></label>
                    <input type="text"  className="form-control form-control-lg rounded-2" name="createdDate"  onChange={inputData} value={createdDate?.toString()} required disabled/>
                </div>) : (
                <div className="form-group">
                    <label><b>Created Date</b></label>
                    <input type="text"  className="form-control form-control-lg rounded-2" name="createdDate"  onChange={inputData} value={createdDate?.toString()} required/>
                </div>)}

            <div className="form-group">
            <textarea className="form-control form-control-lg rounded-2"   name="comments" placeholder="Comments" onChange={textareaData} defaultValue={comments}/>  
            </div>

            <button type="submit" disabled = {!isEnabled} className="btn btn-success btn-lg" id="btnLogin">Submit</button>
        </form>
    );
}

export default TaskForm;