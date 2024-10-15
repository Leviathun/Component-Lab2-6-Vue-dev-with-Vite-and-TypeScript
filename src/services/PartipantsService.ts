import {type Participant } from '@/types';
import axios, { type AxiosResponse } from 'axios'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default {
    getParticipants(perPage: Number, page: Number) {
        return apiClient.get('/participants?_limit=' + perPage + '&_page=' + page)
    },
    getParticipant(id: number) {
      return apiClient.get('/participants/' + id)
    },
    saveParticipant(participant: Participant) {
        return apiClient.post('/participants', participant)
    },
    getParticipantsByKeyword(keyword: string, perPage: number, page: number):
        Promise<AxiosResponse<Participant[]>> {
            return apiClient.get<Participant[]>('/participants?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
        }
}