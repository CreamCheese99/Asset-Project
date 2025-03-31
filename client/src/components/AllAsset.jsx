// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const AllAsset = () => {
//   const [searchTerm, setSearchTerm] = useState("");  // State for search input
//   const [assets, setAssets] = useState([]);  // State for assets data
//   const [loading, setLoading] = useState(true);  // State for loading status
//   const [error, setError] = useState(null);  // State for error handling

//   // Fetch assets data from the API
//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/mainasset');
        
//         if (!response.ok) {
//           throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์');
//         }

//         const data = await response.json();
        
//         // ตรวจสอบว่า data เป็นอาเรย์ก่อน
//         if (Array.isArray(data)) {
//           setAssets(data);  // Set fetched data to state
//         } else {
//           throw new Error('ข้อมูลที่ได้รับไม่ถูกต้อง');
//         }
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//         setError(error.message);  // Set error message
//       } finally {
//         setLoading(false);  // Set loading to false once data is fetched
//       }
//     };

//     fetchAssets();
//   }, []);

//   // Filter assets based on search term
//   const filteredData = assets.filter(
//     (item) =>
//       item.main_asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.sub_asset_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-50 py-6 px-4 min-h-screen mt-4 p-4 rounded-xl ">
//       <div className="container mx-auto">
//         {/* Search input */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="ค้นหาจากชื่อทรัพย์สินหรือรหัสทรัพย์สิน"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="text-center text-red-500">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Asset list */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
//           ) : filteredData.length > 0 ? (
//             filteredData.map((item) => (
//               <div key={item.main_asset_id} className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden">
//                 {/* Image */}
//                 <img src="https://via.placeholder.com/400x300" alt={item.main_asset_name} className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-gray-700">
//                     {item.main_asset_name}
//                   </h2>
//                   <p className="text-sm text-gray-500 mb-2">{item.main_asset_id}</p>
//                   <div className="text-sm text-gray-600">
//                     <p>สถานะ: {item.status}</p>
//                     <p>ชื่อทรัพย์: {item.main_asset_name}</p>
//                     <p>สถานะท: {item.main_asset_status}</p>
//                   </div>
//                   <div className="mt-4">
//                     <Link
//                       to={`/show-info/${item.main_asset_id}`} 
//                       className="block w-full text-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
//                     >
//                       ดูรายละเอียด
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllAsset;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllAsset = ({ filters }) => {
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const [assets, setAssets] = useState([]);  // State for assets data
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal
  const [selectedImage, setSelectedImage] = useState("");  // State to store the selected image for modal

  // Fetch assets data from the API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mainasset-assetlist');
        
        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์');
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          setAssets(data);  // Set fetched data to state
        } else {
          throw new Error('ข้อมูลที่ได้รับไม่ถูกต้อง');
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
        setError(error.message);  // Set error message
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchAssets();
  }, []);

  // Filter assets based on search term and filters props
  const filteredAssets = assets.filter(asset => {
    const matchesFilters = 
      (filters.main_asset_id ? asset.main_asset_id.includes(filters.main_asset_id) : true) &&
      (filters.department_id ? asset.department_id === filters.department_id : true) &&
      (filters.usage ? asset.usage === filters.usage : true) &&
      (filters.asset_type ? asset.asset_type === filters.asset_type : true) &&
      (filters.budget_type ? asset.budget_type === filters.budget_type : true);

    const matchesSearchTerm =
      asset.main_asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.sub_asset_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilters && matchesSearchTerm;  // Only include assets that match both filters and search term
  });

  // Handle opening the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(""); // Clear selected image
  };

  return (
    <div className="bg-gray-50 py-6 px-4 min-h-screen mt-4 p-4 rounded-xl ">
      <div className="container mx-auto">
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาจากชื่อทรัพย์สินหรือรหัสทรัพย์สิน"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Asset list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
          ) : filteredAssets.length > 0 ? (
            filteredAssets.map((item) => (
              <div key={item.main_asset_id} className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden">
                {/* Image */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-4">
                  {/* รูปภาพ */}
                  {item.image1 && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image1}`}  // URL รูปภาพจากฐานข้อมูล
                      alt={item.main_asset_name}
                      className="w-full h-48 object-cover rounded-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image1)} // เปิดโมดัลเมื่อคลิก
                    />
                  )}
                  {item.image2 && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image2}`}  // URL รูปภาพจากฐานข้อมูล
                      alt={item.main_asset_name}
                      className="w-full h-48 object-cover rounded-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image2)} // เปิดโมดัลเมื่อคลิก
                    />
                  )}
                  {item.image3 && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image3}`}  // URL รูปภาพจากฐานข้อมูล
                      alt={item.main_asset_name}
                      className="w-full h-48 object-cover rounded-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image3)} // เปิดโมดัลเมื่อคลิก
                    />
                  )}
                  {item.image4 && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image4}`}  // URL รูปภาพจากฐานข้อมูล
                      alt={item.main_asset_name}
                      className="w-full h-48 object-cover rounded-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image4)} // เปิดโมดัลเมื่อคลิก
                    />
                  )}
                  {item.image5 && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image5}`}  // URL รูปภาพจากฐานข้อมูล
                      alt={item.main_asset_name}
                      className="w-full h-48 object-cover rounded-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(item.image5)} // เปิดโมดัลเมื่อคลิก
                    />
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.main_asset_name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{item.main_asset_id}</p>
                  <div className="text-sm text-gray-600">
                    <p>สภาพการครุภัณฑ์: {item.status}</p>
                    <p>ชื่อทรัพย์: {item.main_asset_name}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/show-info/${encodeURIComponent(item.main_asset_id)}`} 
                      className="block w-full text-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
          )}
        </div>
      </div>

      {/* Modal for showing selected image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-4xl">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>
            <img
              src={`http://localhost:5000/uploads/${selectedImage}`} // รูปที่ถูกเลือกจากฐานข้อมูล
              alt="Selected asset"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAsset;
