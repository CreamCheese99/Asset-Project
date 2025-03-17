// const AcquisitionInfo = () => {
//     return (
//       <div className="bg-white mt-4 p-4 rounded-md shadow-md">
//         <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ปีงบประมาณ</label>
//             <select className="w-full border-2 border-blue-100 rounded-xl p-2">
//               <option>2561</option>
//             </select>
//           </div>
        
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">วันที่ตรวจรับ</label>
//             <input type="date" className="w-full border-2 border-blue-100 rounded-xl p-2" />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
//             <select className="w-full border-2 border-blue-100 rounded-xl p-2">
//             <option>เงินรายได้</option>
//             <option>เงินงบประมาณ</option>
//             <option>เงินสะสมคลัง</option>
//             <option>เงินกันเหลือบปี</option>
//             </select>
            
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">วงเงินงบประมาณ</label>
//             <input type="text" className="w-full border-2 border-blue-100 rounded-xl p-2" />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
//             <input type="text" className="w-full border-2 border-blue-100 rounded-xl p-2" />
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
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.fiscal_year || ''} 
            onChange={(e) => onChange('fiscal_year', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> 
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
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.date_received || ''} 
            onChange={(e) => onChange('date_received', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
          <select
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.budget_type || ''} 
            onChange={(e) => onChange('budget_type', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> 
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
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.budget_limit || ''} 
            onChange={(e) => onChange('budget_limit', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.averange_price || ''} 
            onChange={(e) => onChange('averange_price', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;
