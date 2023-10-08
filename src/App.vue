<script setup lang="ts">
import { RouterView } from 'vue-router'

import './App.css'

// const getPopularAirlines = (flights: Flight[]) => {
//   let airlines: any = {}
//   flights.map((flight, index) => {
//     if (flight.airline_iata == null) return
//     let airlineCodes = Object.keys(airlines)
//     if (airlineCodes.indexOf(flight.airline_iata) === -1) {
//       airlines[flight.airline_iata] = 1
//     } else {
//       airlines[flight.airline_iata] = airlines[flight.airline_iata] + 1
//     }
//   })
//   console.log('airlines', airlines)
// }

</script>

<template>
  <header>
    <!-- <div class="Banner">Welcome to the home of Australian flight tracking</div> -->
    <nav>
      <img src="./assets/Logo.png" class="Nav__Logo" />
      <ul>
        <li>Book flights</li>
        <li>Flight tracker</li>
      </ul>
    </nav>
  </header>

  <RouterView />

</template>