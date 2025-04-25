import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
// import { useReactToPrint } from "react-to-print";

// const ActionButtons = ({ data, roleId, printRef }) => { 
  const ActionButtons = ({ data, roleId,  }) => { 
  const navigate = useNavigate();

  if (roleId !== '3') return null;

  const handleAddClick = () => {
    navigate("/add-asset");
  };

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: "รายการครุภัณฑ์",
  //   onAfterPrint: () => alert("พิมพ์เรียบร้อยแล้ว!"),
  // });
  

  return (
    <div className="mt-10 flex justify-end space-x-4">
      <button className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-400" onClick={handleAddClick}>
        เพิ่มครุภัณฑ์หลัก
      </button>
      {/* <button className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-400" onClick={handlePrint}>
        <FaFilePdf size={20} />
      </button> */}
    </div>
  );
};

export default ActionButtons;