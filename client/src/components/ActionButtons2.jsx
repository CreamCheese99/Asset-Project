import React from "react";
import axios from "axios";

const ActionButtons2 = ({ formData }) => {
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/mainasset", formData);
      alert("บันทึกข้อมูลสำเร็จ!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="mt-4 flex space-x-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        onClick={handleSubmit}
      >
        บันทึก
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700">
        ยกเลิก
      </button>
    </div>
  );
};

export default ActionButtons2;
