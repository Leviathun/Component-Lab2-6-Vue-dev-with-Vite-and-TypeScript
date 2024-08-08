<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const event = ref<Event | null>(null)
const props = defineProps ({
    id: {
        type: String,
        required: true
    }
})
onMounted (() => {
    EventService.getEvent(parseInt(props.id))
        .then((response) => {
            event.value = response.data
        })
        .catch((error) => {
        console.error('There was an error!', error)
        })
})
</script>
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <nav>
            <RouterLink :to="{ name: 'event-detail-view', params: { id } }">Details</RouterLink>
            |
            <RouterLink :to="{ name: 'event-register-view', params: { id } }">Register</RouterLink>
            |
            <RouterLink :to="{ name: 'event-edit-view', params: { id } }">Edit</RouterLink>
        </nav>
        <RouterView :event="event" />
    </div>
</template>

