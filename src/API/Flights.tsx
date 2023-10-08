import type { Flight, FlightDetail } from "@/types";
import { API } from "./API";

const apiKey = `api_key=${}`

namespace Flights {

    export const getAirportArrivals = async (airportCode: string): Promise<Flight[]> => {
        try {
            const { data } = await API.get(`schedules?${apiKey}&arr_iata=${airportCode}&_fields=flight_iata,airline_iata,status,dep_iata,dep_time,dep_estimated,dep_gate,arr_iata,arr_time,arr_estimated,arr_gate`);
            return data.response
        } catch (error) {
            console.log('error getting airport arrival flights', error)
            throw Error
        }
    }

    export const getAirportDepartures = async (airportCode: string): Promise<Flight[]> => {
        try {
            const { data } = await API.get(`schedules?${apiKey}&dep_iata=${airportCode}&_fields=flight_iata,airline_iata,status,dep_iata,dep_time,dep_estimated,dep_gate,arr_iata,arr_time,arr_estimated,arr_gate`);
            return data.response
        } catch (error) {
            console.log('error getting airport departure flights', error)
            throw Error
        }
    }

    export const getFlight = async (flightCode: string): Promise<FlightDetail> => {
        try {
            const { data } = await API.get(`flight?${apiKey}&flight_iata=${flightCode}`);
            return data.response
        } catch (error) {
            console.log('error getting flight', error)
            throw Error
        }
    }

    export const getAustralianAirports = async () => {
        try {
            const { data } = await API.get(`airports?${apiKey}&country_code=AU&_fields=name,iata_code,city,is_major`)
            return data.response
        } catch (error) {
            console.log('error getting airports', error)
            throw Error
        }
    }
}

export default Flights