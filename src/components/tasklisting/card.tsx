import { FC } from "react";
import '../../css/style.css'

interface ParentCompProps {
    // id: React.ReactNode;
    // title:React.ReactNode;
    // description: React.ReactNode;
    // type: React.ReactNode;
    // priority: React.ReactNode;
    // dueDate: React.ReactNode;
    // createdDate: React.ReactNode;
    // comments: React.ReactNode;
    // status: React.ReactNode;
    task:React.ReactNode;
}

const Card: FC<ParentCompProps> = (props) => {
   return(
    <div className="card mt-3">
        <div className="card-header bg-dark text-white d-flex justify-content-around">
            <div className="text-white">
            {props.task}
            </div>
            <div className="text-danger">
                Due Date
            </div>
        </div>
        <div className="card-body text-left">
            <div className="text-center">
                Status
            </div>
            <div>
            Description:
            </div>
            <div className="row justify-content-between mt-1">
                <div className="ml-3">
                Type:
                </div>
                <div className="text-primary mr-auto"> 
                    type Data
                </div>
                <div>
                    Priority:
                </div>
                <div className="mr-1">
                    priority data
                </div>
            </div>
            <div className="col">
                <div className="row d-flex justify-content-start mt-1">
                    Created Date:
                </div>
                <div className="row d-flex justify-content-start mt-1">
                    Comments:
                </div>
                <button className="editbtn btn btn-danger mt-2 col-md-4 text-center">Edit</button>
            </div>
        </div>
    </div>
   ); 
}

export default Card