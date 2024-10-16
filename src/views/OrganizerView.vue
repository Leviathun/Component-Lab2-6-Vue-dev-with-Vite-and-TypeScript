<script setup lang="ts">
  import OrganizerCard from '@/components/OrganizerCard.vue'
  import OrganizerDetail from '@/views/OrganizerDetail.vue'
  import type { Organizer } from '@/types'
  import { ref, onMounted, computed, watchEffect } from 'vue'
  import OrganizerService from '@/services/OrgService'
  const organizers = ref<Organizer[] | null>(null)
  const totalOrganizers = ref(0)
  const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalOrganizers.value / 1)
    return page.value < totalPages
  })
  const props = defineProps({
    page: {
      type: Number,
      required: true
    }
  })
  const page = computed(() => props.page)
  onMounted(() => {
    watchEffect(() => {
      OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
      totalOrganizers.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
    <!-- new element-->
  <div class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer"></OrganizerCard>
    <OrganizerDetail v-for="organizer in organizers" :key="'details-' + organizer.id" :organizer="organizer" ></OrganizerDetail>
  <div class="flex w-[290px]">
  <RouterLink
    id="page-prev"
    :to="{ name: 'event-list-view', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    class="flex-1 no-underline text-[#2c3e50] text-left"
    >&#60; Prev Page</RouterLink
    >

    <RouterLink 
    id="page-next"
    :to="{ name: 'event-list-view',query: { page: page + 1 } }"
    rel="next"
    v-if="hasNextPage"
    class="flex-1 no-underline text-[#2c3e50] text-right"
    >Next Page &#62;</RouterLink
    >
  </div>
</div>
</template>