export type Flight = {
    flight_iata: string | null
    airline_iata: string | null
    status: 'scheduled' | 'cancelled' | 'active' | 'landed',
    dep_iata: string
    dep_time: string
    dep_estimated: string
    dep_gate: string | null | undefined
    arr_iata: string
    arr_time: string
    arr_estimated: string
    arr_gate: string | null
}

export type FlightDetail = {
    flight_iata: string
    airline_iata: string
    status: 'scheduled' | 'cancelled' | 'en-route' | 'landed',
    dep_iata: string
    dep_time: string
    dep_estimated: string
    dep_actual: string
    dep_gate: string
    dep_terminal: string
    dep_city: string
    arr_iata: string
    arr_time: string
    arr_estimated: string
    arr_actual: string
    arr_gate: string
    arr_terminal: string
    arr_city: string
    percent: number
}

export type Airport = {
    name: string,
    iata_code: string,
    city: string,
    is_major: 1 | null
}