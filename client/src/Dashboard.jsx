import React, { useState } from "react";
import Header from './components/Header';
// import NavBar from './components/NavBar';
import Dashboardpage from './components/Dashboardpage';

// function App() {
//   return (
//     <div>
//       {/* Header Section */}
//       <Header />

//       {/* Navigation Bar Section */}
//       {/* <NavBar /> */}

//       {/*content*/}
//       <Dashboardpage />
//     </div>
//   );
// }

// export default App;



const Dashboard = () => {

  return (
    <div>
    {/* Header Section */}
    <Header />

    {/* Navigation Bar Section */}
    {/* <NavBar /> */}

    {/*content*/}
    <Dashboardpage />
  </div>
  );
};

export default Dashboard;


