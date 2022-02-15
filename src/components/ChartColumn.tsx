import React from "react";
import { IHomeworld } from "../models";

interface Props {
  homeWorld: IHomeworld;
  relativePercent:number | undefined;
}


export const ChartColumn: React.FC<Props> = ({ homeWorld, relativePercent }) => {

  const columnStyle = () =>{ return {height: `${relativePercent}%`}};
    
  return (
    <div className="chart-column">
      <div className="chart-column-top">
        <div className="chart-homeworld-population">{homeWorld.population}</div>
        <div style={columnStyle()} className="chart-homeworld-hieght"></div>
      </div>
      <div className="chart-column-bottom">
        <div className="chart-homeworld-name">{homeWorld.name}</div>
      </div>
    </div>
  );
};
