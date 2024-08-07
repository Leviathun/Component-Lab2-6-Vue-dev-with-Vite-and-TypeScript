<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue';
  import { type Event } from '@/types'
  import { ref , onMounted, computed, watchEffect } from 'vue'
  import EventService from '@/services/EventService';

  const events = ref<Event[] | null>(null)
  const totalEvents = ref(0)
  const hasNexPage = computed(() => {
    const totalPages = Math.ceil(totalEvents.value / 2)
    return page.value < totalPages
  })
  const props = defineProps ({
    page: {
     type: Number,
     required: true
   }
})

const page = computed (() => props.page)
  onMounted (() => {
    watchEffect(() => {
      events.value = null
      EventService.getEvents(2, page.value)
        .then((response) => {
          events.value = response.data
          totalEvents.value = response.headers['x-total-count']
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
    })
  })
</script>

<template>
  <h1>Event For Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
  <RouterLink
    :to="{ name: 'event-list-view', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    >Prev Page</RouterLink
  >

  <RouterLink 
    :to="{ name: 'event-list-view', query: { page: page + 1 } }" 
    rel="next"
    v-if="hasNexPage"
    >Next Page</RouterLink
  >
  
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
