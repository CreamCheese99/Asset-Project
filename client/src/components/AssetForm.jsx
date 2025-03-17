// const AssetForm = () => {
//     return (

//       <div className="bg-white mt-4 p-4 rounded-md shadow-md">
//         <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
//             <input
//               type="text"
//               className="w-full border-2 border-blue-100 rounded-md "
//               placeholder="สมอ.xxx-xxx-xxxx/61"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
//             <select className="w-full border-2 border-blue-100 rounded-md">
//                 <option>ครุศาสตร์อุตสาหกรรม</option>
//                 <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
//                 <option>ครุศาสตร์วิศวกรรม</option>
//                 <option>ครุศาสตร์การเกษาตร</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
//             <select className="w-full border-2 border-blue-100 rounded-md">
//               <option>ใช้งาน</option>
//               <option>ส่งซ่อม</option>
//               <option>ชำรุด</option>
//               <option>บริจาค/โอน</option>
//               <option>รับโอน</option>
//               <option>จำหน่าย</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default AssetForm;


const AssetForm = ({ value, onChange }) => {
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md p-2"
            placeholder="สมอ.xxx-xxx-xxxx/61"
            value={value.main_asset_ID || ''} // ✅ ป้องกัน undefined
            onChange={(e) => onChange('main_asset_ID', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md p-2"
            value={value.department || ''} // ✅ ป้องกัน undefined
            onChange={(e) => onChange('department', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> {/* ✅ เพิ่ม option ค่าเริ่มต้น */}
            <option>ครุศาสตร์อุตสาหกรรม</option>
            <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
            <option>ครุศาสตร์วิศวกรรม</option>
            <option>ครุศาสตร์การเกษตร</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md p-2"
            value={value.status || ''} // ✅ ป้องกัน undefined
            onChange={(e) => onChange('status', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> {/* ✅ เพิ่ม option ค่าเริ่มต้น */}
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
  );
};

export default AssetForm;
