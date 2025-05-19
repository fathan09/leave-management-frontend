import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DataAnalysis() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("https://leave-management-backend-production.up.railway.app/leave/all").then(
      (response) => {
        setLeaves(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const getMonthName = (dateStr) => {
    const [,mm, yyyy] = dateStr.split("/");
    const monthIndex = parseInt(mm) - 1;
    return new Date(yyyy, monthIndex).toLocaleString("default", { month: "long" });
  };

  const countByMonth = () => {
    const counts = {};
    leaves.forEach((leave) => {
      const month = getMonthName(leave.startDate);
      counts[month] = (counts[month] || 0) + 1;
    });
    return counts;
  };

  const countByStatus = () => {
    const counts = {};
    leaves.forEach((leave) => {
      const status = leave.status || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  };

  const monthlyCounts = countByMonth();
  const statusCounts = countByStatus();

  const totalRequests = leaves.length;
  const totalApproved = leaves.filter(l => l.status?.toLowerCase() === "approved").length;
  const totalPending = leaves.filter(l => l.status?.toLowerCase() === "pending").length;
  const totalRejected = leaves.filter(l => l.status?.toLowerCase() === "rejected").length;

  return (
    <>
    <Header />
    <div className="container-data-analysis">
      <div className="figure-section">
        <div className="figure-box">
            <h1>Total Leave Request</h1>
            <h1>{totalRequests}</h1>
        </div>
        <div className="figure-box">
            <h1>Total Approved</h1>
            <h1>{totalApproved}</h1>
        </div>
        <div className="figure-box">
            <h1>Total Pending</h1>
            <h1>{totalPending}</h1>
        </div>
        <div className="figure-box"> 
            <h1>Total Rejected</h1>
            <h1>{totalRejected}</h1>
        </div>
      </div>
      <div className="chart-section">
        <div className="line-chart">
          <Line
            data={{
              labels: Object.keys(monthlyCounts),
              datasets: [{
                label: "Total Per Month",
                data: Object.values(monthlyCounts),
                backgroundColor: "rgba(186, 12, 47, 0.2)",
                borderColor: "#BA0C2F",
                borderWidth: 2,
                fill: true,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div className="doughnout-chart">
          <Doughnut
            data={{
              labels: Object.keys(statusCounts),
              datasets: [{
                label: "Status",
                data: Object.values(statusCounts),
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
                borderColor: "#fff",
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default DataAnalysis;
