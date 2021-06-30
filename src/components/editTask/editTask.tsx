import { FC } from "react"

interface ParentCompProps {
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


const EditTask:FC<ParentCompProps> = ({id, title, dueDate, status,description, type, priority, createdDate, comments}) => {
    return(
        <div>
            <div className="card-header" id = "loginHeader" >
                <h3 className="mb-0 text-center text-white" >Edit Your Task</h3>
            </div>
            <form className="form" id="formcreatetask">
                <div className="form-group mt-2">
                    <label><b>Id<small className="text-danger"><b>*</b></small></b></label>
                    <input type="text" className="form-control form-control-lg rounded-2"  name="title" placeholder="Title" defaultValue={id?.toString()} required disabled/>
                </div>

                <div className="form-group mt-2">
                    <label><b>Title<small className="text-danger"><b>*</b></small></b></label>
                    <input type="text" className="form-control form-control-lg rounded-2"  name="title" placeholder="Title" defaultValue={title?.toString()} required/>
                </div>

                <div className="form-group">
                    <label><b>Description<small className="text-danger"><b>*</b></small></b></label>
                    <textarea  className="form-control form-control-lg rounded-2"  name="description" placeholder="Description" defaultValue={description?.toString()} required/>
                </div>

                <div className="form-group">
                    <label><b>Status <small className="text-danger"><b>*</b></small></b></label>
                    <select name="status" id="status" className="form-control form-control-lg rounded-2" defaultValue={status?.toString()} required>
                        <option value=""> </option>
                        <option value="New">New</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label><b>Select Type <small className="text-danger"><b>*</b></small></b></label>
                    <select name="type" id="type" className="form-control form-control-lg rounded-2" defaultValue={type?.toString()} required>
                        <option value=""> </option>
                        <option value="Personal"> Personal</option>
                        <option value="Work">Work</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </div>

                <div className="form-group">
                    <label><b>Select Priority <small className="text-danger"><b>*</b></small></b></label>
                    <select name="priority" id="priority" className="form-control form-control-lg rounded-2" defaultValue={priority?.toString()} required>
                        <option value=""> </option>
                        <option value="Low"> Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label><b>Due Date <small className="text-danger"><b>*</b></small></b></label>
                    <input type="date"  className="form-control form-control-lg rounded-2" name="dueDate" defaultValue={dueDate?.toString()} required/>
                </div>

                <div className="form-group">
                    <label><b>Created Date</b></label>
                    <input type="text"  className="form-control form-control-lg rounded-2" name="createdDate" defaultValue={createdDate?.toString()} required disabled/>
                </div>

                <div className="form-group">
                <textarea className="form-control form-control-lg rounded-2"   name="comments" placeholder="Comments" defaultValue={comments?.toString()}/>  
                </div>
            </form>
        </div>
    );
}
export default EditTask