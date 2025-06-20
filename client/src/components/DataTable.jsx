import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaFilePdf, FaSortUp, FaSortDown } from "react-icons/fa";
import API from "../API";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import THSarabunNew from "./fonts/THSarabunNew-normal";
import { logoImage } from "../image/logoBase64";

const DataTable = ({ data, filteredData, handleDelete }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userDeptId = localStorage.getItem("departmentId")?.trim();
    const token = localStorage.getItem("token");
    const userRoleId = localStorage.getItem("roleId");
    const userUserName = localStorage.getItem("userName");
    setRoleId(userRoleId);
    setUserName(userUserName);

    if (userDeptId && userRoleId !== "3") {
      API
        .get(`/department`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const department = response.data.find(
              (dept) => dept.department_id.toString() === userDeptId
            );
            if (department) {
              setDepartmentName(department.department_name);
            }
          }
        })
        .catch((error) => {
          console.error("ไม่สามารถดึงข้อมูลภาควิชาได้:", error);
        });
    }
  }, []);

  useEffect(() => {
    let displayData = filteredData && filteredData.length > 0 ? filteredData : data;

    if (roleId === "5") {
      displayData = displayData.filter((item) =>
        item.responsible_person
          ? item.responsible_person.trim() === userName.trim()
          : false
      );
    } else if (roleId !== "3" && departmentName) {
      displayData = displayData.filter(
        (item) => item.department_name === departmentName
      );
    }

    setDepartmentData(displayData);
  }, [data, filteredData, departmentName, roleId, userName]);

  const sortedData = [...departmentData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.fiscal_year - b.fiscal_year
      : b.fiscal_year - a.fiscal_year;
  });


  const exportPDF = async (mainAssetId) => {
    alert(`คุณต้องการส่งออกไฟล์ PDF สำหรับครุภัณย่อยฑ์ ของครุภัณฑ์รหัส ${mainAssetId}...`);

    const token = localStorage.getItem("token");
  
    try {
      const response = await API.get(`/subasset/${encodeURIComponent(mainAssetId)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const subAssets = response.data;
      if (!Array.isArray(subAssets) || subAssets.length === 0) {
        alert("ไม่พบข้อมูลครุภัณฑ์ย่อย ไม่สามารถสร้าง PDF ได้");
        console.error("ไม่พบข้อมูล sub-assets");
        return;
      }
  
  
      // if (!Array.isArray(subAssets) || subAssets.length === 0) {
      //   console.error("ไม่พบข้อมูล sub-assets");
      //   return;
      // }
  
      // Ensure that the data is well-structured before passing to autoTable
      const tableData = subAssets.map(item => [
        item.sub_asset_name || "-",
        item.details || "-",
        item.quantity || "-",
        item.unit_price || "-",
        item.counting_unit || "-",
        item.status || "-",
        item.type_sub_asset || "-",
        item.note || "-",
      
      ]);
  
      // Initialize jsPDF instance
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      

  
      doc.addFileToVFS("THSarabun.ttf", THSarabunNew);
      doc.addFont("THSarabun.ttf", "THSarabun", "normal");
      doc.setFont("THSarabun"); // ✅ ต้องมาก่อน
      doc.setFontSize(12); // ต้องตั้งหลัง setFont

      doc.setFont("THSarabun");
      doc.setFontSize(18); // ขนาดใหญ่ขึ้น
      
      
      // คำนวณความกว้างของหน้ากระดาษ
      const pageWidth = doc.internal.pageSize.getWidth();
      // 👉 เพิ่มโลโก้
      const imgWidth = 30; // กว้างภาพ
      const imgHeight = 30; // สูงภาพ
      const centerX = (pageWidth - imgWidth) / 2; // จัดกลาง

      doc.addImage(logoImage, 'PNG', centerX, 5, imgWidth, imgHeight); // วางไว้บนสุด
      
      // ข้อความหัวข้อ
      const title1 = `ข้อมูลครุภัณฑ์ย่อยของ รหัสครุภัณฑ์ ${mainAssetId}`;
      const title2 = `คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง`;
      
      // คำนวณตำแหน่ง X ให้อยู่กึ่งกลางหน้ากระดาษ
      const title1X = (pageWidth - doc.getTextWidth(title1)) / 2;
      const title2X = (pageWidth - doc.getTextWidth(title2)) / 2;
      
      // แสดงหัวข้อบน PDF โดยเว้นระยะระหว่างบรรทัดเล็กน้อย
      doc.text(title1, title1X, 42); // บรรทัดแรก
      doc.text(title2, title2X, 50); // บรรทัดที่สอง ห่างจากบรรทัดแรก
      // Configure autoTable with dynamic column widths and styling
      autoTable(doc, {
        startY: 60,
        head: [
          [
            "รายการพัสดุย่อย",
            "รายละเอียด",
            "จำนวน",
            "ราคาต่อหน่วย",
            "หน่วยนับ",
            "การใช้งาน",
            "ประเภทพัสดุ",
            "หมายเหตุ",
          
          ]
        ],
        body: tableData,
        styles: {
          font: "THSarabun",  // Use Thai font
          fontSize: 14,
        },
        headStyles: {
          font: "THSarabun",
          fontStyle: "normal",
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          halign: 'center'
        },
        bodyStyles: {
          font: "THSarabun",
          fontStyle: "normal",
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' },
          5: { cellWidth: 'auto' },
          6: { cellWidth: 'auto' },
          7: { cellWidth: 'auto' },
          8: { cellWidth: 'auto' },
        },
      });
  
      // Save PDF
      doc.save(`subasset_${mainAssetId}.pdf`);
  
    } catch (error) {
      console.error("ดึงข้อมูล sub-assets ไม่สำเร็จ:", error);
    }
  };
  
  


const exportPDFAllRow = () => {
  alert(`คุณต้องการส่งออกไฟล์ PDF สำหรับครุภัณฑ์หลัก`);
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  doc.addFileToVFS("THSarabun.ttf", THSarabunNew);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");
  doc.setFont("THSarabun");
  doc.setFontSize(12);


  
  const pageWidth = doc.internal.pageSize.getWidth();

    const tableData = departmentData.map((item) => [
    item.main_asset_id,
    item.main_asset_name,
    item.department_name || "-",
    item.asset_type || "-",
    item.responsible_person || "-",
    item.subamount || 0,
    item.budget_type || "-",
    item.fiscal_year || "-",
    item.status || "-",
  ]);
  
  // 👉 เพิ่มโลโก้
  const imgWidth = 30; // กว้างภาพ
  const imgHeight = 30; // สูงภาพ
  const centerX = (pageWidth - imgWidth) / 2; // จัดกลาง

  doc.addImage(logoImage, 'PNG', centerX, 5, imgWidth, imgHeight); // วางไว้บนสุด

  // 👉 ข้อความหัวกระดาษ
  const departmentText = `ข้อมูลรายการครุภัณฑ์ทั้งหมด ${departmentName}`;
  const facultyText = `คณะครุศาสตร์อุตสาหกรรมเเละเทคโนโลยี สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง`;

  const departmentX = (pageWidth - doc.getTextWidth(departmentText)) / 2;
  const facultyX = (pageWidth - doc.getTextWidth(facultyText)) / 2;

  doc.setFont("THSarabun");
  doc.setFontSize(16);
  doc.text(departmentText, departmentX, 42); // ขยับลงมา หลังรูป
  doc.text(facultyText, facultyX, 50);

  // 👉 ตาราง
  autoTable(doc, {
    startY: 60, // ขยับตามความสูงของโลโก้ + ข้อความ
    head: [[
            "รหัสทรัพย์สิน",
            "ชื่อทรัพย์สิน",
            "ภาควิชา",
            "ประเภทสินทรัพย์",
            "ผู้รับผิดชอบ",
            "จำนวน",
            "ประเภทเงิน",
            "ปีงบประมาณ",
            "สภาพการครุภัณฑ์",
          ]],
          body: tableData,
          styles: {
            font: "THSarabun",  // Use Thai font
            fontSize: 12,
          },
          headStyles: {
            font: "THSarabun",
            fontStyle: "normal",
            fillColor: [230, 230, 230],
            textColor: [0, 0, 0],
            halign: 'left'
          },
          bodyStyles: {
            font: "THSarabun",
            fontStyle: "normal",
            halign: 'left'
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 'auto' },
            3: { cellWidth: 'auto' },
            4: { cellWidth: 'auto' },
            5: { cellWidth: 'auto' },
            6: { cellWidth: 'auto' },
            7: { cellWidth: 'auto' },
            8: { cellWidth: 'auto' },
          },
        });
      
        doc.save(`mainasset_${departmentName}.pdf`);
      };

  
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
      <div className="flex justify-between items-center mb-4 space-x-2">
          <button
            onClick={exportPDFAllRow}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <FaFilePdf />
            <span>PDF</span>
          </button>
       </div>
  
      {departmentData.length > 0 ? (
        
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
              <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
             {/* <th className="border px-4 py-2">รหัสภาควิชา</th> */}
              <th className="border px-4 py-2">ภาควิชา</th>
              <th className="border px-4 py-2">ประเภทสินทรัพย์</th>
              <th className="border px-4 py-2">ผู้รับผิดชอบ</th>
              <th className="border px-4 py-2">จำนวน</th>
              <th className="border px-4 py-2">ประเภทเงิน</th>
              <th className="border px-4 py-2 cursor-pointer flex items-center justify-center" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                ปีงบประมาณ
                {sortOrder === "asc" ? (
                  <FaSortUp className="ml-2" />
                ) : (
                  <FaSortDown className="ml-2" />
                )}
              </th>
              <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
              <th className="border px-4 py-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลที่เกี่ยวข้องกับภาควิชาของคุณ
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.main_asset_id} className="text-center">
                  <td className="border px-4 py-2">{item.main_asset_id}</td>
                  <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
                  {/* <td className="border px-4 py-2">{item.department_id || "-"}</td> */}
                  <td className="border px-4 py-2">{item.department_name || "-"}</td>
                  <td className="border px-4 py-2">{item.asset_type || "-"}</td>
                  <td className="border px-4 py-2">{item.responsible_person || "-"}</td>
                  <td className="border px-4 py-2">{item.subamount || 0}</td>
                  <td className="border px-4 py-2">{item.budget_type || "-"}</td>
                  <td className="border px-4 py-2">{item.fiscal_year || "-"}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <Link to={`/show-info/${encodeURIComponent(item.main_asset_id)}`} className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-lg p-2">
                      <FaEye />
                    </Link>
                    <Link to={`/edit-info/${encodeURIComponent(item.main_asset_id)}`} className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2">
                      <FaEdit />
                    </Link>
                    <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg p-2" onClick={() => handleDelete(item.main_asset_id)}>
                      <FaTrash />
                    </button>
                    <button className="text-green-500 hover:text-green-700 bg-gray-200 rounded-lg p-2" onClick={() => exportPDF(item.main_asset_id)}>
                      <FaFilePdf />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>ไม่มีข้อมูลให้แสดง</p>
      )}
    </div>
  );
};

export default DataTable;

