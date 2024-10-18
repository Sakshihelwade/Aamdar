import React from "react";

const PrintDataTable = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <h2>Export Data Table</h2>
            {/* Include your ExportDataTable content here */}
            <ExportDataTable />
        </div>
    );
});

export default PrintDataTable;
