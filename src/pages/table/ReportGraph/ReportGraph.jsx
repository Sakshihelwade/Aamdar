import React, { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
// import { Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { components } from "react-select";

import axios from "axios";
import { base_url } from "../../../config/base_url";
import Card from "../../../components/ui/Card";

const ReportGraph = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("Devi");
  const [yearId, setYearId] = useState("");
  const [gathName, setGathName] = useState("Methi");
  const [gathId, setGathId] = useState("");
  const [yearName, setYearName] = useState("2009");
  const [villageOption, setVillageOption] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [gathOption, setGathOption] = useState([]);
  const id = localStorage.getItem("_id");

  const handleClear = () => {
    setVillageId("");
    setVillageName("");
    setGathId("");
    setGathName("");
    setYearId("");
    setYearName("");
  };

  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
  };

  const handleYearChange = (selectedOption) => {
    setYearId(selectedOption?.value || "");
    setYearName(selectedOption?.label || "");
    setVillageId('')
    setVillageName('')
    setGathId('')
    setGathName('')
  };

  const handleGathChange = (selectedOption) => {
    setGathName(selectedOption?.label || "");
    setGathId(selectedOption?.value || "");
    setVillageId('')
    setVillageName('')
  };

  const getVillageOption = () => {
    axios
      .get(`${base_url}/getVillages?vibhagRef=${gathId}`)
      .then((resp) => {
        const villageoption = resp.data.villages.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setVillageOption(villageoption);
      })
      .catch((error) => {
        console.log(error);
      });
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

  useEffect(() => {
    getYear();
    getGath();
  }, []);

  useEffect(() => {
    getVillageOption();
  }, [gathName]);

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card>
            <div className="mb-2 mt-4 flex justify-between mx-2">
              <h6 className="font-bold text-[#b91c1c]">अहवाल</h6>
            </div>
            <hr className="mb-3" />
            <p className=" mx-2">
              <span className="font-bold">विधानसभा</span>{" "}
              <span className="font-bold text-lg">8</span>
            </p>

            <div className=" grid grid-cols-4 gap-2 mx-2">
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

              <div>
                <label className="form-label" htmlFor="mul_1">
                  गाव
                </label>
                <Select
                  // isClearable={true}
                  placeholder="गाव"
                  name="गाव"
                  value={
                    villageOption.find(
                      (option) => option.value === villageId
                    ) || null
                  }
                  options={villageOption}
                  onChange={handleVillageChange}
                  className="react-select"
                  classNamePrefix="select"
                />
              </div>

              <div className=" mt-8  flex justify-end">
                <button
                  className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="legend-ring">
              <BarGraph year={yearName} village={villageName} gath={gathName} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportGraph;
