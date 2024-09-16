import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function PerformanceGraph() {
  const [state, setState] = useState({
    series: [
      {
        name: "Your Performance",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: "100%",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        fontFamily: "var(--font-family-titles)",
        foreColor: "#7e7f81",
      },
      stroke: {
        curve: "smooth", // Smooth line style
        width: 4, // Increased line thickness for better visibility
      },
      markers: {
        size: 6, // Increase marker size
        colors: ["#28a745"], // Marker color (green)
        strokeColors: "#fff", // White stroke for markers
        strokeWidth: 3,
        hover: {
          size: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid", // Change gradient to solid to make the line more visible
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
        title: {
          text: "Performance (%)",
        },
      },
      xaxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
      },
      tooltip: {
        shared: true,
        y: {
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
      },
    },
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch logged-in user's performance
    const fetchUserPerformance = async () => {
      try {
        const res = await axios.get("http://localhost:8070/user/performance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Performance Data:", res.data); // Log the data to check

        // Assuming the response contains an array of performance data with { date, performance }
        if (res.data && res.data.length > 0) {
          const performanceData = res.data.map((item) => [
            new Date(item.date).getTime(), // Convert date to timestamp
            item.performance, // Performance value
          ]);

          setState((prevState) => ({
            ...prevState,
            series: [
              {
                name: "Your Performance",
                data: performanceData,
              },
            ],
          }));
        } else {
          // If no data is returned from the API, set some sample data
          console.log("No performance data found, using sample data.");
          const sampleData = [
            [new Date("2024-01-01").getTime(), 45],
            [new Date("2024-02-01").getTime(), 60],
            [new Date("2024-03-01").getTime(), 75],
          ];

          setState((prevState) => ({
            ...prevState,
            series: [
              {
                name: "Your Performance",
                data: sampleData,
              },
            ],
          }));
        }
      } catch (err) {
        console.error("Error fetching performance data:", err);
        // Use sample data in case of error
        const sampleData = [
          [new Date("2024-01-01").getTime(), 45],
          [new Date("2024-02-01").getTime(), 60],
          [new Date("2024-03-01").getTime(), 75],
        ];

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: "Your Performance",
              data: sampleData,
            },
          ],
        }));
      }
    };

    fetchUserPerformance();
  }, [token]);

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height="100%"
    />
  );
}
