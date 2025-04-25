import { useState, useEffect, useRef } from "react";

const DropdownPopup = ({ label, items, selectedItems, onSelectAll, onItemChange, selectAllChecked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // เมื่อคลิกที่ไหนก็ปิด dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", fontSize: "14px" }}>
      <label style={{ fontWeight: "bold", marginRight: "10px" }}>{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 12px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          cursor: "pointer",
          fontSize: "14px",
          border: "1px solid #ddd",
          width: "150px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {selectedItems.length > 0 ? `${selectedItems.length} รายการที่เลือก` : "เลือก..."}
        <span style={{ fontSize: "16px" }}>▼</span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            maxHeight: "180px",
            overflowY: "auto",
            marginTop: "6px",
            padding: "8px 0"
          }}
        >
          <label style={{ fontWeight: "bold", display: "flex", alignItems: "center", paddingLeft: "10px" }}>
            <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={onSelectAll}
              style={{ marginRight: "6px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "0", borderColor: "#f0f0f0" }} />
          {items.map((item) => (
            <label
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                marginTop: "8px"
              }}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => onItemChange(item)}
                style={{ marginRight: "6px" }}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Filters = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedAssetStatus,
  setSelectedAssetStatus,
  selectedFund,
  setSelectedFund,
  selectedYear,
  handleYearChange,
  errorMessage,
}) => {
  const [departments, setDepartments] = useState([]);
  const [assetStatus, setAssetStatus] = useState([]);
  const [fundTypes, setFundTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [selectAllFunds, setSelectAllFunds] = useState(false);
  const [selectedFundsInternal, setSelectedFundsInternal] = useState([]);
  const [selectAllDepts, setSelectAllDepts] = useState(false);
  const [selectedDeptsInternal, setSelectedDeptsInternal] = useState([]);
  const [selectAllAssets, setSelectAllAssets] = useState(false);
  const [selectedAssetsInternal, setSelectedAssetsInternal] = useState([]);

  const [selectedYearState, setSelectedYearState] = useState(selectedYear || "");

  // เพิ่มฟังก์ชันเพื่อส่งค่าปีออกไปเมื่อมีการเปลี่ยนแปลงในช่อง input
  const onYearInputChange = (e) => {
    const value = e.target.value;
    setSelectedYearState(value);
    // ส่งค่าไปยัง parent component
    handleYearChange(value);
  };

  const handleReset = () => {
    setSelectedDeptsInternal([]);
    setSelectedDepartment("");
    setSelectAllDepts(false);

    setSelectedAssetsInternal([]);
    setSelectedAssetStatus("");
    setSelectAllAssets(false);

    setSelectedFundsInternal([]);
    setSelectedFund("");
    setSelectAllFunds(false);

    setSelectedYearState(""); // รีเซ็ตค่า selectedYear ในคอมโพเนนต์
    handleYearChange(""); // ส่งค่าว่างไปยัง parent component
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/getData");
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");

        const data = await response.json();
        setDepartments(data.departments || []);
        setFundTypes(data.fundTypes || []);
        setAssetStatus(data.assetStatuses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filter data:", error);
        setApiError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFund) {
      const arr = selectedFund.split(",");
      setSelectedFundsInternal(arr);
      setSelectAllFunds(arr.length === fundTypes.length);
    } else {
      setSelectedFundsInternal([]);
      setSelectAllFunds(false);
    }
  }, [selectedFund, fundTypes]);

  useEffect(() => {
    if (selectedDepartment) {
      const arr = selectedDepartment.split(",");
      setSelectedDeptsInternal(arr);
      setSelectAllDepts(arr.length === departments.length);
    } else {
      setSelectedDeptsInternal([]);
      setSelectAllDepts(false);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    if (selectedAssetStatus) {
      const arr = selectedAssetStatus.split(",");
      setSelectedAssetsInternal(arr);
      setSelectAllAssets(arr.length === assetStatus.length);
    } else {
      setSelectedAssetsInternal([]);
      setSelectAllAssets(false);
    }
  }, [selectedAssetStatus, assetStatus]);

  // ปรับ useEffect เพื่อติดตามการเปลี่ยนแปลงของ selectedYear จาก parent
  useEffect(() => {
    setSelectedYearState(selectedYear || "");
  }, [selectedYear]);

  const toggleSelection = (item, selectedList, setList, setValue, fullList, setSelectAll) => {
    const updatedList = selectedList.includes(item)
      ? selectedList.filter(i => i !== item)
      : [...selectedList, item];
    setList(updatedList);
    setValue(updatedList.join(","));
    setSelectAll(updatedList.length === fullList.length);
  };

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center", // ปรับตรงนี้ให้จัดกึ่งกลาง
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        maxWidth: "1000px", // จำกัดความกว้างให้อยู่กลางได้ง่าย
        margin: "0 auto" // ให้ container อยู่ตรงกลาง
      }}
    >
    
      {apiError && <div style={{ color: "red", width: "100%" }}>{apiError}</div>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <DropdownPopup
          label="ภาควิชา"
          items={departments}
          selectedItems={selectedDeptsInternal}
          onSelectAll={() => {
            if (selectAllDepts) {
              setSelectedDeptsInternal([]);
              setSelectedDepartment("");
              setSelectAllDepts(false);
            } else {
              setSelectedDeptsInternal(departments);
              setSelectedDepartment(departments.join(","));
              setSelectAllDepts(true);
            }
          }}
          onItemChange={(dept) =>
            toggleSelection(dept, selectedDeptsInternal, setSelectedDeptsInternal, setSelectedDepartment, departments, setSelectAllDepts)
          }
          selectAllChecked={selectAllDepts}
        />

        <DropdownPopup
          label="แหล่งเงิน"
          items={fundTypes}
          selectedItems={selectedFundsInternal}
          onSelectAll={() => {
            if (selectAllFunds) {
              setSelectedFundsInternal([]);
              setSelectedFund("");
              setSelectAllFunds(false);
            } else {
              setSelectedFundsInternal(fundTypes);
              setSelectedFund(fundTypes.join(","));
              setSelectAllFunds(true);
            }
          }}
          onItemChange={(fund) =>
            toggleSelection(fund, selectedFundsInternal, setSelectedFundsInternal, setSelectedFund, fundTypes, setSelectAllFunds)
          }
          selectAllChecked={selectAllFunds}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>ปี</label>
          <input
            type="text"
            value={selectedYearState}
            onChange={onYearInputChange}
            placeholder="2565 หรือ 2565-2568"
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
              color: "#2c3e50"
            }}
          />
        </div>
      </div>

      <button
        onClick={handleReset}
        style={{
          padding: "10px 15px",
          backgroundColor: "#ff4c4c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        รีเซ็ต
      </button>
    </div>
  );
};

export default Filters;