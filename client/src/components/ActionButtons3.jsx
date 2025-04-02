import React from "react";
import { Link } from "react-router-dom";
const ActionButtons3 = () => {
  return (
    <div className="mt-4 flex space-x-4">
      <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600">
       
       


        <Link
        to={`/manage-assets`}
        className=" hover:text-white-700  rounded-xl px-3 py-1"
        >
        ย้อนกลับ
       
        </Link>
      </button>


    </div>
  );
};

export default ActionButtons3;

