<script setup lang="ts">
import './FlightToggle.css'
import { computed } from 'vue'
import { flightsLoading } from '@/GlobalValues';

const props = defineProps<{
    currentTab: 'Arrivals' | 'Departures',
    changeTab: (tab: 'Arrivals' | 'Departures') => void
}>()

const renderArrivalsClass = computed(() => ({
    'Toggle__Selected': props.currentTab === 'Arrivals'
}))

const renderDepraturesClass = computed(() => ({
    'Toggle__Selected': props.currentTab === 'Departures'
}))

</script>

<template>
    <div class="Flight__Toggle" :class="flightsLoading && 'Flight__Toggle__Disabled'">
        <button class="Flight__Toggle__Button" :class="renderArrivalsClass" @click="changeTab('Arrivals')">
            Arrivals
        </button>
        <button class="Flight__Toggle__Button" :class="renderDepraturesClass" @click="changeTab('Departures')">
            Departures
        </button>
    </div>
</template>