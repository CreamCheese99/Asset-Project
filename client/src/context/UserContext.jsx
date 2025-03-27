import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // โหลดข้อมูลจาก Local Storage (ถ้ามี)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // บันทึกข้อมูล
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ลบข้อมูลออก
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook ใช้งาน Context ได้ง่ายขึ้น
export const useUser = () => useContext(UserContext);
