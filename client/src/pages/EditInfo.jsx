import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Breadcrumb7 from '../components/Breadcrumb7';

const EditInfo = () => {
  const { main_asset_id } = useParams(); // ดึง main_asset_id จาก URL
  const history = useHistory(); // สำหรับการนำทางหลังจากการบันทึกข้อมูล
  const [assetData, setAssetData] = useState({
    main_asset_id: '',
    main_asset_name: '',
    status: '',
    fiscal_year: '',
    date_received: '',
    budget_limit: '',
    averange_price: '',
    budget_type: '',
    location_use: '',
    location_deliver: '',
    usage: '',
    responsible_person: '',
    sub_asset_name: '',
    asset_type: '',
    details: '',
    quantity: '',
    unit_price: '',
    counting_unit: '',
    department_id: ''
  });

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูล asset ที่จะทำการแก้ไข
    const fetchAssetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mainasset/${main_asset_id}`);
        setAssetData(response.data);
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };
    fetchAssetData();
  }, [main_asset_id]);

  // ฟังก์ชันอัปเดตค่าใน state
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // ฟังก์ชันแจ้งเตือน
  const handleAlert = (message, type = "error") => {
    alert(message); // ใช้ alert เพื่อแสดงข้อความ
  };

  const handleSubmit = async () => {
    // ตรวจสอบว่า main_asset_id มีค่าหรือไม่
    if (!assetData.main_asset_id) {
      handleAlert('กรุณากรอก main_asset_id');
      return;
    }

    try {
      // อัปเดตข้อมูล Main Asset
      const mainAssetResponse = await axios.put(`http://localhost:5000/mainasset/${main_asset_id}`, assetData);
      console.log('อัปเดตข้อมูล mainasset สำเร็จ:', mainAssetResponse.data);

      // อัปเดตข้อมูล Sub Asset (ถ้ามี)
      if (assetData.sub_asset_name) {
        const subAssetData = {
          sub_asset_name: assetData.sub_asset_name,
          quantity: assetData.quantity,
          unit_price: assetData.unit_price,
          counting_unit: assetData.counting_unit,
          details: assetData.details,
          main_asset_id: assetData.main_asset_id, // การเชื่อมโยงกับ main asset
        };

        const subAssetResponse = await axios.put(`http://localhost:5000/api/subasset/${assetData.main_asset_id}`, subAssetData);
        console.log('อัปเดตข้อมูล subasset สำเร็จ:', subAssetResponse.data);
      }

      handleAlert('อัปเดตข้อมูลสำเร็จ!', "success");
      history.push(`/asset/${main_asset_id}`); // นำทางไปยังหน้ารายละเอียดของ asset

    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      handleAlert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล!');
    }
  };

  // Handle cancel (reset form)
  const handleCancel = () => {
    setAssetData({
      main_asset_id: '',
      main_asset_name: '',
      status: '',
      fiscal_year: '',
      date_received: '',
      budget_limit: '',
      averange_price: '',
      budget_type: '',
      location_use: '',
      location_deliver: '',
      usage: '',
      responsible_person: '',
      sub_asset_name: '',
      asset_type: '',
      details: '',
      quantity: '',
      unit_price: '',
      counting_unit: '',
      department_id: ''
    });
  };
  return (
    <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
      <Breadcrumb7 />
      <div className="container mx-auto p-4">

        {/* Form for editing asset */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>

          <form onSubmit={handleSubmit}>
            {/* Asset Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={value.main_asset_id || ''}
                  onChange={(e) => onChange('main_asset_id', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
                <select
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={value.department_id || ''}
                  onChange={(e) => onChange('department_id', e.target.value)}
                >
                  <option value="">-- กรุณาเลือก --</option>
                  {Array.isArray(data.departments) && data.departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
                <select
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={value.status || ''}
                  onChange={(e) => onChange('status', e.target.value)}
                >
                  <option value="">-- กรุณาเลือก --</option>
                  <option>ใช้งาน</option>
                  <option>ส่งซ่อม</option>
                  <option>ชำรุด</option>
                  <option>บริจาค/โอน</option>
                  <option>รับโอน</option>
                  <option>จำหน่าย</option>
                </select>
              </div>
            </div>

            {/* Additional fields */}
            <div className="bg-white mt-4 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">ปีงบประมาณ</label>
                  <select
                    className="w-full border-2 border-blue-100 rounded-xl p-2"
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
                    className="w-full border-2 border-blue-100 rounded-xl p-2"
                    value={value.date_received || ''}
                    onChange={(e) => onChange('date_received', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
                  <select
                    className="w-full border-2 border-blue-100 rounded-xl p-2"
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
                    className="w-full border-2 border-blue-100 rounded-xl p-2"
                    value={value.budget_limit || ''}
                    onChange={(e) => onChange('budget_limit', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-xl p-2"
                    value={value.averange_price || ''}
                    onChange={(e) => onChange('averange_price', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
              >
                อัพเดตข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
