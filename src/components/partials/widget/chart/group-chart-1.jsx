import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { base_url } from "../../../../config/base_url";

const shapeLine1 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#00EBFF"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      show: false,
    },
  },
};
const shapeLine2 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FB8F65"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      show: false,
    },
  },
};
const shapeLine3 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#5743BE"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      show: false,
    },
  },
};

const GroupChart1 = () => {
  const [totalMale, setTotalMale] = useState('');
  const [totalFemale, setTotalFemale] = useState('');
  const [totalMaleFemale, setTotalMaleFemale] = useState('');
  const [userCount,setUserCount]=useState('')

  const statistics = [
    {
      name: shapeLine1,
      title: "Male Voters",
      count: totalMale,  // Use state directly
      bg: "bg-[#E5F9FF] dark:bg-slate-900",
    },
    {
      name: shapeLine2,
      title: "Female Voters",
      count: totalFemale,  // Use state directly
      bg: "bg-[#FFEDE5] dark:bg-slate-900",
    },
    {
      name: shapeLine3,
      title: "Total Voters",
      count: totalMaleFemale,  // Use state directly
      bg: "bg-[#EAE5FF] dark:bg-slate-900",
    },
    {
      name: shapeLine3,
      title: "Total Users",
      count: userCount,  // Static count
      bg: "bg-[#EAE5FF] dark:bg-slate-900",
    },
  ];

  function calculateTotals(data) {
    let totalMale = 0;
    let totalFemale = 0;
    let totalMaleFemale = 0;

    data.forEach(item => {
      totalMale += item.maleCount;
      totalFemale += item.femaleCount;
      totalMaleFemale += item.totalCount;
    });

    setTotalMale(totalMale);
    setTotalFemale(totalFemale);
    setTotalMaleFemale(totalMaleFemale);
  }

  const getVoterCount = () => {
    axios.get(`${base_url}/api/surve/getAddressMaleFemaleCount`)
      .then((resp) => {
        calculateTotals(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserCount = () =>{
axios.get(`${base_url}/api/getAllUser`)
.then((resp)=>{
  setUserCount(resp.data.total)
})
.catch((error)=>{
  console.log(error)
})
  }

  useEffect(() => {
    getVoterCount();
    getUserCount()
  }, []);

  return (
    <>
      {statistics.map((item, i) => (
        <div className={`py-[18px] px-4 rounded-[6px] ${item.bg}`} key={i}>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* Uncomment if you want to use the chart */}
            {/* <div className="flex-none">
              <Chart
                options={item.name.options}
                series={item.name.series}
                type="area"
                height={48}
                width={48}
              />
            </div> */}
            <div className="flex-1">
              <div className="text-slate-800 dark:text-slate-300 text-lg mb-1 font-normal">
                {item.title}
              </div>
              <div className="text-slate-900 dark:text-white text-lg font-semibold">
                {item.count} {/* Display count value */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart1;
