import { ref } from "vue";
import type { Airport, Flight, FlightDetail } from "./types";
import Flights from "./API/Flights";
import { asyncTimeout } from "./utils";

export const allAirports = ref<Airport[]>([])
export const searchedAirports = ref<Airport[]>([])

export const allFlights = ref<Flight[]>([])
export const searchedFlights = ref<Flight[][]>([])

export const dropdownExpanded = ref<boolean>(false)
export const currentTab = ref<'Arrivals' | 'Departures'>('Arrivals')
export const currentPage = ref<number>(1)

export const airportKeyword = ref('')
export const flightsPerPage = ref<number>(12)
export const flightKeyword = ref('')

export const flightDetails = ref<FlightDetail | undefined>(undefined)

export const flightsLoading = ref<boolean>(false)
export const flightDetailsLoading = ref<boolean>(false)

// Set a default airport
export const selectedAirport = ref<Airport>({
    city: "Sydney",
    iata_code: "SYD",
    is_major: 1,
    name: "Sydney International Airport"
})

export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return
    let date = new Date(dateString).toLocaleTimeString(navigator.language, { hourCycle: 'h24', hour: '2-digit', minute: '2-digit' })
    return date
}

export const getAirports = async () => {
    flightsLoading.value = true
    try {
        const result = await Flights.getAustralianAirports()
        allAirports.value = result.filter((airport: Airport) => airport.is_major === 1 && airport.iata_code != null)
        searchedAirports.value = result.filter((airport: Airport) => airport.is_major === 1 && airport.iata_code != null)
    } catch (error) {
        console.log('Error getting airports', error)
        throw Error
    } finally {
        flightsLoading.value = false
    }
}

export const searchAirports = () => {
    if (airportKeyword.value.length > 0) {
        searchedAirports.value = allAirports.value.filter((airport: Airport) => (airport.name.toLowerCase().includes(airportKeyword.value.toLowerCase()) || airport.iata_code.toLowerCase().includes(airportKeyword.value.toLowerCase())))
    } else {
        searchedAirports.value = allAirports.value
    }
}

export const getFlights = async (airportCode: string) => {
    flightsLoading.value = true
    if (currentTab.value === 'Arrivals') {
        try {
            const result = await Flights.getAirportArrivals(airportCode)
            allFlights.value = result
            searchedFlights.value = paginateFlights(result, flightsPerPage.value)
        } catch (error) {
            console.log('Error getting flights', error)
            throw Error
        } finally {
            flightsLoading.value = false
        }
    } else {
        try {
            const result = await Flights.getAirportDepartures(airportCode)
            allFlights.value = result
            searchedFlights.value = paginateFlights(result, flightsPerPage.value)
        } catch (error) {
            console.log('Error getting flights', error)
            throw Error
        } finally {
            flightsLoading.value = false
        }
    }
}

export const selectAirport = (airport: Airport) => {
    dropdownExpanded.value = false
    selectedAirport.value = airport
    currentPage.value = 1
    airportKeyword.value = ''
    getFlights(airport.iata_code)
}

export const paginateFlights = (allFlights: Flight[], amount: number) => {
    let flightPages: Array<Flight[]> = []
    let flightPage: Flight[] = []

    allFlights
        .filter(flight => flight.flight_iata != null)
        .map((flight, index) => {
            if (allFlights.length === 1) {
                flightPage.push(flight)
                flightPages.push(flightPage)
            } else if (index === 0) {
                flightPage.push(flight)
            } else if (index === allFlights.length - 1) {
                flightPage.push(flight)
                flightPages.push(flightPage)
            } else if (index % amount !== 0) {
                flightPage.push(flight)
            } else {
                flightPages.push(flightPage)

                flightPage = []
                flightPage.push(flight)
            }
        })

    return flightPages
}

export const searchFlights = () => {
    if (flightKeyword.value.length > 0) {
        let filteredFlights = allFlights.value.filter(flight => flight.flight_iata && flight.flight_iata.toLowerCase().includes(flightKeyword.value.toLowerCase()))
        searchedFlights.value = paginateFlights(filteredFlights, flightsPerPage.value)
    } else {
        searchedFlights.value = paginateFlights(allFlights.value, flightsPerPage.value)
    }
}

export const getFlight = async (flightCode: string) => {
    flightDetailsLoading.value = true
    try {
        const result = await Flights.getFlight(flightCode)
        flightDetails.value = result
        console.log('flight details', result)
    } catch (error) {
        console.log('Error getting flight details', error)
        throw Error
    } finally {
        flightDetailsLoading.value = false
    }
}