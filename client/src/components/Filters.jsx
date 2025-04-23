import { useState, useEffect } from "react";

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

  // สำหรับแหล่งเงิน
  const [selectAllFunds, setSelectAllFunds] = useState(false);
  const [selectedFundsInternal, setSelectedFundsInternal] = useState([]);

  // สำหรับภาควิชา
  const [selectAllDepts, setSelectAllDepts] = useState(false);
  const [selectedDeptsInternal, setSelectedDeptsInternal] = useState([]);

  // สำหรับสถานะสินทรัพย์
  const [selectAllAssets, setSelectAllAssets] = useState(false);
  const [selectedAssetsInternal, setSelectedAssetsInternal] = useState([]);

  // ดึงข้อมูลภาควิชาและแหล่งทุนจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลจาก API ของเซิร์ฟเวอร์
        const response = await fetch("http://localhost:5001/api/getData");
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");

        const data = await response.json();

        // ตั้งค่าข้อมูลภาควิชาและแหล่งทุน
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

  // เมื่อ selectedFund เปลี่ยน ให้อัปเดต selectedFundsInternal
  useEffect(() => {
    if (selectedFund) {
      const fundsArray = selectedFund.split(",");
      setSelectedFundsInternal(fundsArray);
      // อัปเดตสถานะ selectAllFunds
      setSelectAllFunds(fundsArray.length === fundTypes.length);
    } else {
      setSelectedFundsInternal([]);
      setSelectAllFunds(false);
    }
  }, [selectedFund, fundTypes]);

  // เมื่อ selectedDepartment เปลี่ยน ให้อัปเดต selectedDeptsInternal
  useEffect(() => {
    if (selectedDepartment) {
      const deptsArray = selectedDepartment.split(",");
      setSelectedDeptsInternal(deptsArray);
      // อัปเดตสถานะ selectAllDepts
      setSelectAllDepts(deptsArray.length === departments.length);
    } else {
      setSelectedDeptsInternal([]);
      setSelectAllDepts(false);
    }
  }, [selectedDepartment, departments]);

  // เมื่อ selectedAssetStatus เปลี่ยน ให้อัปเดต selectedAssetsInternal
  useEffect(() => {
    if (selectedAssetStatus) {
      const assetsArray = selectedAssetStatus.split(",");
      setSelectedAssetsInternal(assetsArray);
      // อัปเดตสถานะ selectAllAssets
      setSelectAllAssets(assetsArray.length === assetStatus.length);
    } else {
      setSelectedAssetsInternal([]);
      setSelectAllAssets(false);
    }
  }, [selectedAssetStatus, assetStatus]);

  // จัดการการเลือกหรือยกเลิกการเลือกประเภทสินทรัพย์ทั้งหมด
  const handleSelectAllAssets = () => {
    if (selectAllAssets) {
      // ถ้าตอนนี้เลือกทั้งหมดอยู่แล้ว ให้ยกเลิกการเลือกทั้งหมด
      setSelectedAssetsInternal([]);
      setSelectAllAssets(false);
      setSelectedAssetStatus("");
    } else {
      // ถ้าตอนนี้ยังไม่ได้เลือกทั้งหมด ให้เลือกทั้งหมด
      setSelectedAssetsInternal([...assetStatus]);
      setSelectAllAssets(true);
      setSelectedAssetStatus(assetStatus.join(","));
    }
  };

  // จัดการการเลือกสินทรัพย์แต่ละรายการ
  const handleAssetStatusChange = (status) => {
    let newSelectedAssets;

    if (selectedAssetsInternal.includes(status)) {
      // ถ้ามีอยู่แล้ว ให้ลบออก
      newSelectedAssets = selectedAssetsInternal.filter(
        (item) => item !== status
      );
    } else {
      // ถ้ายังไม่มี ให้เพิ่มเข้าไป
      newSelectedAssets = [...selectedAssetsInternal, status];
    }

    setSelectedAssetsInternal(newSelectedAssets);

    // อัปเดตสถานะ selectAllAssets
    setSelectAllAssets(newSelectedAssets.length === assetStatus.length);

    // ส่งค่าไปที่ parent component
    if (newSelectedAssets.length === 0) {
      setSelectedAssetStatus("");
    } else {
      setSelectedAssetStatus(newSelectedAssets.join(","));
    }
  };

  // จัดการการเลือกหรือยกเลิกการเลือกภาควิชาทั้งหมด
  const handleSelectAllDepartments = () => {
    if (selectAllDepts) {
      // ถ้าตอนนี้เลือกทั้งหมดอยู่แล้ว ให้ยกเลิกการเลือกทั้งหมด
      setSelectedDeptsInternal([]);
      setSelectAllDepts(false);
      setSelectedDepartment("");
    } else {
      // ถ้าตอนนี้ยังไม่ได้เลือกทั้งหมด ให้เลือกทั้งหมด
      setSelectedDeptsInternal([...departments]);
      setSelectAllDepts(true);
      setSelectedDepartment(departments.join(","));
    }
  };

  // จัดการการเลือกภาควิชาแต่ละรายการ
  const handleDepartmentChange = (dept) => {
    let newSelectedDepts;

    if (selectedDeptsInternal.includes(dept)) {
      // ถ้ามีอยู่แล้ว ให้ลบออก
      newSelectedDepts = selectedDeptsInternal.filter((item) => item !== dept);
    } else {
      // ถ้ายังไม่มี ให้เพิ่มเข้าไป
      newSelectedDepts = [...selectedDeptsInternal, dept];
    }

    setSelectedDeptsInternal(newSelectedDepts);

    // อัปเดตสถานะ selectAllDepts
    setSelectAllDepts(newSelectedDepts.length === departments.length);

    // ส่งค่าไปที่ parent component
    if (newSelectedDepts.length === 0) {
      setSelectedDepartment("");
    } else {
      setSelectedDepartment(newSelectedDepts.join(","));
    }
  };

  // จัดการการเลือกหรือยกเลิกการเลือกแหล่งเงินทั้งหมด
  const handleSelectAllFunds = () => {
    if (selectAllFunds) {
      // ถ้าตอนนี้เลือกทั้งหมดอยู่แล้ว ให้ยกเลิกการเลือกทั้งหมด
      setSelectedFundsInternal([]);
      setSelectAllFunds(false);
      setSelectedFund("");
    } else {
      // ถ้าตอนนี้ยังไม่ได้เลือกทั้งหมด ให้เลือกทั้งหมด
      setSelectedFundsInternal([...fundTypes]);
      setSelectAllFunds(true);
      setSelectedFund(fundTypes.join(","));
    }
  };

  // จัดการการเลือกแหล่งเงินแต่ละรายการ
  const handleFundChange = (fund) => {
    let newSelectedFunds;

    if (selectedFundsInternal.includes(fund)) {
      // ถ้ามีอยู่แล้ว ให้ลบออก
      newSelectedFunds = selectedFundsInternal.filter((item) => item !== fund);
    } else {
      // ถ้ายังไม่มี ให้เพิ่มเข้าไป
      newSelectedFunds = [...selectedFundsInternal, fund];
    }

    setSelectedFundsInternal(newSelectedFunds);

    // อัปเดตสถานะ selectAllFunds
    setSelectAllFunds(newSelectedFunds.length === fundTypes.length);

    // ส่งค่าไปที่ parent component
    if (newSelectedFunds.length === 0) {
      setSelectedFund("");
    } else {
      setSelectedFund(newSelectedFunds.join(","));
    }
  };

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div
      style={{
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        display: "grid",
        gap: "10px",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      {apiError && (
        <div style={{ color: "red", gridColumn: "span 3" }}>{apiError}</div>
      )}

      <div>
        <label>ภาควิชา:</label>
        <div
          style={{
            marginTop: "5px",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={selectAllDepts}
              onChange={handleSelectAllDepartments}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {departments.map((dept) => (
            <label
              key={dept}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="checkbox"
                value={dept}
                checked={selectedDeptsInternal.includes(dept)}
                onChange={() => handleDepartmentChange(dept)}
                style={{ marginRight: "5px" }}
              />
              {dept}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>สถานะสินทรัพย์:</label>
        <div
          style={{
            marginTop: "5px",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={selectAllAssets}
              onChange={handleSelectAllAssets}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {assetStatus.map((status) => (
            <label
              key={status}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="checkbox"
                value={status}
                checked={selectedAssetsInternal.includes(status)}
                onChange={() => handleAssetStatusChange(status)}
                style={{ marginRight: "5px" }}
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>แหล่งเงิน:</label>
        <div
          style={{
            marginTop: "5px",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={selectAllFunds}
              onChange={handleSelectAllFunds}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {fundTypes.map((fund) => (
            <label
              key={fund}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="checkbox"
                value={fund}
                checked={selectedFundsInternal.includes(fund)}
                onChange={() => handleFundChange(fund)}
                style={{ marginRight: "5px" }}
              />
              {fund}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>ปี:</label>
        <input
          type="text"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="2565 หรือ 2565-2568"
          style={{ width: "100%", padding: "5px" }}
        />
        {errorMessage && (
          <div style={{ color: "red", marginTop: "5px" }}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Filters;
