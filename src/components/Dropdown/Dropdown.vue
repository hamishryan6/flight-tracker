<script setup lang="ts">
import './Dropdown.css'
import chevron from './../../assets/Chevron-Down.svg'
import { airportKeyword, searchedAirports, selectedAirport, dropdownExpanded, selectAirport } from '@/GlobalValues';

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
}

</script>

<template>
    <div class="Airport__Dropdown">
        <button class="Airport__Dropdown__Selection" @click="dropdownExpanded = true" v-if="!dropdownExpanded">
            <p><span class="boldText">{{ selectedAirport.iata_code }}</span> - {{ selectedAirport.name }}</p>
            <img :src="chevron" class="Airport__Dropdown__Chevron" />
        </button>

        <input v-focus class="Airport__Dropdown__Selection" v-if="dropdownExpanded" :placeholder='`${selectedAirport.iata_code} - ${selectedAirport.name}`'
        v-model="airportKeyword"/>


        <div class="Airport__Dropdown__Options" v-if="dropdownExpanded">
            <template v-for="(airport, index) in searchedAirports">
                <li v-if="airport.iata_code != null && airport.is_major === 1">
                    <a @click="() => selectAirport(airport)"><span class="boldText">{{ airport.iata_code }}</span> - {{ airport.name }}</a>
                </li>
            </template>
        </div>

        <div v-if="dropdownExpanded" class="Dropdown__Cover" @click="dropdownExpanded = false"></div>
    </div>
</template>