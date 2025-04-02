// import React from "react";
// import "../css/AcquisitionInfo.css";  // ใช้เส้นทางที่ถูกต้อง

// const AcquisitionInfo = ({ value, onChange }) => {



//   return (
//     <div className="acquisition-container">
//       <h3 className="acquisition-title">วิธีการได้มา</h3>
//       <div className="grid-2-cols">
//         <div>
//           <label className="acquisition-label">ปีงบประมาณ</label>
//           <select
//             className="acquisition-select"
//             value={value.fiscal_year || ''} 
//             onChange={(e) => onChange('fiscal_year', e.target.value)}
//           >
//             <option value="">-- กรุณาเลือก --</option> 
//             <option>2561</option>
//             <option>2562</option>
//             <option>2563</option>
//             <option>2564</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="acquisition-label">วันที่ตรวจรับ</label>
//           <input
//             type="date"
//             className="acquisition-input"
//             value={value.date_received || ''} 
//             onChange={(e) => onChange('date_received', e.target.value)}
//           />
//         </div>

        

//         <div>
//           <label className="acquisition-label">ประเภทเงิน</label>
//           <select
//             className="acquisition-select"
//             value={value.budget_type || ''} 
//             onChange={(e) => onChange('budget_type', e.target.value)}
//           >
//             <option value="">-- กรุณาเลือก --</option> 
//             <option>เงินรายได้</option>
//             <option>เงินงบประมาณ</option>
//             <option>เงินสะสมคลัง</option>
//             <option>เงินกันเหลือบปี</option>
//           </select>
//         </div>

//         <div>
//           <label className="acquisition-label">วงเงินงบประมาณ</label>
//           <input
//             type="text"
//             className="acquisition-input"
//             value={value.budget_limit || ''} 
//             onChange={(e) => onChange('budget_limit', e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="acquisition-label">ราคากลาง</label>
//           <input
//             type="text"
//             className="acquisition-input"
//             value={value.averange_price || ''} 
//             onChange={(e) => onChange('averange_price', e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcquisitionInfo;






import React from "react";
import "../css/AcquisitionInfo.css";

const AcquisitionInfo = ({ value, onChange }) => {
  // ฟังก์ชันแปลงจาก yyyy-mm-dd → dd/mm/yyyy (แสดงผล)
  const formatDateToDisplay = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // ฟังก์ชันแปลงจาก dd/mm/yyyy → yyyy-mm-dd (เก็บค่า)
  const formatDateToISO = (displayDate) => {
    if (!displayDate) return "";
    const [day, month, year] = displayDate.split("/");
    return `${year}-${month}-${day}`;
  };

  // Handle เมื่อค่าของวันที่เปลี่ยน
  const handleDateChange = (e) => {
    const isoDate = e.target.value; // ได้ค่า yyyy-mm-dd
    onChange("date_received", isoDate); // เก็บเป็น ISO format
  };


  // แปลงเป็นตัวเลขที่อ่านง่าย เช่น 1000000 → "1,000,000"
const formatCurrency = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // ใส่เครื่องหมายจุลภาคทุก 3 หลัก
};

// เมื่อมีการกรอกค่าใหม่ จะแปลงกลับเป็นตัวเลขเพื่อนำไปใช้ต่อ
const handleBudgetChange = (input) => {
  const rawValue = input.replace(/,/g, ""); // ลบเครื่องหมายจุลภาคออก
  onChange("budget_limit", rawValue); // ส่งค่าเป็นตัวเลขกลับไปเก็บ
};

// เมื่อมีการกรอกค่าใหม่ จะแปลงกลับเป็นตัวเลขเพื่อนำไปใช้ต่อ
const handleAverangeChange = (input) => {
  const rawValue = input.replace(/,/g, ""); // ลบเครื่องหมายจุลภาคออก
  onChange("averange_price", rawValue); // ส่งค่าเป็นตัวเลขกลับไปเก็บ
};




  return (
    <div className="acquisition-container">
      <h3 className="acquisition-title">วิธีการได้มา</h3>
      <div className="grid-2-cols">
        <div>
          <label className="acquisition-label">ปีงบประมาณ</label>
          <select
            className="acquisition-select"
            value={value.fiscal_year || ""}
            onChange={(e) => onChange("fiscal_year", e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            <option>2561</option>
            <option>2562</option>
            <option>2563</option>
            <option>2564</option>
          </select>
        </div>

        {/* วันที่ตรวจรับ */}
        <div>
          <label className="acquisition-label">วันที่ตรวจรับ</label>
          <input
            type="date"
            className="acquisition-input"
            value={value.date_received || ""}
            onChange={handleDateChange}
          />
          <p className="text-gray-500 text-sm mt-1">
            แสดงผล: {formatDateToDisplay(value.date_received)}
          </p>
        </div>

        <div>
          <label className="acquisition-label">ประเภทเงิน</label>
          <select
            className="acquisition-select"
            value={value.budget_type || ""}
            onChange={(e) => onChange("budget_type", e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            <option>เงินรายได้</option>
            <option>เงินงบประมาณ</option>
            <option>เงินสะสมคลัง</option>
            <option>เงินกันเหลือบปี</option>
          </select>
        </div>

        {/* <div>
          <label className="acquisition-label">วงเงินงบประมาณ</label>
          <input
            type="text"
            className="acquisition-input"
            value={value.budget_limit || ""}
            onChange={(e) => onChange("budget_limit", e.target.value)}
          />
        </div> */}

        <div>
          <label className="acquisition-label">วงเงินงบประมาณ</label>
          <input
            type="text"
            className="acquisition-input" // ชิดขวาเพื่อให้อ่านง่ายขึ้น
            value={formatCurrency(value.budget_limit)}
            onChange={(e) => handleBudgetChange(e.target.value)}
          />
        </div>


        <div>
          <label className="acquisition-label">ราคากลาง</label>
          <input
            type="text"
            className="acquisition-input"
            value={formatCurrency(value.averange_price)}
            onChange={(e) => handleAverangeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;
