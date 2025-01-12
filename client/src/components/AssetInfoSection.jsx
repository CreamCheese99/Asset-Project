import React from "react";

const AssetInfoSection = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 mt-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4"></h3>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">ไม่พบข้อมูล</p>
        
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">หมายเลขครุภัณฑ์ </th>
            <th className="border border-gray-300 px-4 py-2">หมายเลขครุภัณฑ์</th>
            <th className="border border-gray-300 px-4 py-2">รายการ</th>
            <th className="border border-gray-300 px-4 py-2">มูลค่าลูกทรัพย์</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="4">
              ไม่พบข้อมูล
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssetInfoSection;
