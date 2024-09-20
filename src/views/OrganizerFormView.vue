<script setup lang="ts">

import OrgService from '@/services/OrgService';
import { useRouter } from 'vue-router';
import type { Organizer } from '@/types'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message';
const organizer = ref<Organizer> ({
    id: 0,
    organizationName: "",
    address : ""
})
const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    OrgService.saveOrg(organizer.value)
        .then((response) => {
            router.push({ name: 'event-detail-view', params: { id: response.data.id } })
            store.updateMessage('You are successfully add a new org for ' + response.data.organizationName)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch (() => {
            router.push({ name: 'network-error-view' })
        })
}
</script>

<template>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Create an Organizer</h1>
      <form @submit.prevent="saveEvent" class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-3">Name your organization</h3>
          <div>
            <label for="organizationName" class="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              v-model="organizer.organizationName"
              id="organizationName"
              type="text"
              placeholder="Organization Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold mb-3">Where is your organization located?</h3>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              v-model="organizer.address"
              id="address"
              type="text"
              placeholder="Address"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
  
      <pre class="mt-8 p-4 bg-gray-100 rounded-md overflow-auto">{{ organizer }}</pre>
    </div>
  </template>