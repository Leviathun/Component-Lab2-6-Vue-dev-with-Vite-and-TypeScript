<script setup lang="ts">
import AuctionItemCard from '@/components/AuctionItemCard.vue';
import BaseInput from '@/components/BaseInput.vue';
import { ref, onMounted, computed, watchEffect } from 'vue';
import AuctionItemService from '@/services/AuctionItemService';
import type { AuctionItem } from '@/types'
import { useRouter } from 'vue-router';
const router = useRouter();
const auctionItems = ref<AuctionItem[] | null>(null)
const totalItems = ref(0);
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalItems.value / 3)
    return page.value < totalPages
  })
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
});
const page = computed(() => props.page)
onMounted(() => {
    watchEffect(() => {
      
    updateKeyword()
  })
})
const keyword = ref('')
function updateKeyword() {
    console.log('Current keyword:', keyword.value);
    
    let queryFunction;
    if (keyword.value === '') {
        queryFunction = AuctionItemService.getAuctionItems(3, page.value);
    } else {
        console.log('Searching auctions with keyword:', keyword.value);
        queryFunction = AuctionItemService.searchAuctionItems(keyword.value, 3, page.value);
    }
    queryFunction
        .then((response) => {
            auctionItems.value = response.data;
            totalItems.value = response.headers['x-total-count'];
            console.log('Search results:', response.data);
        })
        .catch((error) => {
            console.error('Error fetching auctions:', error);
            router.push({ name: 'NetworkError' });
        });
}
</script>
<template>
    <div>
      <h1>Auction Items</h1>
      <div class="flex flex-col items-center">
        <div class="w-64">
          <BaseInput
  v-model="keyword"
  type="text"
  label="Search by description..."
  @input="updateKeyword()"
/>
        </div>
<AuctionItemCard v-for="auctionItem in auctionItems" :key="auctionItem.id" :auction-item="auctionItem"></AuctionItemCard>
        
        <div class="flex w-[290px]">
            <RouterLink
    id="page-prev"
    :to="{ name: 'auction-item', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    class="flex-1 no-underline text-[#2c3e50] text-left"
    >&#60; Prev Page</RouterLink
    >
    <RouterLink 
    id="page-next"
    :to="{ name: 'auction-item',query: { page: page + 1 } }"
    rel="next"
    v-if="hasNextPage"
    class="flex-1 no-underline text-[#2c3e50] text-right"
    >Next Page &#62;</RouterLink
    >
  
          
        </div>
      </div>
    </div>
  </template>