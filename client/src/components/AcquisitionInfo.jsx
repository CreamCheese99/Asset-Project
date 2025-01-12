const AcquisitionInfo = () => {
    return (
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
            <label className="block text-gray-700 text-sm mb-2">โครงการ</label>
            <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2">วันที่ตรวจรับ</label>
            <input type="date" className="w-full border-2 border-blue-100 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2">ประเภทงบประมาณ</label>
            <select className="w-full border-2 border-blue-100 rounded-md">
              <option>ครุภัณฑ์</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default AcquisitionInfo;
  