import React from 'react'
import { useNavigate } from "react-router-dom";

function ActionButtonsstatus() {

    const navigate = useNavigate();

  const handleStatuspage = () => {
    navigate("/status"); // เปลี่ยนเส้นทางไปยังหน้าถัดไป
  };
  return (
    <button onClick={handleStatuspage}>
      ไปหน้าถัดไป
    </button>
  )
}

export default ActionButtonsstatus

