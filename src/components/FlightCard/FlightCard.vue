<script setup lang="ts">
import './FlightCard.css'

defineProps<{
    departureCode: string,
    departureTime: string,
    arrivalCode: string,
    arrivalTime: string,
    arrivingGate: string,
    flightNumber: string,
}>()

const formatDate = (dateString: string) => {
    let date = new Date(dateString).toLocaleTimeString(navigator.language, {hourCycle: 'h24', hour: '2-digit', minute:'2-digit' })
    return date
}

</script>

<template>
    <div class="Flight__Card">
        <div class="Flight__Card__Departure">
            <h3>{{ departureCode }}</h3>
            <h4>{{ formatDate(departureTime) }}</h4>
        </div>

        <div class="Flight__Card__Details">
            <div class="Flight__Number">{{ flightNumber }}</div>
            <hr>
            <div class="Flight__SubInfo">Arriving at Gate {{ arrivingGate }}</div>
        </div>

        <div class="Flight__Card__Arrival">
            <h3>{{ arrivalCode }}</h3>
            <h4>{{ formatDate(arrivalTime) }}</h4>
        </div>
    </div>
</template>