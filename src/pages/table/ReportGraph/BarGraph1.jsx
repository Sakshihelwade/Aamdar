
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import axios from "axios";
import Select, { components } from "react-select";

import { base_url } from "../../../config/base_url";
import Card from "../../../components/ui/Card";

const BarGraph1 = ({ height = 400}) => {
  const [graphData, setGraphData] = useState([]);
  const colors = ["#F44336", "#E91E63", "#9C27B0"]
  const [yearId, setYearId] = useState("");
  const [gathName, setGathName] = useState("Methi");
  const [gathId, setGathId] = useState("");
  const [yearName, setYearName] = useState("2009");
  const [party, setParty] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [votes, setVotes] = useState([]);
  const [gathOption, setGathOption] = useState([]);
  const [yearOption, setYearOption] = useState([]);

  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  const handleYearChange = (selectedOption) => {
    setYearId(selectedOption?.value || "");
    setYearName(selectedOption?.label || "");
  };

  const handleGathChange = (selectedOption) => {
    setGathName(selectedOption?.label || "");
    setGathId(selectedOption?.value || "");
  };

  const getGath = () => {
    axios
      .get(`${base_url}/getGatha`)
      .then((resp) => {
        const gathName = resp.data.gath.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setGathOption(gathName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYear = () => {
    axios
      .get(`${base_url}/getYear`)
      .then((resp) => {
        const year = resp.data.year.map((item) => ({
          label: item.year,
          value: item._id,
        }));
        setYearOption(year);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGraphData = () => {
    axios
      .get(`${base_url}/get-TotalvotesBy-Year-gatha?year=${yearName}&gatha=${gathName}`)
      .then((resp) => {
      
        const candidates = resp.data || [];
        setGraphData(candidates);

        const partyNames = candidates.map((candidate) => candidate.candidateName);
        const percentages = candidates.map((candidate) => candidate.totalCandidateVotes/candidate.totalVotes*100);
        const votes = candidates.map((candidate) => candidate.totalCandidateVotes);
        // Set the extracted data to state
        setParty(partyNames);
        setPercentage(percentages);
        setVotes(votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(()=>{
    getYear()
    getGath()
},[])

  useEffect(() => {
    getGraphData();
  }, [yearName,gathName]); // API will be called whenever `village` or `year` changes

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
        return `${(percentage[dataPointIndex] || 0).toFixed(2)}%`; // Display percentage with 2 decimal places
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
    <div className=" mt-5">
    <Card>
    <div>
<div className=" grid grid-cols-4 gap-2">
<div>
                <label className="form-label" htmlFor="mul_1">
                  वर्ष
                </label>
                <Select
                  // isClearable={true}
                  placeholder="वर्ष"
                  name="वर्ष"
                  value={
                    yearOption.find((option) => option.value === yearId) || null
                  }
                  options={yearOption}
                  onChange={handleYearChange}
                  className="react-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="mul_1">
                  गट
                </label>
                <Select
                  // isClearable={true}
                  placeholder="गट"
                  name="गट"
                  value={
                    gathOption.find((option) => option.value === gathId) || null
                  }
                  options={gathOption}
                  onChange={handleGathChange}
                  className="react-select"
                  classNamePrefix="select"
                />
              </div>
              </div>
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
    </Card>
    </div>
  );
};

export default BarGraph1;
