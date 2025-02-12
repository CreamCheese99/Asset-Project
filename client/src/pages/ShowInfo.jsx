import React, { useState, useEffect } from "react";
import Breadcrumb5 from "../components/Breadcrumb5";

const ShowInfo = () => {
  const [data, setData] = useState([]);

  // จำลองข้อมูล (หรือโหลดจาก API แทน)
  useEffect(() => {
    setData([
      {
        id: 1,
        subasset: "คอมพิวเตอร์",
        type: "อุปกรณ์ IT",
        detail: "เครื่องคอมพิวเตอร์พร้อมอุปกรณ์",
        price: 15000,
        quantity: 5,
        unit: "เครื่อง",
        status: "ใช้งาน",
      },
    ]);
  }, []);

  return (
    <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
      <Breadcrumb5 />
      <div className="container mx-auto p-4">
        {/* ส่วนกรอกข้อมูล */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
                    <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md "
                    placeholder="สมอ.xxx-xxx-xxxx/61"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
                    <select className="w-full border-2 border-blue-100 rounded-md">
                        <option>ครุศาสตร์อุตสาหกรรม</option>
                        <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
                        <option>ครุศาสตร์วิศวกรรม</option>
                        <option>ครุศาสตร์การเกษาตร</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
                    <select className="w-full border-2 border-blue-100 rounded-md">
                    <option>ใช้งาน</option>
                    <option>ส่งซ่อม</option>
                    <option>ชำรุด</option>
                    <option>บริจาค/โอน</option>
                    <option>รับโอน</option>
                    <option>จำหน่าย</option>
                    </select>
                 </div>
            </div>
        </div>


        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-2">ปีงบประมาณ</label>
                    <select className="w-full border-2 border-blue-100 rounded-md">
                    <option>2561</option>
                    </select>
                </div>
            
                <div>
                    <label className="block text-gray-700 text-sm mb-2">วันที่ตรวจรับ</label>
                    <input type="date" className="w-full border-2 border-blue-100 rounded-md" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
                    <select className="w-full border-2 border-blue-100 rounded-md">
                    <option>เงินรายได้</option>
                    <option>เงินงบประมาณ</option>
                    <option>เงินสะสมคลัง</option>
                    <option>เงินกันเหลือมปี</option>
                    </select>
                    
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2">วงเงินงบประมาณ</label>
                    <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2">ราคากลาง</label>
                    <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
                </div>
            </div>
        </div>


        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดพัสดุ</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm text-gray-700 mb-2">ประเภทพัสดุ</label>
                <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md"
                    placeholder="กรอกชื่อประเภทพัสดุ"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-700 mb-2">สถานที่ใช้งาน</label>
                <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md"
                    placeholder="สถานที่ใช้งาน"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-700 mb-2">การใช้งาน</label>
                <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md"
                    placeholder="การใช้งาน"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-700 mb-2">สถานที่ส่งมอบ</label>
                <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md"
                    placeholder="สถานที่ส่งมอบ"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-700 mb-2">ผู้รับผิดชอบ</label>
                <input
                    type="text"
                    className="w-full border-2 border-blue-100 rounded-md"
                    placeholder="ผู้รับผิดชอบ"
                />
                </div>
            </div>  
        </div>

        {/* ตารางแสดงข้อมูลพัสดุย่อย */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
          <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
          <table className="table-auto w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">รายการพัสดุย่อย</th>
                <th className="border px-4 py-2">ประเภท</th>
                <th className="border px-4 py-2">รายละเอียด</th>
                <th className="border px-4 py-2">ราคาต่อหน่วย</th>
                <th className="border px-4 py-2">จำนวน</th>
                <th className="border px-4 py-2">หน่วยนับ</th>
                <th className="border px-4 py-2">การใช้งาน</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border px-4 py-2">{item.subasset}</td>
                    <td className="border px-4 py-2">{item.type}</td>
                    <td className="border px-4 py-2">{item.detail}</td>
                    <td className="border px-4 py-2">{item.price.toFixed(2)}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.unit}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;
