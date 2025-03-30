import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const Filters = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedUsage,
  setSelectedUsage,
  selectedBudgetType,
  setSelectedBudgetType,
  selectedFiscalYear,
  handleFiscalYearChange,
  errorMessage,
}) => {
  const [departments, setDepartments] = useState([]); // Change to departments
  const [usage, setUsage] = useState([]);
  const [budgetTypes, setBudgetTypes] = useState([]); // Change to budgetTypes
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  // Handle selection for all checkboxes
  const [selectAllBudgetTypes, setSelectAllBudgetTypes] = useState(false);
  const [selectedBudgetTypesInternal, setSelectedBudgetTypesInternal] = useState([]);

  const [selectAllDepts, setSelectAllDepts] = useState(false);
  const [selectedDeptsInternal, setSelectedDeptsInternal] = useState([]);

  const [selectAllUsages, setSelectAllUsages] = useState(false);
  const [selectedUsagesInternal, setSelectedUsagesInternal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mainasset");

        setDepartments(response.data.department_id|| []);
        setBudgetTypes(response.data.budget_type ||[]);
        setUsage(response.data.usage || []);

        setLoading(false);
      } catch (error) {
        setApiError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch department data from the API using axios
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/department');
        if (Array.isArray(response.data)) {
          setDepartments(response.data); // Set the department to state
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };

    fetchDepartment();
  }, []);

  // useEffect hooks for setting selected values
  useEffect(() => {
    if (selectedBudgetType) {
      const fundsArray = selectedBudgetType.split(",");
      setSelectedBudgetTypesInternal(fundsArray);
      setSelectAllBudgetTypes(fundsArray.length === budgetTypes.length);
    } else {
      setSelectedBudgetTypesInternal([]);
      setSelectAllBudgetTypes(false);
    }
  }, [selectedBudgetType, budgetTypes]);

  useEffect(() => {
    if (selectedDepartment) {
      const deptsArray = selectedDepartment.split(",");
      setSelectedDeptsInternal(deptsArray);
      setSelectAllDepts(deptsArray.length === departments.length);
    } else {
      setSelectedDeptsInternal([]);
      setSelectAllDepts(false);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    if (selectedUsage) {
      const assetsArray = selectedUsage.split(",");
      setSelectedUsagesInternal(assetsArray);
      setSelectAllUsages(assetsArray.length === usage.length);
    } else {
      setSelectedUsagesInternal([]);
      setSelectAllUsages(false);
    }
  }, [selectedUsage, usage]);

  const handleSelectAllUsages = () => {
    if (selectAllUsages) {
      setSelectedUsagesInternal([]);
      setSelectAllUsages(false);
      setSelectedUsage("");
    } else {
      setSelectedUsagesInternal(usage);
      setSelectAllUsages(true);
      setSelectedUsage(usage.join(","));
    }
  };

  const handleUsageChange = (status) => {
    let newSelectedUsages;

    if (selectedUsagesInternal.includes(status)) {
      newSelectedUsages = selectedUsagesInternal.filter(item => item !== status);
    } else {
      newSelectedUsages = [...selectedUsagesInternal, status];
    }

    setSelectedUsagesInternal(newSelectedUsages);
    setSelectAllUsages(newSelectedUsages.length === usage.length);

    if (newSelectedUsages.length === 0) {
      setSelectedUsage("");
    } else {
      setSelectedUsage(newSelectedUsages.join(","));
    }
  };

  const handleSelectAllDepartments = () => {
    if (selectAllDepts) {
      setSelectedDeptsInternal([]);
      setSelectAllDepts(false);
      setSelectedDepartment("");
    } else {
      setSelectedDeptsInternal(departments);
      setSelectAllDepts(true);
      setSelectedDepartment(departments.join(","));
    }
  };

  const handleDepartmentChange = (dept) => {
    let newSelectedDepts;

    if (selectedDeptsInternal.includes(dept)) {
      newSelectedDepts = selectedDeptsInternal.filter(item => item !== dept);
    } else {
      newSelectedDepts = [...selectedDeptsInternal, dept];
    }

    setSelectedDeptsInternal(newSelectedDepts);
    setSelectAllDepts(newSelectedDepts.length === departments.length);

    if (newSelectedDepts.length === 0) {
      setSelectedDepartment("");
    } else {
      setSelectedDepartment(newSelectedDepts.join(","));
    }
  };

  const handleSelectAllBudgetTypes = () => {
    if (selectAllBudgetTypes) {
      setSelectedBudgetTypesInternal([]);
      setSelectAllBudgetTypes(false);
      setSelectedBudgetType("");
    } else {
      setSelectedBudgetTypesInternal(budgetTypes);
      setSelectAllBudgetTypes(true);
      setSelectedBudgetType(budgetTypes.join(","));
    }
  };

  const handleBudgetTypeChange = (fund) => {
    let newSelectedBudgetTypes;

    if (selectedBudgetTypesInternal.includes(fund)) {
      newSelectedBudgetTypes = selectedBudgetTypesInternal.filter(item => item !== fund);
    } else {
      newSelectedBudgetTypes = [...selectedBudgetTypesInternal, fund];
    }

    setSelectedBudgetTypesInternal(newSelectedBudgetTypes);
    setSelectAllBudgetTypes(newSelectedBudgetTypes.length === budgetTypes.length);

    if (newSelectedBudgetTypes.length === 0) {
      setSelectedBudgetType("");
    } else {
      setSelectedBudgetType(newSelectedBudgetTypes.join(","));
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
        <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
          <label style={{ display: "flex", alignItems: "center", marginBottom: "5px", fontWeight: "bold" }}>
            <input
              type="checkbox"
              checked={selectAllDepts}
              onChange={handleSelectAllDepartments}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {departments.map((department) => (
            <label key={department.department_id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                value={department.department_id}
                checked={selectedDeptsInternal.includes(department.department_id)}
                onChange={() => handleDepartmentChange(department.department_id)}
                style={{ marginRight: "5px" }}
              />
              {department.department_name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>สถานะสินทรัพย์:</label>
        <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
          <label style={{ display: "flex", alignItems: "center", marginBottom: "5px", fontWeight: "bold" }}>
            <input
              type="checkbox"
              checked={selectAllUsages}
              onChange={handleSelectAllUsages}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {["ส่งซ่อม", "ชำรุด", "บริจาค/โอน", "รับโอน", "จำหน่าย"].map((status) => (
            <label key={status} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                value={status}
                checked={selectedUsagesInternal.includes(status)}
                onChange={() => handleUsageChange(status)}
                style={{ marginRight: "5px" }}
              />
              {status}
            </label>
          ))}
        </div>
      </div>


      <div>
        <label>:</label>
        <div style={{ marginTop: "5px", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
          <label style={{ display: "flex", alignItems: "center", marginBottom: "5px", fontWeight: "bold" }}>
            <input
              type="checkbox"
              checked={selectAllBudgetTypes}
              onChange={handleSelectAllBudgetTypes}
              style={{ marginRight: "5px" }}
            />
            เลือกทั้งหมด
          </label>
          <hr style={{ margin: "5px 0" }} />
          {budgetTypes.map((fund) => (
            <label key={fund} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="checkbox"
                value={fund}
                checked={selectedBudgetTypesInternal.includes(fund)}
                onChange={() => handleBudgetTypeChange(fund)}
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
          value={selectedFiscalYear}
          onChange={handleFiscalYearChange}
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
