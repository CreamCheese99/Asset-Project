// import React from "react";
// import axios from "axios";

// const ActionButtons2 = ({ assetData, onCancel }) => {


  
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/mainasset", assetData);
//       alert("บันทึกข้อมูลสำเร็จ!");
//       console.log("Response:", response.data);
      

//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
//     }
//   };

//   return (
//     <div className="mt-4 flex space-x-4">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
//         onClick={handleSubmit}
//       >
//         บันทึก
//       </button>

//       <button
//         className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700"
//         onClick={onCancel}  // เรียกใช้ฟังก์ชัน onCancel
//       >
//         ยกเลิก
//       </button>
//     </div>
//   );
// };

// export default ActionButtons2;


import React from "react";
import axios from "axios";

const ActionButtons2 = ({ assetData, onCancel }) => {
  
  // ฟังก์ชันสำหรับการส่งข้อมูลไปยัง server
  const handleSubmit = async () => {
    if (!assetData.main_asset_id) {
      alert('กรุณากรอก main_asset_id');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/mainasset', assetData);
      console.log('บันทึกข้อมูลสำเร็จ:', response.data);
      alert('บันทึกข้อมูลสำเร็จ!');
    } catch (error) {
      if (error.response) {
        console.error('ข้อผิดพลาดจากการตอบกลับ:', error.response.data);
        alert('เกิดข้อผิดพลาดที่เซิร์ฟเวอร์!');
      } else if (error.request) {
        console.error('ข้อผิดพลาดจากการส่งคำขอ:', error.request);
        alert('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์!');
      } else {
        console.error('ข้อความข้อผิดพลาด:', error.message);
        alert('ข้อผิดพลาดที่ไม่คาดคิด!');
      }
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

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700"
        onClick={onCancel} // เรียกใช้ฟังก์ชัน onCancel จาก props
      >
        ยกเลิก
      </button>
    </div>
  );
};

export default ActionButtons2;
