const ActionButtons2 = ({ onSave, onCancel }) => {
  return (
    <div className="flex justify-end space-x-4 mt-4">
      <button
        onClick={onSave} // กดแล้วเรียก handleSave
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        บันทึก
      </button>
      <button
        onClick={onCancel} // กดแล้วเรียก handleCancel
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        ยกเลิก
      </button>
    </div>
  );
};

export default ActionButtons2;
