import React from "react";
import { FaRegEye } from "react-icons/fa6";

const View = ({ taskData }) => {
    return (
        <div>
            <FaRegEye className="h-[90%] w-[134%] pl-4 pr-3 text-black"
                onClick={() => alert(` Id: ${taskData.id} Title: ${taskData.data.title} Description: ${taskData.data.description} Completed: ${taskData.data.completed}`)}
            />
        </div>
 
    );
};
export default View;