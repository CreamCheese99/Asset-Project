import React from "react";

const ActionButtons2 = () => {
  return (
    <div className="mt-4 flex space-x-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        บันทึก
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        ยกเลิก 
      </button>


    </div>
  );
};

export default ActionButtons2;
