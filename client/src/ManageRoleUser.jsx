import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockUsers = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@org.com', department: 'IT', role: 'admin', status: 'active' },
  { id: 2, name: 'สมหญิง รักงาน', email: 'somying@org.com', department: 'HR', role: 'administrator', status: 'active' },
  { id: 3, name: 'สมศักดิ์ มุ่งมั่น', email: 'somsak@org.com', department: 'Finance', role: 'office', status: 'inactive' },
  { id: 4, name: 'สมใจ พากเพียร', email: 'somjai@org.com', department: 'Marketing', role: 'general', status: 'active' },
  { id: 5, name: 'สมปอง ตั้งใจ', email: 'sompong@org.com', department: 'Sales', role: 'general', status: 'active' },
];

const ManageRoleUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const departments = ['all', ...new Set(users.map(user => user.department))];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">จัดการสิทธิ์ผู้ใช้งาน</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          className="max-w-xs"
          placeholder="ค้นหาชื่อหรืออีเมล..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Select
          value={departmentFilter}
          onValueChange={setDepartmentFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="เลือกแผนก" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>
                {dept === 'all' ? 'ทุกแผนก' : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="เลือกสิทธิ์" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกสิทธิ์</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="administrator">Administrator</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ-นามสกุล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อีเมล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                แผนก
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สิทธิ์การใช้งาน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={user.role}
                    onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    `}
                  >
                    {user.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant={user.status === 'active' ? 'destructive' : 'default'}
                    size="sm"
                    onClick={() => handleStatusToggle(user.id)}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium
                      ${user.status === 'active' 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'}
                    `}
                  >
                    {user.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleUser;

