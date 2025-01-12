// import React from "react";

// const ActionButtons = () => {
//   return (
//     <div className="mt-4 flex space-x-4">
//       <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
//         เพิ่ม
//       </button>

//       <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//         UPDATE 
//       </button>


//     </div>
//   );
// };

// export default ActionButtons;


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

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        UPDATE
      </button>
    </div>
  );
};

export default ActionButtons;
