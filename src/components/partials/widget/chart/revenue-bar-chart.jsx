// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import useDarkMode from "@/hooks/useDarkMode";
// import useRtl from "@/hooks/useRtl";
// import axios from "axios";
// import { base_url } from "../../../../config/base_url";

// const RevenueBarChart = ({ height = 400 }) => {
//   const [address,setAddress]=useState([])
// const [maleCount,setMaleCount]=useState([])
// const [femaleCount,setFemaleCount]=useState([])
// const [totalMaleFemale,setTotalMaleFemale]=useState([])
// const [data,setData]=useState([])
// const [max10,setMax10]=useState([])
// console.log(max10,"////////////////////max10/")
// const Address=max10.map((item)=>(
//   item.address
// ))
// const malecount=max10.map((item)=>(
//   item.maleCount
// ))
// const femalecount=max10.map((item)=>(
//   item.femaleCount
// ))

// function getTop10VoterAreas(data) {
//   const sortedData = data
//     .filter(item => item.address !== null) 
//     .sort((a, b) => b.totalCount - a.totalCount); 
  
//  setMax10(sortedData.slice(0, 10));
// }

// const getVillageWiseCount= () =>{
//     axios.get(`${base_url}/api/surve/getAddressMaleFemaleCount`)
//     .then((resp)=>{
//       getTop10VoterAreas(resp.data.data)
//       setData(resp.data.data)
//       setAddress(resp.data.data.address)
//       setMaleCount(resp.data.data.maleCount)
//       setFemaleCount(resp.data.data.femaleCount)
//       setTotalMaleFemale(resp.data.data.totalCount)

//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }

// useEffect(()=>{
//   getVillageWiseCount()
// },[])

//   const [isDark] = useDarkMode();
//   const [isRtl] = useRtl();
//   const series = [
//     {
//       name: "Net Profit",
//       data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
//     },
//     {
//       name: "Revenue",
//       data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
//     },
//     {
//       name: "Free Cash Flow",
//       data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
//     },
//   ];
//   const options = {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         endingShape: "rounded",
//         columnWidth: "45%",
//       },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "right",
//       fontSize: "12px",
//       fontFamily: "Inter",
//       offsetY: -30,
//       markers: {
//         width: 8,
//         height: 8,
//         offsetY: -1,
//         offsetX: -5,
//         radius: 12,
//       },
//       labels: {
//         colors: isDark ? "#CBD5E1" : "#475569",
//       },
//       itemMargin: {
//         horizontal: 18,
//         vertical: 0,
//       },
//     },
//     title: {
//       text: "Revenue Report",
//       align: "left",

//       offsetX: isRtl ? "0%" : 0,
//       offsetY: 13,
//       floating: false,
//       style: {
//         fontSize: "20px",
//         fontWeight: "500",
//         fontFamily: "Inter",
//         color: isDark ? "#fff" : "#0f172a",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     yaxis: {
//       opposite: isRtl ? true : false,
//       labels: {
//         style: {
//           colors: isDark ? "#CBD5E1" : "#475569",
//           fontFamily: "Inter",
//         },
//       },
//     },
//     xaxis: {
//        categories:Address || []
//        // [
//       //   "Feb",
//       //   "Mar",
//       //   "Apr",
//       //   "May",
//       //   "Jun",
//       //   "Jul",
//       //   "Aug",
//       //   "Sep",
//       //   "Oct",
//       // ],
//       labels: {
//         style: {
//           colors: isDark ? "#CBD5E1" : "#475569",
//           fontFamily: "Inter",
//         },
//       },
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },

//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return "$ " + val + " thousands";
//         },
//       },
//     },
//     colors: ["#4669FA", "#0CE7FA", "#FA916B"],
//     grid: {
//       show: true,
//       borderColor: isDark ? "#334155" : "#E2E8F0",
//       strokeDashArray: 10,
//       position: "back",
//     },
//     responsive: [
//       {
//         breakpoint: 600,
//         options: {
//           legend: {
//             position: "bottom",
//             offsetY: 8,
//             horizontalAlign: "center",
//           },
//           plotOptions: {
//             bar: {
//               columnWidth: "80%",
//             },
//           },
//         },
//       },
//     ],
//   };
//   return (
//     <div>
//       <Chart options={options} series={series} type="bar" height={height} />
//     </div>
//   );
// };

// export default RevenueBarChart;


import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import axios from "axios";
import { base_url } from "../../../../config/base_url";

const RevenueBarChart = ({ height = 400 }) => {
  const [max10, setMax10] = useState([]);
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  function getTop10VoterAreas(data) {
    const sortedData = data
      .filter(item => item.address !== null)
      .sort((a, b) => b.totalCount - a.totalCount);
    
    setMax10(sortedData.slice(0, 10));
  }

  const getVillageWiseCount = () => {
    axios.get(`${base_url}/api/surve/getAddressMaleFemaleCount`)
      .then((resp) => {
        getTop10VoterAreas(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getVillageWiseCount();
  }, []);

  const Address = max10.map(item => item.address);
  const maleCount = max10.map(item => item.maleCount);
  const femaleCount = max10.map(item => item.femaleCount);
  const totalCount = max10.map(item => item.totalCount);

  // Calculate Other counts
  const otherCount = totalCount.map((total, index) => total - maleCount[index] - femaleCount[index]);

  const series = [
    {
      name: "पुरुष मतदार",
      data: maleCount,
    },
    {
      name: "महिला मतदार",
      data: femaleCount,
    },
    {
      name: "माहित नाही",
      data: otherCount,
    }
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "45%",
      },
    },
    xaxis: {
      categories: Address,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " voters";
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on bars
    },
    colors: ["#22c55e", "#fb923c", "#60a5fa"], // Colors for male, female, and other bars
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default RevenueBarChart;
