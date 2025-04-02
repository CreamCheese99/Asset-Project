import React from "react";
import { Link } from "react-router-dom";
const ActionButtons4 = () => {
  return (
    <div className="mt-4 flex justify-end space-x-4">
      <button className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-blue-600">   
        <Link
        to={`/home`}
        className=" hover:text-white-700 px-3 py-1"
        >
        กลับสู่หน้าหลัก
        </Link>
      </button>


    </div>
  );
};

export default ActionButtons4;

