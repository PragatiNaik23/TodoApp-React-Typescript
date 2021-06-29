import { FC } from "react";
import '../../css/style.css'

interface ParentCompProps {
    title:React.ReactNode;
    dueDate: React.ReactNode;
    status: React.ReactNode;
    description: React.ReactNode;
    type: React.ReactNode;
    priority: React.ReactNode;
    createdDate: React.ReactNode;
    comments: React.ReactNode;
}

let Sclasses : string, Pclasses: string, Tclasses: string

const Card: FC<ParentCompProps> = ({title, dueDate, status,description, type, priority, createdDate, comments}) => {

    if(status === "New"){
        Sclasses = "text-danger text-center"
    } else if(status === "In-Progress"){
        Sclasses = "text-warning text-center"
    } else{
        Sclasses = "text-primary text-center"
    }

    if(priority === "Low"){
        Pclasses = "text-primary"
    } else if(priority === "Medium"){
        Pclasses = "text-warning" 
    } else{
        Pclasses = "text-danger"
    }

    if(type === "Personal"){
        Tclasses = "text-primary"
    } else if(type === "Work"){
        Tclasses = "text-danger"
    } else{
        Tclasses = "text-warning"
    }

   return(
    <div className="card mt-3">
        <div className="card-header bg-dark text-white d-flex justify-content-around">
            <div className="text-white">
                {title}
            </div>
            <div className="text-danger">
               {dueDate}
            </div>
        </div>
        <div className="card-body text-left">
            <div className={Sclasses}>
                <b>{status}</b>
            </div>
            <div className="mt-1">
            Description:{description}
            </div>
            <div className="row justify-content-between mt-1">
                <div className="col">
                    <div className="row">
                        <div className="ml-3">
                            Type:
                        </div>
                        <div className={Tclasses}> 
                            {type}
                        </div>
                    </div> 
                </div>
                <div className="col">
                    <div className="row">
                        <div>
                            Priority:
                        </div>
                        <div className={Pclasses}>
                            {priority}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="row d-flex justify-content-start mt-1">
                    Created Date:{createdDate}
                </div>
                <div className="row d-flex justify-content-start mt-1">
                    Comments:{comments}
                </div>
                <button className="editbtn btn btn-danger mt-3 col-md-4 text-center">Edit</button>
            </div>
        </div>
    </div>
   ); 
}

export default Card