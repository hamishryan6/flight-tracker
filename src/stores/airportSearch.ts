import Flights from '@/API/Flights'
import type { Airport } from '@/types'
import { defineStore } from 'pinia'

export const useAirportSearchStore = defineStore('airportSearch', {
  state: () => {
    return {
      airports: [] as Airport[],
      searchResults: [] as Airport[],
    }
  },

  getters: {

    searchAirports: (state) => {
      console.log('searching airports')
      return (keyword: string) => {
        if (keyword.length > 0) {
          state.searchResults = state.airports.filter((airport: Airport) => (airport.name.toLowerCase().includes(keyword.toLowerCase()) || airport.iata_code.toLowerCase().includes(keyword.toLowerCase())))
        } else {
          state.searchResults = state.airports
        }
      }
    },
  },

  actions: {

    async getAirports() {
      try {
        const result = await Flights.getAustralianAirports()
        this.airports = result.filter((airport: Airport) => airport.is_major === 1 && airport.iata_code != null)
      } catch (error) {
        console.log('Error getting sirports', error)
        throw Error
      }
    },
  },

})