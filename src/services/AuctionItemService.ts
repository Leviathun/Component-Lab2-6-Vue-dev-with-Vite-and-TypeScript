import { type AuctionItem } from '@/types';
import axios, { type AxiosResponse } from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
export default {
    getAuctionItems(perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get<AuctionItem[]>(`/auctions?_limit=${perPage}&_page=${page}`);
    },
    getAuctionItem(id: number): Promise<AxiosResponse<AuctionItem>> {
        return apiClient.get<AuctionItem>(`/auctions/${id}`);  
    },
    
    async searchAuctionItems(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
        // Try searching by title
        let response = await apiClient.get<AuctionItem[]>(`/auctions?title=${keyword}&_limit=${perPage}&_page=${page}`);
        
        // If no results, try description
        if (response.data.length === 0) {
            response = await apiClient.get<AuctionItem[]>(`/auctions?description=${keyword}&_limit=${perPage}&_page=${page}`);
        }
        
        // If still no results, try type
        if (response.data.length === 0) {
            response = await apiClient.get<AuctionItem[]>(`/auctions?type=${keyword}&_limit=${perPage}&_page=${page}`);
        }
        return response;
    }
};