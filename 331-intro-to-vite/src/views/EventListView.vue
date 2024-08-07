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
  
  <div class="pagination">
  <RouterLink
    id="page-prev"
    :to="{ name: 'event-list-view', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    >&#60; Prev Page</RouterLink
  >

  <RouterLink 
    id="page-next"
    :to="{ name: 'event-list-view', query: { page: page + 1 } }" 
    rel="next"
    v-if="hasNexPage"
    >Next Page &#62;</RouterLink
  >
  </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
