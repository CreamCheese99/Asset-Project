import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb5 from "../components/Breadcrumb5";
import '../css/ShowInfo.css'; // Import the CSS file
import ActionButtons3 from '../components/ActionButtons3';

const ShowInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // เริ่มต้นด้วย null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const encodedId = encodeURIComponent(id);


  useEffect(() => {
    console.log("Fetching asset data for ID:", id); // Debug log

   
    const fetchAssetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mainasset/${encodedId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAssetData(); // ตรวจสอบว่า `id` มีค่าก่อนเรียก API
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(value);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="show-info-container">
      <Breadcrumb5 />
      <div className="container mx-auto p-4">
        {/* ส่วนกรอกข้อมูล */}
        <div className="asset-info-section">
          <h3 className="section-title">ข้อมูลครุภัณฑ์</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">รหัสทรัพย์สิน</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.main_asset_id || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">ภาควิชา</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.department_id || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">สภาพการครุภัณฑ์</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.status || ''}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* ส่วนวิธีการได้มา */}
        <div className="asset-info-section">
          <h3 className="section-title">วิธีการได้มา</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">ปีงบประมาณ</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.fiscal_year || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">วันที่ตรวจรับ</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.date_received || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">ประเภทเงิน</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.budget_type || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">วงเงินงบประมาณ</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.budget_limit || ''}
                readOnly
              />
            </div>
            <div>
              <label className="label">ราคากลาง</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.averange_price || ''}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* ส่วนรายละเอียดพัสดุ */}
        <div className="asset-info-section">
          <h3 className="section-title">รายละเอียดพัสดุ</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">ชื่อสินทรัพย์</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.main_asset_name || ''}
                readOnly
              />
            </div>

            <div>
              <label className="label">ประเภทสินทรัพย์</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.asset_type || ''}
                readOnly
              />
            </div>

            <div>
              <label className="label">สถานที่ใช้งาน</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.location_use || ''}
                readOnly
              />
            </div>

            <div>
              <label className="label">การใช้งาน</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.usage || ''}
                readOnly
              />
            </div>

            <div>
              <label className="label">สถานที่ส่งมอบ</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.location_deliver || ''}
                readOnly
              />
            </div>

            <div>
              <label className="label">ผู้รับผิดชอบ</label>
              <input
                type="text"
                className="input-field-show"
                value={data.mainAsset?.responsible_person || ''}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* ตารางแสดงข้อมูลพัสดุย่อย */}
        <div className="sub-assets-table">
          <h3 className="section-title">ข้อมูลพัสดุย่อย</h3>
          <table className="table-auto w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">รายการพัสดุย่อย</th>
                <th className="border px-4 py-2">ประเภทพัสดุ</th>
                <th className="border px-4 py-2">รายละเอียด</th>
                <th className="border px-4 py-2">ราคาต่อหน่วย</th>
                <th className="border px-4 py-2">จำนวน</th>
                <th className="border px-4 py-2">หน่วยนับ</th>
                <th className="border px-4 py-2">การใช้งาน</th>
                <th className="border px-4 py-2">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {data.subAssets?.length > 0 ? (
                data.subAssets.map((item) => (
                  <tr key={item.sub_asset_id} className="text-center">
                     <td className="border px-4 py-2">{item.sub_asset_name}</td>
                      <td className="border px-4 py-2">{item.type_sub_asset}</td>
                      <td className="border px-4 py-2">{item.details}</td>
                      <td className="border px-4 py-2">{formatCurrency(item.unit_price)}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">{item.counting_unit}</td>
                      <td className="border px-4 py-2">{item.status}</td>
                      <td className="border px-4 py-2">{item.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ActionButtons3 />
    </div>
  );
};

export default ShowInfo;
