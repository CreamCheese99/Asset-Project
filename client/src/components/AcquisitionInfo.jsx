// const AcquisitionInfo = () => {
//     return (
//       <div className="bg-white mt-4 p-4 rounded-md shadow-md">
//         <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ปีงบประมาณ</label>
//             <select className="w-full border-2 border-blue-100 rounded-md">
//               <option>2561</option>
//             </select>
//           </div>
        
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">วันที่ตรวจรับ</label>
//             <input type="date" className="w-full border-2 border-blue-100 rounded-md" />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
//             <select className="w-full border-2 border-blue-100 rounded-md">
//             <option>เงินรายได้</option>
//             <option>เงินงบประมาณ</option>
//             <option>เงินสะสมคลัง</option>
//             <option>เงินกันเหลือบปี</option>
//             </select>
            
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">วงเงินงบประมาณ</label>
//             <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
//             <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default AcquisitionInfo;

import React from "react";

const AcquisitionInfo = ({ value, onChange }) => {
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">ปีงบประมาณ</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md"
            value={value.fiscal_year} // แสดงค่าปัจจุบันจาก Parent
            onChange={(e) => onChange('fiscal_year', e.target.value)} // ส่งค่ากลับไปที่ Parent
          >
            <option>2561</option>
            <option>2562</option>
            <option>2563</option>
            <option>2564</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm mb-2">วันที่ตรวจรับ</label>
          <input
            type="date"
            className="w-full border-2 border-blue-100 rounded-md"
            value={value.date_received} // แสดงค่าปัจจุบันจาก Parent
            onChange={(e) => onChange('date_received', e.target.value)} // ส่งค่ากลับไปที่ Parent
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md"
            value={value.budget_type} // แสดงค่าปัจจุบันจาก Parent
            onChange={(e) => onChange('budget_type', e.target.value)} // ส่งค่ากลับไปที่ Parent
          >
            <option>เงินรายได้</option>
            <option>เงินงบประมาณ</option>
            <option>เงินสะสมคลัง</option>
            <option>เงินกันเหลือบปี</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">วงเงินงบประมาณ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            value={value.budget_limit} // แสดงค่าปัจจุบันจาก Parent
            onChange={(e) => onChange('budget_limit', e.target.value)} // ส่งค่ากลับไปที่ Parent
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            value={value.average_price} // แสดงค่าปัจจุบันจาก Parent
            onChange={(e) => onChange('average_price', e.target.value)} // ส่งค่ากลับไปที่ Parent
          />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;
