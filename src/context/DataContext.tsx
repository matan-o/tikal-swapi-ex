import React, { createContext, useEffect, useState } from "react";
import { IHomeworld, IPilot, IVehicle } from "../models";
import { init } from "../services/data-service";

interface IData{
    biggestHomeWorld: IHomeworld | undefined
    TablePilots: IPilot[]
    tableVehicles: IVehicle[]
    homeWorlds: IHomeworld[]
}

export const DataContext = createContext<IData | undefined>(null as any)

export const DataProvider: React.FC<any> = ({children}) => {
    const [data, setData] = useState<IData>()

    useEffect(()=>{
        init().then(results => setData(results))        
    },[])

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
