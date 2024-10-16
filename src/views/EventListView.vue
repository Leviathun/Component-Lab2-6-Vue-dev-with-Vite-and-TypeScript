<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue';
  import { type Event } from '@/types'
  import { ref , onMounted, computed, watchEffect } from 'vue'
  import EventService from '@/services/EventService';
  import { useRoute, useRouter } from 'vue-router';
  import BaseInput from '@/components/BaseInput.vue';

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
  onMounted(() => {
    watchEffect(() => {
      updateKeyword()
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

  const keyword= ref('')
  
  function updateKeyword(value: string) {
    let queryFunction;
    if (keyword.value === '') {
      queryFunction = EventService.getEvents(pageSize.value, page.value)
    }else {
      queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
    }
    queryFunction.then((response) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvents.value)
    }).catch(() => {
      router.push({ name: 'NetworkError' })
    })
  }
</script>

<template>
  <h1>Event For Good</h1>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search ..."
        @input="updateKeyword"
        class="w-full"/>
    </div>
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
        <option :value="1">1</option>
        <option :value="3">3</option>
        <option :value="10">10</option>
      </select>
    </div>
</template>

<style scoped>
</style>
