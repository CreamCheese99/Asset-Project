const AssetForm = () => {
    return (

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
          {/* <div>
            <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน </label>
            <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
          </div> */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">สถานะ</label>
            <select className="w-full border-2 border-blue-100 rounded-md">
              <option>ใช้งานได้</option>
              <option>เสียหาย</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default AssetForm;
  