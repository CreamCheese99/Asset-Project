import React from "react";
import API from "../API";

const ActionButtons2 = ({ assetData, onCancel }) => {
  
  const handleSubmit = async () => {
    if (!assetData.main_asset_id) {
      alert('กรุณากรอก main_asset_id');
      return;
    }
  
    const formData = new FormData();   
  
    // // วนลูปเพิ่มข้อมูล assetData ลงใน formData
    // for (const key in assetData) {
    //   if (key === "image" && assetData[key] instanceof FileList) { 
    //     // ถ้ามีหลายไฟล์
    //     Array.from(assetData[key]).forEach((file, index) => {
    //       formData.append(`image[${index}]`, file); // เพิ่มไฟล์แต่ละไฟล์ไปใน FormData
    //     });
    //   } else {
    //     formData.append(key, assetData[key]);
    //   }
    // }
  

    for (const key in assetData) {
      if (key === "image" && assetData[key] instanceof FileList) { 
        Array.from(assetData[key]).forEach((file, index) => {
          formData.append(`image${index + 1}`, file); // ✅ เปลี่ยนชื่อให้ตรง backend
        });
      } else if (key === "curriculum") {
        formData.append("curriculum", JSON.stringify(assetData[key])); // ✅ แก้ตรงนี้
      } else {
        formData.append(key, assetData[key]);
      }
    }
    
    try {
      const response = await API.post('/mainasset-add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('บันทึกข้อมูลสำเร็จ:', response.data);
      alert('บันทึกข้อมูลสำเร็จ!');
    } catch (error) {
      if (error.response) {
        console.error('ข้อผิดพลาดจากการตอบกลับ:', error.response.data);
        alert(error.response.data.error || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์!');
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
    <div className="mt-4 flex space-x-4 justify-end">
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-red-500"
        onClick={onCancel}
      >
        ยกเลิก
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        onClick={handleSubmit}
      >
        บันทึก
      </button>
    </div>


  );
};

export default ActionButtons2;
