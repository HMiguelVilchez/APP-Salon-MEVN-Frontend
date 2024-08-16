import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import ServicesAPI from '../api/ServicesAPI'

export const useServicesStore = defineStore('services', () => {
    
    const services = ref([])
    onMounted(async () => {

        try {
            const { data } = await ServicesAPI.all()
            // console.log(data)
            services.value = data
        } catch (error) {
            console.log(error)
        }
        // console.log(services.value)
    })



    return {
        services
    }
})