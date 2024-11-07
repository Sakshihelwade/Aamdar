import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const PieChart = () => {
  const [isDark] = useDarkMode();
  const [yearOption, setYearOption] = useState([]);
  const [yearName, setYearName] = useState("2014");
  const [yearId, setYearId] = useState("");
  const [party, setParty] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [gathOption, setGathOption] = useState([]);
  const [gathName, setGathName] = useState("Methi");
  const [gathId, setGathId] = useState("");

  const [votes, setVotes] = useState([]);

  const options = {
    labels: party,
    dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex }) => `${val.toFixed(1)}% (${votes[seriesIndex]})`, // Shows percentage and votes
    },
    colors: ["#4669FA", "#F1595C", "#50C793", "#0CE7FA", "#FA916B"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val, { seriesIndex }) => `${val.toFixed(1)}% - ${votes[seriesIndex]} votes`,
      },
    },
  };

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
      .get(`${base_url}/get-TotalvotesBy-Year-gatha?year=${yearName}}&gatha=${gathName}`)
      .then((resp) => {
        const candidates = resp.data || [];
        setParty(candidates.map((candidate) => candidate.candidateName));
        setPercentage(candidates.map((candidate) => (candidate.totalCandidateVotes / candidate.totalVotes) * 100));
        setVotes(candidates.map((candidate) => candidate.totalCandidateVotes));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGraphData();
    getYear();
    getGath()
  }, []);

  useEffect(() => {
    getGraphData();
  }, [yearName,gathName]);

  const handleClear=()=>{
setYearName('')
setGathName('')
  }

  return (
    <div className="mt-4">
      <Card>
        <div className=" grid grid-cols-4 gap-3 mb-4">
        <div>
          <label className="form-label" htmlFor="year_select">वर्ष</label>
          <Select
            placeholder="वर्ष"
            name="वर्ष"
            value={yearOption.find((option) => option.value === yearId) || null}
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
              <div></div>
              <div className=" mt-9 justify-end flex">
              {/* <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={handleClear}>
              Clear
              </button> */}
              </div>
              </div>
        <Chart options={options} series={percentage} type="pie" height="450" />
      </Card>
    </div>
  );
};

export default PieChart;
