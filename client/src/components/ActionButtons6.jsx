import React from 'react';

function ActionButtons6({ roleId, onEdit, onSave, isClicked }) {
  // ตรวจสอบว่า roleId ไม่ใช่ 3 จะไม่แสดงปุ่ม
  if (roleId !== 3) {
    return null; // ❌ ไม่มีสิทธิ์ => ไม่แสดง component นี้
  }

  return (
    <div className="flex justify-end space-x-4">
      <button
        className={`px-4 py-2 mt-4 rounded-xl text-white ${
          isClicked ? 'bg-orange-500' : 'bg-gray-300 hover:bg-orange-500 active:bg-orange-700'
        }`}
        onClick={onEdit}
      >
        แก้ไข
      </button>
      <button
        className="bg-blue-400 text-white px-4 py-2 mt-4 rounded-xl hover:bg-blue-700 text-right"
        onClick={onSave}
      >
        บันทึก
      </button>
    </div>
  );
}

export default ActionButtons6;
