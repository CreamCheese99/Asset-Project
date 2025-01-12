import React from 'react'
import TableRow from './TableRow'

export default function showAsset() {
  return (
      <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="font-prompt md:container md:mx-auto w-1/2 p-8 text-left">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">ข้อมูลพัสดุย่อย</h2>
                  <table className="border-collapse table-auto w-full border border-gray-300 rounded-lg text-center bg-white">
                    <thead className="bg-gray-100 rounded-t-lg">
                      <tr>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">ลำดับ</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">รหัสพัสดุย่อย</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">พัสดุหลัก</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">จำนวนพัสดุย่อย</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">สถานที่ใช้งาน</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">สภาพใช้งาน</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">ราคา/หน่วย</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">อายุการใช้งาน</th>
                        <th className="p-3 border text-base border-gray-300 text-gray-700">สาเหตุเลิกใช้งาน</th>
                      </tr>
                    </thead>
                    <tbody>
                     {/* Example row, replace with dynamic rows */}
                   <TableRow index={1} subCode="SC001" mainItem="พัสดุหลัก 1" quantity={10} location="อาคาร A" condition="ดี" price={500} lifespan="5 ปี" reason="ไม่มีการใช้งาน" />
                     {/* Add more TableRow components as needed or dynamically generate them */}
                    </tbody>
                   </table>
               </div>
            </div>
          </main>
  )
}
