import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // ไอคอนเปิด/ปิด

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

  // สถานะการเปิด/ปิดของฟิลเตอร์
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [isFundOpen, setIsFundOpen] = useState(false);

  // ดึงข้อมูลภาควิชาและแหล่งทุนจาก API
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

  const toggleDept = () => setIsDeptOpen(!isDeptOpen);
  const toggleAsset = () => setIsAssetOpen(!isAssetOpen);
  const toggleFund = () => setIsFundOpen(!isFundOpen);

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
        <label onClick={toggleDept} style={{ cursor: "pointer", fontWeight: "bold" }}>
          ภาควิชา {isDeptOpen ? <FaChevronUp /> : <FaChevronDown />}
        </label>
        {isDeptOpen && (
          <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                onChange={() => {}}
                style={{ marginRight: "5px" }}
              />
              เลือกทั้งหมด
            </label>
            <hr style={{ margin: "5px 0" }} />
            {departments.map((dept) => (
              <label key={dept} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <input
                  type="checkbox"
                  value={dept}
                  checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                  onChange={() => {}}
                  style={{ marginRight: "5px" }}
                />
                {dept}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label onClick={toggleAsset} style={{ cursor: "pointer", fontWeight: "bold" }}>
          สถานะสินทรัพย์ {isAssetOpen ? <FaChevronUp /> : <FaChevronDown />}
        </label>
        {isAssetOpen && (
          <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                onChange={() => {}}
                style={{ marginRight: "5px" }}
              />
              เลือกทั้งหมด
            </label>
            <hr style={{ margin: "5px 0" }} />
            {assetStatus.map((status) => (
              <label key={status} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <input
                  type="checkbox"
                  value={status}
                  checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                  onChange={() => {}}
                  style={{ marginRight: "5px" }}
                />
                {status}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label onClick={toggleFund} style={{ cursor: "pointer", fontWeight: "bold" }}>
          แหล่งเงิน {isFundOpen ? <FaChevronUp /> : <FaChevronDown />}
        </label>
        {isFundOpen && (
          <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                onChange={() => {}}
                style={{ marginRight: "5px" }}
              />
              เลือกทั้งหมด
            </label>
            <hr style={{ margin: "5px 0" }} />
            {fundTypes.map((fund) => (
              <label key={fund} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <input
                  type="checkbox"
                  value={fund}
                  checked={false} // แก้ไขให้ตรงกับสภาพของฟิลเตอร์
                  onChange={() => {}}
                  style={{ marginRight: "5px" }}
                />
                {fund}
              </label>
            ))}
          </div>
        )}
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
