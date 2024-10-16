<script setup lang="ts">
import { defineProps } from 'vue';
import type { Organizer } from '@/types';
const props = defineProps<{ organizer: Organizer }>();
</script>

<template>
    <div class="event-class">
        <RouterLink :to="{ name: 'organizer-detail-view', params: { id: organizer.id } }">
            <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
                <h2>{{ organizer.name }}</h2>
                <span>{{ organizer.address }}</span>
                <img v-for="image in organizer.imageUrl" :key="image" :src="image" alt="Organizer Image" class="organizer-image" />
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.organizer-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>