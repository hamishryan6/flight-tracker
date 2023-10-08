<script setup lang="ts">
import './FlightListItem.css'
import StatusTag from './../StatusTag/StatusTag.vue'
import Emirates from './../../assets/Emirates.png'
import Etihad from './../../assets/Etihad.png'
import JetStar from './../../assets/JetStar.jpg'
import NewZealand from './../../assets/NewZealand.jpg'
import Qantas from './../../assets/Qantas.png'
import Qatar from './../../assets/Qatar.png'
import Rex from './../../assets/Rex.png'
import Singapore from './../../assets/Singapore.svg'
import Virgin from './../../assets/Virgin.png'

defineProps<{
    code: string,
    time: string | undefined,
    estimatedTime: string | undefined
    gate: string | null | undefined,
    flightNumber: string | null,
    airline: string | null,
    status: 'scheduled' | 'cancelled' | 'active' | 'landed'
}>()

const renderIcon = (airlineCode: string | null) => {
    switch (airlineCode) {
        case 'EK': return Emirates
        case 'EY': return Etihad
        case 'JQ': return JetStar
        case 'NZ': return NewZealand
        case 'QF': return Qantas
        case 'QR': return Qatar
        case 'ZL': return Rex
        case 'SQ': return Singapore
        case 'VA': return Virgin
        default: return
    }
}

</script>

<template>
    <RouterLink :to="flightNumber ? `/flightDetails/${flightNumber}` : '/'">
    <div class="ListItem__Main">
        <img :src="renderIcon(airline)" class="ListItem__Icon" />
        <div class="ListItem__Cell">{{ time }}</div>
        <div class="ListItem__Cell">{{ estimatedTime }}</div>
        <div class="ListItem__Cell boldText">{{ flightNumber }}</div>
        <div class="ListItem__Cell">{{ code }}</div>
        <div class="ListItem__Cell">{{ gate ?? 'TBD' }}</div>
        <StatusTag :status='status'/>
        <img>
    </div>
    </RouterLink>
</template>