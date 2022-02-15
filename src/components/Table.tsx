import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const Table: React.FC = () => {
  const  tableValues  = useContext(DataContext);

  return (
    <div className="table-component">
      <h1>Population Table</h1>
      {tableValues && (
        <div className="vehicle-table">
          <div>
            <b>Vehicle name with the largest sum</b>
          </div>
          <div>{tableValues.tableVehicles[0].name}</div>
          <div>
            <b>Related home planets and their respective population</b>
          </div>
          <div>
            {tableValues.biggestHomeWorld?.name}, {tableValues.biggestHomeWorld?.population}
          </div>
          <div>
            <b>Related pilot names</b>
          </div>
          <div>{tableValues.TablePilots[0].name}</div>
        </div>
      )}
    </div>
  );
};
