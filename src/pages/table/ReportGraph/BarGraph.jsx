
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const BarGraph = ({ height = 400, year, village,gath }) => {
  const [graphData, setGraphData] = useState([]);
  const colors = ["#F44336", "#E91E63", "#9C27B0"];
  const [party, setParty] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [votes, setVotes] = useState([]);
  console.log(percentage, "percentage");
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  const getGraphData = () => {
    axios
      .get(`${base_url}/GraphAPI?year=${year}&gatha=${gath}&village=${village}`)
      .then((resp) => {
        console.log(resp.data.candidates, "///");
        const candidates = resp.data.candidates || [];
        setGraphData(candidates);

        const partyNames = candidates.map((candidate) => candidate.name);
        const percentages = candidates.map((candidate) => candidate.percentage);
        const votes = candidates.map((candidate) => candidate.votes);
        // Set the extracted data to state
        setParty(partyNames);
        setPercentage(percentages);
        setVotes(votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGraphData();
  }, [year,village,gath]); 

  const series = [
    {
      name: "एकूण मतदार",
      data: votes, // Set the votes array for the series data
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "20%", // Adjust width as needed
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    xaxis: {
      categories: party.length ? party.concat() : ["No Data"], // Handle empty categories
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
          return val + " मतदार";
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, { dataPointIndex }) {
        return `${percentage[dataPointIndex] || 0}%`; // Display the percentage value
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    colors: ["#007bff"],
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
      {/* <table class="min-w-full table-auto border-collapse border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-600">
              अ.क्र.
            </th>
            <th class="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-600">
              नाव
            </th>
           
            <th class="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-600">
              टक्केवारी
            </th>
            <th class="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-600">
              मत
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {graphData?.map((item, i) => (
            <tr key={i} class="even:bg-gray-50">
              <td class="px-4 py-2 border border-gray-200 text-gray-700">
                {i + 1}
              </td>
              <td class="px-4 py-2 border border-gray-200 text-gray-700">
                {item.name}
              </td>
             
              <td class="px-4 py-2 border border-gray-200 text-gray-700">
                {item.percentage}%
              </td>
              <td class="px-4 py-2 border border-gray-200 text-gray-700">
                {item.votes}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default BarGraph;
