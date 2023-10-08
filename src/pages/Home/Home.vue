

<script setup lang="ts">

import './Home.css'
import { computed, onMounted, ref, watch } from 'vue';

import FlightToggle from '@/components/FlightToggle/FlightToggle.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import FlightListItem from '@/components/FlightListItem/FlightListItem.vue';
import chevronLeft from '@/assets/Chevron-Left.svg'
import chevronRight from '@/assets/Chevron-Right.svg'
import loadingLottie from '@/assets/loadingLottie.json'
import planeArrival from '@/assets/plane-arrival.svg'
import planeDeparture from '@/assets/plane-departure.svg'
import { formatDate, airportKeyword, searchAirports, getAirports, selectedAirport, getFlights, allFlights, searchedFlights, flightsLoading, currentTab, currentPage, flightKeyword, searchFlights } from '@/GlobalValues';

const changeTab = (selectedTab: 'Arrivals' | 'Departures') => {
  if (flightsLoading.value) return
  currentTab.value = selectedTab
}

const renderTitleIcon = computed(() => {
  switch (currentTab.value) {
    case "Arrivals": return planeArrival
    case "Departures": return planeDeparture
  }
})

const increasePageNumber = () => {
  if (currentPage.value === allFlights.value.length) return
  currentPage.value = currentPage.value + 1
}

const decreasePageNumber = () => {
  if (currentPage.value === 1) return
  currentPage.value = currentPage.value - 1
}

watch(airportKeyword, () => {
  // Filter list as user types
  searchAirports()
})

watch(flightKeyword, () => {
  // Filter list as user types
  searchFlights()
})

watch(currentTab, () => {
  allFlights.value = []
  getFlights(selectedAirport.value.iata_code)
})

watch(searchedFlights, () => {
  // If list is shortened, change the page so that user isn't stuck on impossible page (eg. Page 4 of 1)
  if (searchedFlights.value.length >= currentPage.value) return
  if (searchedFlights.value.length === 0) return currentPage.value = 1
  currentPage.value = searchedFlights.value.length
})

onMounted(() => {
  // Guard to avoid calling the API again if the user returns from the flight details page
  if (allFlights.value[0] !== undefined) return
  getAirports()
  getFlights(selectedAirport.value.iata_code)
})
</script>

<template>
<section class="Content__Container">
    <div class="Flights__Main">


      <div class="Flights__Config">
        <Dropdown />
        <FlightToggle :current-tab="currentTab" :change-tab="(tab: 'Arrivals' | 'Departures') => changeTab(tab)" />
      </div>

      <div class="Flights__Container">

        <div class="Flights__Header">

          <div class="Flights__Title">
            <img :src="(renderTitleIcon)" />
            <h2>{{ currentTab }} in {{ selectedAirport.city }}</h2>
          </div>

          <input placeholder="Search by flight number..." v-model="flightKeyword">

        </div>

        <div class="Flights__Results">

          <div class="Flights__Results__Header">
            <div></div>
            <div class="Flights__Results__Cell">{{ currentTab === 'Arrivals' ? 'STA' : 'STD' }}</div>
            <div class="Flights__Results__Cell">{{ currentTab === 'Arrivals' ? 'ETA' : 'ETD' }}</div>
            <div class="Flights__Results__Cell boldText">FLIGHT</div>
            <div class="Flights__Results__Cell">{{ currentTab === 'Arrivals' ? 'FROM' : 'TO' }}</div>
            <div class="Flights__Results__Cell">GATE</div>
            <div class="Flights__Results__Cell">STATUS</div>
            <div></div>
          </div>

          <div class="Flights__List">
            <div v-if="flightsLoading" class="Flights__List__Section">
              <Vue3Lottie :animationData="loadingLottie" :height="64" :width="64" />
              Loading flights...
            </div>

            <template v-for="(flight, index) in searchedFlights[currentPage - 1]" v-else-if="currentTab === 'Departures'">
              <li>
                <FlightListItem :key='index' :flight-number='flight.flight_iata' :gate='flight.dep_gate'
                  :estimated-time='formatDate(flight.dep_estimated)' :code="flight.arr_iata"
                  :time='formatDate(flight.dep_time)' :status="flight.status" :airline="flight.airline_iata" />
              </li>
            </template>

            <template v-for="(flight, index) in searchedFlights[currentPage - 1]" v-else-if="searchedFlights[0]">
              <li>
                <FlightListItem :key='index' :flight-number='flight.flight_iata' :gate='flight.arr_gate'
                  :estimated-time='formatDate(flight.arr_estimated)' :code="flight.dep_iata"
                  :time='formatDate(flight.arr_time)' :status="flight.status" :airline="flight.airline_iata" />
                  
              </li>
            </template>

            <div v-else class="Flights__List__Section">
              No Flights in the next 24 hours for this Airport
            </div>

          </div>

        </div>

        <div class="Page__Number__Main" v-if="!flightsLoading && searchedFlights[0]">

          <button @click="() => decreasePageNumber()" :class="currentPage === 1 && 'Button__Disabled'">
            <img :src="chevronLeft">
          </button>
          <p>Page {{ currentPage }} of {{ searchedFlights.length }}</p>
          <button @click="() => increasePageNumber()" :class="currentPage === searchedFlights.length && 'Button__Disabled'">
            <img :src="chevronRight">
          </button>

        </div>
      </div>

    </div>
  </section>
</template>