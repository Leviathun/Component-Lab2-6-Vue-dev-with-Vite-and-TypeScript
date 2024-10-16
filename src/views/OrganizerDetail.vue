<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OrganizerService from '@/services/OrgService';
import type { Organizer } from '@/types';
const route = useRoute();
const organizer = ref<Organizer | null>(null);
onMounted(() => {
  const id = route.params.id as string;
  OrganizerService.getOrganizerById(parseInt(id))
    .then((response) => {
      organizer.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching organizer:', error);
    });
});
</script>
<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <span>{{ organizer.address }}</span>
    <img v-for="image in organizer.imageUrl" :key="image" :src="image" alt="Organizer Image" class="organizer-detail-image" />
  </div>
</template>
<style scoped>
.organizer-detail-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>