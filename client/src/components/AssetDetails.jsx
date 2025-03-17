// import React from "react";

// const AssetDetails = () => {
//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md">
//       <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดพัสดุ</h3>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">ประเภทพัสดุ</label>
//           <input
//             type="text"
//             className="w-full border-2 border-blue-100 rounded-xl p-2"
//             placeholder="กรอกชื่อประเภทพัสดุ"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">สถานที่ใช้งาน</label>
//           <input
//             type="text"
//             className="w-full border-2 border-blue-100 rounded-xl p-2"
//             placeholder="สถานที่ใช้งาน"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">การใช้งาน</label>
//           <input
//             type="text"
//             className="w-full border-2 border-blue-100 rounded-xl p-2"
//             placeholder="การใช้งาน"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">สถานที่ส่งมอบ</label>
//           <input
//             type="text"
//             className="w-full border-2 border-blue-100 rounded-xl p-2"
//             placeholder="สถานที่ส่งมอบ"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">ผู้รับผิดชอบ</label>
//           <input
//             type="text"
//             className="w-full border-2 border-blue-100 rounded-xl p-2"
//             placeholder="ผู้รับผิดชอบ"
//           />
//         </div>
//         <div>
//         <label className="block text-sm text-gray-700 mb-2">เพิ่มรูปภาพ</label>
//         <button
//           className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-700"
//         >
//           + เพิ่มรูป
//         </button>
//         </div>
//       </div>  
//     </div>
//   );
// };

// export default AssetDetails;



import React, { useState } from "react";

const AssetDetails = ({ value, onChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onChange('image', reader.result); // ส่งข้อมูลภาพกลับไปที่ Parent
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดพัสดุ</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">ชื่อสินทรัพย์</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            placeholder="กรอกชื่อสินทรัพย์"
            value={value.main_asset_name}
            onChange={(e) => onChange('main_asset_name', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทสินทรัพย์</label>
          <select
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            value={value.type || ''} 
            onChange={(e) => onChange('type', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> 
                  <option>ครุภัณฑ์สำนักงาน</option>
                  <option>ครุภัณฑ์ยานพาหนะและขนส่ง</option>
                  <option>ครุภัณฑ์ไฟฟ้าและวิทยุ</option>
                  <option>ครุภัณฑ์ไฟฟ้าและวิทยุ-เครื่องกำเนิดไฟฟ้า</option>
                  <option>ครุภัณฑ์เขียนและเผยแพร่</option>
                  <option>ครุภัณฑ์การเกษตร-เครื่องมืออุปกรณ์</option>
                  <option>ครุภัณฑ์การเกษตร-เครื่องจักรกล</option>
                  <option>ครุภัณฑ์โรงงาน-เครื่องมืออุปกรณ์</option>
                  <option>ครุภัณฑ์โรงงาน-เครื่องจักรกล</option>
                  <option>ครุภัณฑ์ก่อสร้าง-เครื่องมือและอุปกรณ์</option>
                  <option>ครุภัณฑ์ก่อสร้าง-เครื่องจักรกล</option>
                  <option>ครุภัณฑ์วิทยาศาสตร์และการแพทย์</option>
                  <option>ครุภัณฑ์คอมพิวเตอร์</option>
                  <option>ครุภัณฑ์กีฬา-กายภาพ</option>
                  <option>ครุภัณฑ์สนาม</option>
                  <option>ครุภัณฑ์งานบ้านงานครัว</option>
                  <option>ครุภัณฑ์การศึกษา</option>
                  <option>ครุภัณฑ์ศิลปะ-นาฏศิลป์</option>
                  <option>ครุภัณฑ์อาวุธ</option>
          </select>
        </div>
        


        <div>
          <label className="block text-sm text-gray-700 mb-2">สถานที่ใช้งาน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            placeholder="สถานที่ใช้งาน"
            value={value.location_use}
            onChange={(e) => onChange('location_use', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">การใช้งาน</label>
          <select
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            value={value.usage || ''} 
            onChange={(e) => onChange('usage', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            <option value="ใช้งาน">ใช้งาน</option>
            <option value="ส่งซ่อม">ส่งซ่อม</option>
            <option value="ชำรุด">ชำรุด</option>
            <option value="บริจาค/โอน">บริจาค/โอน</option>
            <option value="รับโอน">รับโอน</option>
            <option value="จำหน่าย">จำหน่าย</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">สถานที่ส่งมอบ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            placeholder="สถานที่ส่งมอบ"
            value={value.location_deliver}
            onChange={(e) => onChange('location_deliver', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">ผู้รับผิดชอบ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2"
            placeholder="ผู้รับผิดชอบ"
            value={value.responsible_person || "ไม่มีข้อมูล"}  // ค่าเริ่มต้น
            onChange={(e) => onChange('responsible_person', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">เพิ่มรูปภาพ</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border-2 border-blue-100 rounded-xl p-2"
          />
          {image && (
            <div className="mt-4">
              <img src={image} alt="Asset" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
