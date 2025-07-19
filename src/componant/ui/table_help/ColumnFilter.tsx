import React from "react";

type ColumnFilterProps = {
    column: {
        filterValue?: string;
        Header?: string;
    };
    setFilter: (value: string | undefined) => void;
};

export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column, setFilter }) => {
    return (
        <span>
            <input
                value={column?.filterValue || ""}
                onChange={(e) => setFilter(e.target.value || undefined)}
                placeholder={`Search ${column.Header}`}
                style={{ marginBottom: "10px", marginRight: "10px" }}
            />
        </span>
    );
};