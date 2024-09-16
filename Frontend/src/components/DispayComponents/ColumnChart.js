import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function ColumnChart() {
  const [state, setState] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        height: "500px",
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
        fontFamily: "var(--font-family-titles)",
        foreColor: "#7e7f81",
        toolbar: {
          show: false,
        },
      },
      colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.2,
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
  });

  useEffect(() => {
    // Fetch users and sort by performance
    axios
      .get("http://localhost:8070/user/getAllUsers", {})
      .then((res) => {
        // Sort by performance and take top 7 users
        const sortedData = res.data
          .sort((a, b) => b.performance - a.performance)
          .slice(0, 7); // Get top 7 users

        // Extract names and performance for the chart
        const names = sortedData.map((user) => user.fullName);
        const performance = sortedData.map((user) => user.performance);

        // Update chart state with the fetched data
        setState((prevState) => ({
          ...prevState,
          series: [
            {
              data: performance,
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.xaxis,
              categories: names,
            },
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height="300px"
      />
    </div>
  );
}
