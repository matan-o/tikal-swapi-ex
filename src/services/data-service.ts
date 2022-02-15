import axios from 'axios';
import { BASE_API } from '../consts';
import { IHomeworld, IPilot, IVehicle } from '../models';

async function getVehicles(): Promise<IVehicle[]> {

    let response = await axios.get(`${BASE_API}/vehicles`)
    const vehicles: IVehicle[] = [...response.data.results]
    while (response.data.next) {
        response = await axios.get(response.data.next)
        vehicles.push(...response.data.results)
    };
    return vehicles.filter(v => v.pilots.length > 0);
}

async function getPilots(vehicles: IVehicle[]): Promise<IPilot[]> {

    const pilotsUrls = Array.from(new Set(
        vehicles.map(v => v.pilots).flat(1)))

    const pilots: IPilot[] = await Promise.all(
        pilotsUrls.map(url => axios.get(url)
            .then(p => p.data)))

    return pilots;
}

async function getHomeWorlds(pilots: IPilot[]): Promise<IHomeworld[]> {

    const homeWorldUrls = pilots.map(p => p.homeworld)
    const homeWorlds: IHomeworld[] = await Promise.all(
        homeWorldUrls.map(url => axios.get(url)
            .then(hw => hw.data)))
    return homeWorlds.filter(hw => !isNaN(+hw.population))
}

export async function init() {
    const vehicles = await getVehicles();
    const pilots = await getPilots(vehicles);
    const homeWorlds = await getHomeWorlds(pilots);

    const maxPopulation = Math.max(
        ...homeWorlds.map(hw => +hw.population)
    )
    const biggestHomeWorld = homeWorlds.find(
        (hw) => +hw.population === maxPopulation
    );
    const TablePilots = pilots.filter(
        (pilot) => pilot.homeworld === biggestHomeWorld?.url
    );
    const pilotUrls = TablePilots.map((p) => p.url);
    const tableVehicles = vehicles.filter((vehicle) => {
        return vehicle.pilots.some((vp) => {
            return pilotUrls.includes(vp);
        });
    });
    return {
        biggestHomeWorld,
        TablePilots,
        tableVehicles,
        homeWorlds,
    }
}