import React from 'react'
import ReportGraph from './ReportGraph/ReportGraph'
import BarGraph1 from './ReportGraph/BarGraph1'
import PieChart from './ReportGraph/PieChart'


const Ahawal = () => {
  return (
    <div>
        {/* <div className=' grid grid-cols-2 gap-2'> */}
      <ReportGraph/>
      <BarGraph1/>
      <PieChart/>
     
      </div>
    // </div>
  )
}

export default Ahawal
