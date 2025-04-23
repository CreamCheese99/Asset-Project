import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb7 from "../components/Breadcrumb7";
import ActionButtons3 from "../components/ActionButtons3";
import { FaEdit, FaTrash } from "react-icons/fa";
const EditInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // State สำหรับจัดการ subasset (เพิ่ม, แก้ไข, ลบ)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newSubasset, setNewSubasset] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTypeSubAsset, setNewTypeSubAsset] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ไม่พบรหัสทรัพย์สิน");
      setLoading(false);
      return;
    }

    const fetchAssetData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/mainasset/${encodeURIComponent(id)}`
        );
        setData(response.data);

        if (response.data?.mainAsset) {
          setUpdatedData({ mainAsset: { ...response.data.mainAsset } });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!updatedData || !updatedData.mainAsset) return;

    setUpdatedData((prevData) => ({
      ...prevData,
      mainAsset: {
        ...prevData.mainAsset,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/mainasset/${id}`,
        updatedData
      );
      setIsEditing(false); // ปิดโหมดการแก้ไข
      setData(response.data); // อัปเดตข้อมูลที่ดึงมาใหม่
      setSuccessMessage("บันทึกการเปลี่ยนแปลงสำเร็จ");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("ไม่สามารถบันทึกข้อมูลได้");
      setSuccessMessage("");
    }
  };

  /*****************subasset************* */
  // ฟังก์ชันเปิด Popup สำหรับเพิ่มหรือแก้ไข
  const handleButtonClick = (item = null) => {
    resetForm();
    setEditMode(!!item);
    if (item) {
      setEditId(item.id);
      setNewSubasset(item.sub_asset_name);
      setNewDetail(item.details);
      setNewPrice(item.unit_price.toString());
      setNewQuantity(item.quantity.toString());
      setNewUnit(item.counting_unit);
      setNewStatus(item.status);
      setNewNote(item.note);
      setNewTypeSubAsset(item.type_sub_asset);
    }
    setIsPopupOpen(true);
  };
  // ปรับปรุงการตรวจสอบ subasset
  const subassets = Array.isArray(data?.subasset) ? data.subasset : [];

  subassets.forEach((sub) => {
    console.log(sub); // ทำงานกับค่าได้อย่างปลอดภัย
  });

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditMode(false);
  };

  const handleDelete = async (subId) => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?"
    );
    if (!confirmDelete) return;

    console.log("🗑️ ลบ subasset id:", subId);

    try {
      // ลบข้อมูลจาก backend
      await axios.delete(`http://localhost:5001/api/subasset/${subId}`);

      // ตรวจสอบว่า subasset เป็น array ก่อนทำการอัปเดต state
      setData((prevData) => ({
        ...prevData,
        subasset: Array.isArray(prevData.subasset)
          ? prevData.subasset.filter((item) => item.sub_asset_id !== subId)
          : [], // ถ้าไม่ใช่ array ให้ตั้งค่าเป็น array ว่าง
      }));

      console.log("✅ ลบข้อมูลสำเร็จ");
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการลบข้อมูล:", error);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล!");
    }
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const resetForm = () => {
    setNewSubasset("");
    setNewDetail("");
    setNewPrice("");
    setNewQuantity("");
    setNewUnit("");
    setNewStatus("");
    setNewNote("");
    setNewTypeSubAsset("");
  };

  const handleSaveSubasset = async () => {
    if (
      !newSubasset ||
      !newDetail ||
      !newPrice ||
      !newQuantity ||
      !newUnit ||
      !newStatus ||
      !newNote ||
      !newTypeSubAsset
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    console.log("Data received:", data);

    // ตรวจสอบว่า data.mainAsset มีค่าหรือไม่
    if (!data?.mainAsset?.main_asset_id) {
      console.error(" main_asset_id ไม่พบข้อมูล!");
      alert("เกิดข้อผิดพลาด: ไม่พบข้อมูล Main Asset ID");
      return;
    }

    const subassets = Array.isArray(data?.subasset) ? data.subasset : [];

    // สร้าง object สำหรับส่งไปยัง backend
    const subAssetData = {
      sub_asset_name: newSubasset,
      details: newDetail,
      quantity: parseInt(newQuantity),
      unit_price: parseFloat(newPrice),
      counting_unit: newUnit,
      status: newStatus,
      note: newNote,
      type_sub_asset: newTypeSubAsset,
      main_asset_id: data.mainAsset.main_asset_id, //ใช้ data.mainAsset.main_asset_id แทน value
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/subasset",
        subAssetData
      );
      console.log("บันทึกข้อมูลสำเร็จ:", response.data);

      if (editMode) {
        setData({
          ...data,
          subasset: subassets.map((item) =>
            item.sub_asset_id === editId ? { ...item, ...subAssetData } : item
          ),
        });
      } else {
        setData({
          ...data,
          subasset: [
            ...subassets,
            { ...subAssetData, sub_asset_id: response.data.sub_asset_id },
          ],
        });
      }

      setIsPopupOpen(false);
      resetForm();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล!");
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(value);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div
      style={{ backgroundColor: "#f1f8e9" }}
      className="min-h-screen font-sans"
    >
      <Breadcrumb7 />
      <div className="container mx-auto p-4">
        {/* ข้อความตอบกลับ */}
        {successMessage && (
          <div className="text-green-500 py-2">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 py-2">{errorMessage}</div>
        )}

        {/* ข้อมูลครุภัณฑ์ */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            ข้อมูลครุภัณฑ์
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                รหัสทรัพย์สิน
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100 bg-yellow-100"
                value={updatedData?.mainAsset?.main_asset_id || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="main_asset_id"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                ภาควิชา
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.department_id || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="department_id"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                สภาพการครุภัณฑ์
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.status || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="status"
              />
            </div>
          </div>
        </div>

        {/* วิธีการได้มา */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">วิธีการได้มา</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                ปีงบประมาณ
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.fiscal_year || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="fiscal_year"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                วันที่ตรวจรับ
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.date_received || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="date_received"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                ประเภทเงิน
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.budget_type || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="budget_type"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                วงเงินงบประมาณ
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.budget_limit || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="budget_limit"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                ราคากลาง
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.averange_price || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="averange_price"
              />
            </div>
          </div>
        </div>

        {/* รายละเอียดพัสดุ */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            รายละเอียดพัสดุ
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ชื่อสินทรัพย์
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.main_asset_name || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="main_asset_name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ประเภทสินทรัพย์
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.asset_type || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="asset_type"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                สถานที่ใช้งาน
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.location_use || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="location_use"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                การใช้งาน
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.usage || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="usage"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                สถานที่ส่งมอบ
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.location_deliver || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="location_deliver"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ผู้รับผิดชอบ
              </label>
              <input
                type="text"
                className="w-full border-2 border-blue-100 rounded-xl p-2 bg-yellow-100"
                value={updatedData?.mainAsset?.responsible_person || ""}
                readOnly={!isEditing}
                onChange={handleChange}
                name="responsible_person"
              />
            </div>
          </div>
        </div>

        {/* ตารางแสดงข้อมูลพัสดุย่อย */}
        <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            ข้อมูลพัสดุย่อย
          </h3>
          <div className="flex justify-between items-center mb-6">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              onClick={() => handleButtonClick()}
            >
              + เพิ่ม
            </button>
          </div>
          {isPopupOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handleClosePopup}
            >
              <div
                className="bg-white p-6 rounded-md shadow-md w-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  {editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      รายการพัสดุย่อย
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      placeholder="รายการพัสดุย่อย"
                      value={newSubasset}
                      onChange={(e) => setNewSubasset(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      ประเภทพัสดุ
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newTypeSubAsset}
                      onChange={(e) => setNewTypeSubAsset(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      รายละเอียด
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newDetail}
                      onChange={(e) => setNewDetail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      ราคาต่อหน่วย
                    </label>
                    <input
                      type="number"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      จำนวน
                    </label>
                    <input
                      type="number"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      หน่วยนับ
                    </label>
                    <select
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                    >
                      <option value="">-- กรุณาเลือก --</option>
                      <option>เครื่อง</option>
                      <option>เตียง</option>
                      <option>แผ่น</option>
                      <option>โหล</option>
                      <option>ใบ</option>
                      <option>คัน</option>
                      <option>ขด</option>
                      <option>ชุด</option>
                      <option>ตัว</option>
                      <option>ตู้</option>
                      <option>บาน</option>
                      <option>ผืน</option>
                      <option>ระบบ</option>
                      <option>หลัง</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      การใช้งาน
                    </label>
                    <select
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">-- กรุณาเลือก --</option>
                      <option>ใช้งาน</option>
                      <option>ส่งซ่อม</option>
                      <option>ชำรุด</option>
                      <option>บริจาค/โอน</option>
                      <option>รับโอน</option>
                      <option>จำหน่าย</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2">
                      หมายเหตุ
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-blue-100 rounded-xl p-2"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 mr-2"
                      onClick={handleClosePopup}
                    >
                      ยกเลิก
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                      onClick={handleSaveSubasset}
                      disabled={loading}
                    >
                      {loading ? "กำลังบันทึก..." : "บันทึก"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <table className="table-auto w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">รายการพัสดุย่อย</th>
                <th className="border px-4 py-2">ประเภทพัสดุ</th>
                <th className="border px-4 py-2">รายละเอียด</th>
                <th className="border px-4 py-2">ราคาต่อหน่วย</th>
                <th className="border px-4 py-2">จำนวน</th>
                <th className="border px-4 py-2">หน่วยนับ</th>
                <th className="border px-4 py-2">การใช้งาน</th>
                <th className="border px-4 py-2">หมายเหตุ</th>
                <th className="border px-4 py-2">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {data.subAssets?.length > 0 ? (
                data.subAssets.map((item) => (
                  <tr key={item.sub_asset_id} className="text-center">
                    <td className="border px-4 py-2">{item.sub_asset_name}</td>
                    <td className="border px-4 py-2">{item.type_sub_asset}</td>
                    <td className="border px-4 py-2">{item.details}</td>
                    <td className="border px-4 py-2">
                      {formatCurrency(item.unit_price)}
                    </td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.counting_unit}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">{item.note}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2 mr-2"
                        onClick={() => handleButtonClick(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 bg-gray-100 rounded-lg p-2"
                        onClick={() => handleDelete(item.sub_asset_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ActionButtons3 />
    </div>
  );
};

export default EditInfo;
