import React from "react";
import "../css/AcquisitionInfo.css";  // ใช้เส้นทางที่ถูกต้อง

const AcquisitionInfo = ({ value, onChange }) => {
  return (
    <div className="acquisition-container">
      <h3 className="acquisition-title">วิธีการได้มา</h3>
      <div className="grid-2-cols">
        <div>
          <label className="acquisition-label">ปีงบประมาณ</label>
          <select
            className="acquisition-select"
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
          <label className="acquisition-label">วันที่ตรวจรับ</label>
          <input
            type="date"
            className="acquisition-input"
            value={value.date_received || ''} 
            onChange={(e) => onChange('date_received', e.target.value)}
          />
        </div>

        <div>
          <label className="acquisition-label">ประเภทเงิน</label>
          <select
            className="acquisition-select"
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
          <label className="acquisition-label">วงเงินงบประมาณ</label>
          <input
            type="text"
            className="acquisition-input"
            value={value.budget_limit || ''} 
            onChange={(e) => onChange('budget_limit', e.target.value)}
          />
        </div>

        <div>
          <label className="acquisition-label">ราคากลาง</label>
          <input
            type="text"
            className="acquisition-input"
            value={value.averange_price || ''} 
            onChange={(e) => onChange('averange_price', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionInfo;
