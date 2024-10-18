
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";
import axios from "axios";
import { base_url } from "../../../../config/base_url";

const RadialsChart = () => {
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalMaleFemale, setTotalMaleFemale] = useState(0);
  const malefemale = totalMale + totalFemale;
  const other = totalMaleFemale - malefemale;

  const malePercentage = ((totalMale / totalMaleFemale) * 100).toFixed(2);
  const femalePercentage = ((totalFemale / totalMaleFemale) * 100).toFixed(2);
  const otherPercentage = ((other / totalMaleFemale) * 100).toFixed(2);

  
const calculateTotals = (data) => {
    let maleTotal = 0;
    let femaleTotal = 0;
    let maleFemaleTotal = 0;

    data.forEach((item) => {
      maleTotal += item.maleCount;
      femaleTotal += item.femaleCount;
      maleFemaleTotal += item.totalCount;
    });

    setTotalMale(maleTotal);
    setTotalFemale(femaleTotal);
    setTotalMaleFemale(maleFemaleTotal);
  };

  const getMaleFemaleCount = () => {
    axios
      .get(`${base_url}/api/surve/getAddressMaleFemaleCount`)
      .then((resp) => {
        calculateTotals(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMaleFemaleCount();
    }, [totalMale,totalFemale,totalMaleFemale]);

  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  const series = [malePercentage, femalePercentage, otherPercentage];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          total: {
            show: true,
            label: "एकून मतदार" ,
            color: isDark ? "#CBD5E1" : "#475569",
            value: totalMaleFemale,
            formatter: function () {
              return totalMaleFemale;
            },
          },
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "97%",
        },
      },
    },
    labels: ["पुरुष ", "महिला ", "माहित नाही"],
    colors: ["#22c55e", "#fb923c", "#3b82f6"],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={width > breakpoints.md ? 360 : 250}
      />
    </div>
  );
};

export default RadialsChart;
