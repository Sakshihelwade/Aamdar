import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import Card from "../../../components/ui/Card";
import * as XLSX from "xlsx";

// Grouping function
function groupDataByGathAndGan(data) {
  const groupedGaths = {};

  data.forEach((item) => {
    const { gathName, ganName } = item;

    // Initialize gath if not already present
    if (!groupedGaths[gathName]) {
      groupedGaths[gathName] = {};
    }

    // Initialize gan if not already present
    if (!groupedGaths[gathName][ganName]) {
      groupedGaths[gathName][ganName] = [];
    }

    // Push the item into the respective gan group
    groupedGaths[gathName][ganName].push(item);
  });

  return groupedGaths;
}

// Main component
function GatGanSummary() {
  const [allVoter, setAllVoter] = useState([]);
  const [totalMaleCount, setTotalMaleCount] = useState(0);
  const [totalFemaleCount, setTotalFemaleCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getAllVoters = () => {
      axios
        .get(`${base_url}/api/surve/summery-By-Gath-Gan`)
        .then((resp) => {
          const data = resp.data.data;
          setAllVoter(data);

          let maleSum = 0;
          let femaleSum = 0;
          let grandTotal = 0;

          data.forEach((voter) => {
            maleSum += voter.maleCount;
            femaleSum += voter.femaleCount;
            grandTotal += voter.totalCount;
          });

          setTotalMaleCount(maleSum);
          setTotalFemaleCount(femaleSum);
          setTotalCount(grandTotal);
        })
        .catch((error) => {
          console.log(error);
          // toast.warning('No results found for the provided search criteria');
        });
    };

    getAllVoters();
  }, []);

  const generateExcel = (data) => {
    const rows = data.map((item) => ({
      ['गट']: item.gathName, 
      ['गण']: item.ganName, 
      ['गाव']: item.villageName, 
      ['पुरुष']: item.maleCount, 
      ['महिला']: item.femaleCount, 
      ['एकूण']: item.totalCount,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Namewise Data");
    XLSX.writeFile(wb, "मतदार.xlsx");
  };

  const handleExcel = () => {
    const url = `${base_url}/api/surve/summery-By-Gath-Gan`;
    axios
      .get(url)
      .then((resp) => {
        var voters = resp.data.data;
        generateExcel(voters);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const groupedGaths = groupDataByGathAndGan(allVoter);

  return (
    <div>
      <Card>
        <div className="flex justify-between mb-4">
          <h6 className="font-bold text-[#b91c1c]">गट गणनुसार</h6>
          <div className="flex gap-6">
            <h6 className="font-bold text-orange-400 text-lg">महिला: {totalFemaleCount}</h6>
            <h6 className="font-bold text-green-500 text-lg">पुरुष: {totalMaleCount}</h6>
            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण: {totalCount}</h6>
          </div>
          <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md">Excel</button>
        </div>
      </Card>

      {Object.keys(groupedGaths).map((gathName) => (
        <div key={gathName}>
          {Object.keys(groupedGaths[gathName]).map((ganName) => {
            const ganData = groupedGaths[gathName][ganName];
            const ganMaleTotal = ganData.reduce((sum, item) => sum + item.maleCount, 0);
            const ganFemaleTotal = ganData.reduce((sum, item) => sum + item.femaleCount, 0);
            const ganOverallTotal = ganData.reduce((sum, item) => sum + item.totalCount, 0);

            return (
              <Card key={ganName} className="mb-4 mt-4">
                <table className="min-w-full bg-white border border-gray-300 mb-2">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 border-b border-gray-300">
                      <th className="py-1 px-4 border-r border-gray-300 text-left font-semibold">गट</th>
                      <th className="py-1 px-4 border-r border-gray-300 text-left font-semibold">गण</th>
                      <th className="py-1 px-4 border-r border-gray-300 text-left font-semibold">गाव</th>
                      <th className="py-1 px-4 border-r border-gray-300 text-left font-semibold">पुरुष</th>
                      <th className="py-1 px-4 border-r border-gray-300 text-left font-semibold">महिला</th>
                      <th className="py-1 px-4 text-left font-semibold">एकूण</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ganData.map((item, idx) => (
                      <tr key={idx} className="text-gray-800 border-b border-gray-300">
                        <td className="py-1 px-4 border-r border-gray-300">{gathName}</td>
                        <td className="py-1 px-4 border-r border-gray-300">{ganName}</td>
                        <td className="py-1 px-4 border-r border-gray-300">{item.villageName}</td>
                        <td className="py-1 px-4 border-r border-gray-300">{item.maleCount}</td>
                        <td className="py-1 px-4 border-r border-gray-300">{item.femaleCount}</td>
                        <td className="py-1 px-4">{item.totalCount}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold text-gray-800 border-t border-gray-300 bg-gray-100">
                      <td className="py-1 px-4 border-r border-gray-300" colSpan={3}>एकूण</td>
                      <td className="py-1 px-4 border-r border-gray-300">{ganMaleTotal}</td>
                      <td className="py-1 px-4 border-r border-gray-300">{ganFemaleTotal}</td>
                      <td className="py-1 px-4">{ganOverallTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GatGanSummary;
