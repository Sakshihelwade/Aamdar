import React from 'react'

const ExportDataTable = () => {
  return (
    <div>
      <div className="p-1">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
              {/* Table Headers */}
              <th className="px-1 py-2 border border-gray-300">भाग/बूथ नं</th>
              <th className="px-1 py-2 border border-gray-300">अ.नं.</th>
              <th className="px-1 py-2 border border-gray-300">नाव</th>
              <th className="px-1 py-2 border border-gray-300">वय </th>
              <th className="px-1 py-2 border border-gray-300">लिंग </th>
              <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
              <th className="px-1 py-2 border border-gray-300">नवीन पत्ता</th>
              <th className="px-1 py-2 border border-gray-300">घर नं</th>
              <th className="px-1 py-2 border border-gray-300">पत्ता</th>
              <th className="px-1 py-2 border border-gray-300">कार्ड नं</th>
              <th className="px-1 py-2 border border-gray-300">मुळगाव</th>
              <th className="px-1 py-2 border border-gray-300">स्टेटस</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
              <tr
                className={`odd:bg-gray-100 even:bg-white`}
              >
                {/* Table Data */}
                <td className="px-1 py-2 border border-gray-300">abc</td>
                <td className="px-1 py-2 border border-gray-300">g.jh</td>
                <td className="px-1 py-2 border border-gray-300">nbnb</td>
                <td className="px-1 py-2 border border-gray-300">nb </td>
                <td className="px-1 py-2 border border-gray-300">nc</td>
                <td className="px-1 py-2 border border-gray-300">asdfg</td>
                <td className="px-1 py-2 border border-gray-300">xcvbn</td>
                <td className="px-1 py-2 border border-gray-300">xcvbn</td>
                <td className="px-1 py-2 border border-gray-300">xcvbn</td>
                <td className="px-1 py-2 border border-gray-300">xcvbnm</td>
                <td className="px-1 py-2 border border-gray-300">xcvbnm</td>
                <td className="px-1 py-2 border border-gray-300">fg</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ExportDataTable;