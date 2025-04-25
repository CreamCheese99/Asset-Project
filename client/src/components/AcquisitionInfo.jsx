import React from "react";
import "../css/AcquisitionInfo.css";

const AcquisitionInfo = ({ value, onChange }) => {
  // ฟังก์ชันแปลงจาก yyyy-mm-dd → dd/mm/yyyy (แสดงผล)
  const formatDateToDisplay = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // ฟังก์ชันแปลงเป็นตัวเลขที่อ่านง่าย เช่น 1000000 → "1,000,000"
  const formatCurrency = (num) => {
    if (!num) return "";
    return Number(num).toLocaleString("th-TH");
  };
  
  const formatMillionBaht = (num) => {
    if (!num || isNaN(num)) return "";
    const million = parseFloat(num) / 1_000_000;
    return `${million.toFixed(2)} ล้านบาท`;
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
          <input
            type="number"
            className="acquisition-select"
            value={value.fiscal_year || ""}
            onChange={(e) => onChange("fiscal_year", e.target.value)}
            placeholder="กรอกปี พ.ศ"
            min="2500"
            max="2700"
          />
        </div>

        {/* วันที่ตรวจรับ */}
        <div>
          <label className="acquisition-label">วันที่ตรวจรับ</label>
          <input
            type="date"
            className="acquisition-input"
            value={value.date_received || ""}
            onChange={(e) => onChange("date_received", e.target.value)}
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

        <div>
          <label className="acquisition-label">วงเงินงบประมาณ (บาท)</label>
          <input
            type="text"
            className="acquisition-input"
            value={formatCurrency(value.budget_limit)} // ใช้ฟังก์ชัน formatCurrency ใส่จุลภาค
            onChange={(e) => handleBudgetChange(e.target.value)} // ส่งค่าเป็นตัวเลขโดยลบจุลภาค
            placeholder="กรอกจำนวนเงิน (บาท)"
          />
          <p className="text-gray-500 text-sm mt-1">
            {formatMillionBaht(value.budget_limit)} {/* แสดงผลเป็นล้านบาท */}
          </p>
        </div>

        <div>
          <label className="acquisition-label">ราคากลาง (บาท)</label>
          <input
            type="text"
            className="acquisition-input"
            value={formatCurrency(value.averange_price)} // ใช้ฟังก์ชัน formatCurrency ใส่จุลภาค
            onChange={(e) => handleAverangeChange(e.target.value)} // ส่งค่าเป็นตัวเลขโดยลบจุลภาค
            placeholder="กรอกจำนวนเงิน (บาท)"
          />
          <p className="text-gray-500 text-sm mt-1">
            {formatMillionBaht(value.averange_price)} {/* แสดงผลเป็นล้านบาท */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;
