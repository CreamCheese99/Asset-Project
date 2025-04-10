import { useState, useEffect } from "react";

const DropdownPopup = ({ label, items, selectedItems, onSelectAll, onItemChange, selectAllChecked }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative", marginBottom: "6px", fontSize: "13px" }}>
      <label>{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginTop: "4px",
          padding: "6px 10px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          cursor: "pointer",
          userSelect: "none",
          fontSize: "13px"
        }}
      >
        {selectedItems.length > 0 ? `${selectedItems.length} รายการที่เลือก` : "เลือก..."}
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
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            maxHeight: "160px",
            overflowY: "auto",
            marginTop: "4px",
            padding: "8px",
            fontSize: "13px"
          }}
        >
          <label style={{ fontWeight: "bold", display: "flex", alignItems: "center", marginBottom: "6px" }}>
            <input type="checkbox" checked={selectAllChecked} onChange={onSelectAll} style={{ marginRight: "6px" }} />
            เลือกทั้งหมด
          </label>
          <hr />
          {items.map((item) => (
            <label key={item} style={{ display: "flex", alignItems: "center", marginTop: "6px" }}>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getData");
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");

        const data = await response.json();
        setDepartments(data.departments);
        setFundTypes(data.fundTypes);
        setAssetStatus(data.assetStatuses);
        setLoading(false);
      } catch (error) {
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
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        fontSize: "13px"
      }}
    >
      {apiError && <div style={{ color: "red", gridColumn: "span 3" }}>{apiError}</div>}

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
        label="สถานะสินทรัพย์"
        items={assetStatus}
        selectedItems={selectedAssetsInternal}
        onSelectAll={() => {
          if (selectAllAssets) {
            setSelectedAssetsInternal([]);
            setSelectedAssetStatus("");
            setSelectAllAssets(false);
          } else {
            setSelectedAssetsInternal(assetStatus);
            setSelectedAssetStatus(assetStatus.join(","));
            setSelectAllAssets(true);
          }
        }}
        onItemChange={(status) =>
          toggleSelection(status, selectedAssetsInternal, setSelectedAssetsInternal, setSelectedAssetStatus, assetStatus, setSelectAllAssets)
        }
        selectAllChecked={selectAllAssets}
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

      <div>
        <label>ปี</label>
        <input
          type="text"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="2565 หรือ 2565-2568"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginTop: "4px",
            fontSize: "13px"
          }}
        />
        {errorMessage && <div style={{ color: "red", marginTop: "5px" }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Filters;
