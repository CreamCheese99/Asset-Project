
import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-asset"); // ชื่อเส้นทางไปยังหน้า AddAsset
  };

  return (
    <div className="mt-4 flex space-x-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={handleAddClick}
      >
        เพิ่ม
      </button>

      {/* <button className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        UPDATE
      </button> */}
    </div>
  );
};

export default ActionButtons;
