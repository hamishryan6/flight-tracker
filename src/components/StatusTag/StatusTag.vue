<script setup lang="ts">
import './StatusTag.css'

defineProps<{
    status: 'scheduled' | 'cancelled' | 'active' | 'landed' | 'diverted' | 'en-route'
}>()

const renderClass = (statusTag: 'scheduled' | 'cancelled' | 'active' | 'landed' | 'diverted' | 'en-route') => {
    switch (statusTag) {
        case 'scheduled': return 'StatusTag__Scheduled'
        case 'active': return 'StatusTag__Active'
        case 'landed': return 'StatusTag__Landed'
        case 'cancelled': return 'StatusTag__Cancelled'
        case 'diverted': return 'StatusTag__Cancelled'
        case 'en-route': return 'StatusTag__Active'
    }
}

</script>

<template>
    <div class="StatusTag__Main">
        <div class="StatusTag__Tag" :class="renderClass(status)">
            {{ status }}
        </div>
    </div>
</template>