import React, { useContext, useEffect, useState } from "react";
import { ChartColumn } from "./ChartColumn";
import { DataContext } from "../context/DataContext";
import { IHomeworld } from "../models";

export const Chart: React.FC = () => {
  const chartPlanets = useContext(DataContext)?.homeWorlds;
  const [maxPopulation, setMaxPopulation] = useState<number>();

  const getMaxPopulation = () => {
    const max =
      chartPlanets &&
      Math.max(...chartPlanets.map((planet) => +planet.population));
    max && setMaxPopulation(max);
  };

  const getRelativePercent = (planet: IHomeworld) => {
    const population = +planet.population;
    return maxPopulation && +((population / maxPopulation) * 100).toFixed(4);
  };

  useEffect(() => {
    chartPlanets && getMaxPopulation();
  }, [chartPlanets]);

  return (
    <div className="chart-component">
      <h1>Population Chart</h1>
      <div className="chart-body">
        {chartPlanets &&
          chartPlanets.map((homeWorld, i) => (
            <ChartColumn
              relativePercent={getRelativePercent(homeWorld)}
              homeWorld={homeWorld}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};
