<script setup lang="ts">
import { useRoute } from 'vue-router';
import './FlightDetails.css'
import { onMounted } from 'vue';
import { getFlight, flightDetails, formatDate, flightDetailsLoading } from '@/GlobalValues'
import StatusTag from '@/components/StatusTag/StatusTag.vue'
import arrowLeft from '@/assets/Arrow-Left.svg'
import plane from '@/assets/plane.svg'
import loadingLottie from '@/assets/loadingLottie.json'

const route = useRoute()

console.log(route.params.flightId)

onMounted(() => {
    if (typeof route.params.flightId != 'string') return
    getFlight(route.params.flightId)
})

</script>

<template>
    <section class="Content__Container">
        <div class="FlightDetails__Main" v-if="flightDetails">

            <RouterLink to="/">
                <button class="Back__Button" @click="flightDetails = undefined">
                    <img :src="arrowLeft">
                    <p>Go back</p>
                </button>
            </RouterLink>

            <div class="FlightDetails__Overview">
                <div class="FlightDetails__Stop Flight__Details__Departure">
                    <div class="FlightDetails__Code">{{ flightDetails.dep_iata }}</div>
                    <div v-if="flightDetails.status === 'scheduled' && flightDetails.dep_estimated">{{
                        formatDate(flightDetails.dep_estimated) }}</div>
                    <div v-else-if="flightDetails.status === 'scheduled' && !flightDetails.dep_estimated">{{
                        formatDate(flightDetails.dep_time) }}</div>
                    <div v-else-if="flightDetails.dep_actual">{{ formatDate(flightDetails.dep_actual) }}</div>
                    <div v-else="flightDetails.dep_actual">{{ formatDate(flightDetails.dep_time) }}</div>
                </div>

                <div class="FlightDetails__SubInfo">
                    <div class="FlightDetails__Flight__Code">{{ flightDetails.flight_iata }}</div>
                    <img v-if="flightDetails.percent && flightDetails.percent <= 100 && flightDetails.status === 'en-route'"
                        :style="'left:' + flightDetails.percent + '%;'" class="FlightDetails__PlaneIcon" :src="plane">
                    <hr>
                    <StatusTag :status="flightDetails.status" />
                </div>

                <div class="FlightDetails__Stop Flight__Details__Arrival">
                    <div class="FlightDetails__Code">{{ flightDetails.arr_iata }}</div>
                    <div>{{ formatDate(flightDetails.arr_actual) ?? formatDate(flightDetails.arr_estimated) }}</div>
                </div>
            </div>

            <div class="FlightDetails__SchedulingCard">
                <div class="FlightDetails__SchedulingHeader">
                    <div>{{ flightDetails.dep_city }} Departure</div>
                    <p>Terminal {{ flightDetails.dep_terminal }} - Gate {{ flightDetails.dep_gate }}</p>
                </div>

                <hr>

                <div class="FlightDetails__SchedulingDetails">
                    <div>Scheduled</div>
                    <div>{{ formatDate(flightDetails.dep_time) }}</div>

                    <div v-if="flightDetails.dep_actual">Actual</div>
                    <div v-else-if="flightDetails.dep_estimated">Estimated</div>

                    <div v-if="flightDetails.dep_actual">{{ formatDate(flightDetails.dep_actual) }}</div>
                    <div v-else-if="flightDetails.dep_estimated">{{ formatDate(flightDetails.dep_estimated) }}</div>
                </div>
            </div>

            <div class="FlightDetails__SchedulingCard">
                <div class="FlightDetails__SchedulingHeader">
                    <div>{{ flightDetails.arr_city }} Arrival</div>
                    <p>Terminal {{ flightDetails.arr_terminal }} - Gate {{ flightDetails.arr_gate }}</p>
                </div>

                <hr>

                <div class="FlightDetails__SchedulingDetails">
                    <div>Scheduled</div>
                    <div>{{ formatDate(flightDetails.arr_time) }}</div>

                    <div v-if="flightDetails.arr_actual">Actual</div>
                    <div v-else-if="flightDetails.arr_estimated">Estimated</div>

                    <div v-if="flightDetails.arr_actual">{{ formatDate(flightDetails.arr_actual) }}</div>
                    <div v-else-if="flightDetails.arr_estimated">{{ formatDate(flightDetails.arr_estimated) }}</div>
                </div>
            </div>
        </div>

        <div v-if="flightDetailsLoading" class="Flights__List__Section">
            <Vue3Lottie :animationData="loadingLottie" :height="64" :width="64" />
            Loading flight details...
        </div>
</section></template>