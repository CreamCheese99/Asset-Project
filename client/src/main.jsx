import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';


import AddAsset from './AddAsset.jsx'
import ShowAllAsset from './ShowAllAsset.jsx';
import ManageAsset from './ManageAsset.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';



// สร้าง router สำหรับจัดการเส้นทาง


const router = createBrowserRouter([
  {
    path: "/login",  
    element: <Login />,  
  },
  {
    path: "/",  
    element: <Dashboard />,  
  },
  {
    path: "/manage-asset",  
    element: <ManageAsset />,  
  },
  {
    path: "/add-asset",  
    element: <AddAsset />,  
  },
  {
    path: "/show-asset",  
    element: <ShowAllAsset />,  
  }
  
]);

// สร้าง root และ render app โดยใช้ RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>
);



