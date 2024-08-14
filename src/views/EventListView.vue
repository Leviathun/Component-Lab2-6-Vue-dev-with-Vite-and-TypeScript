<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue';
  import { type Event } from '@/types'
  import { ref , onMounted, computed, watchEffect } from 'vue'
  import EventService from '@/services/EventService';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  const events = ref<Event[] | null>(null)
  const totalEvents = ref(0)

  const props = defineProps ({
    page: {
     type: Number,
     required: true
   },
   pageSize: {
      type: Number,
      required: true
    }
})

const pageSize = ref(props.pageSize);

const page = computed (() => props.page)
  onMounted (() => {
    watchEffect(() => {
      EventService.getEvents(pageSize.value, page.value)
        .then((response) => {
          events.value = response.data
          totalEvents.value = parseInt(response.headers['x-total-count']);
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
    })
  })
  
  const hasNexPage = computed(() => {
    const totalPages = Math.ceil(totalEvents.value / pageSize.value)
    return page.value < totalPages
  })

  const updatePageSize = (size: number) => {
    pageSize.value = size;
    router.push({ query: { ...route.query, pageSize: size, page: 1 }});
  };
</script>

<template>
  <h1>Event For Good</h1>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  
    <div class="flex w-[290px]">
    <RouterLink
      class="flex-1 no-underline decoration-[#2c3e50] text-left"
      :to="{ name: 'event-list-view', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >&#60; Prev Page</RouterLink
    >

    <RouterLink 
      class="flex-1 no-underline decoration-[#2c3e50] text-right"
      :to="{ name: 'event-list-view', query: { page: page + 1 } }" 
      rel="next"
      v-if="hasNexPage"
      >Next Page &#62;</RouterLink
    >
    </div>
  </div>
  <div class="page-size">
      <label for="page-size">Events per page: </label>
      <select class="border rounded" v-model="pageSize" @change="updatePageSize(pageSize)">
        <option :value="2">2</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
    </div>
</template>

<style scoped>
</style>
