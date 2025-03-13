import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // Set height for the pie chart container
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;