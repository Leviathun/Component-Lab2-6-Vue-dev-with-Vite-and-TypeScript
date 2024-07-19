<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Event from '@/types/Event'
import EventService from '@/services/EventService';
const event = ref<Event>(null)
const id = ref<number>(5928101)
onMounted(() => {
  // fetch event (by id) and set local event data
  EventService.getEvent (id.value)
    .then((response) => {
        event.value = response.data
    })
    .catch((error) => {
        console.error ('There was an error!', error)
    })
})

</script>
<template>
  <div  v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event. location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
