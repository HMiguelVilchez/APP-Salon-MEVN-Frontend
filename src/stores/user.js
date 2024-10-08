import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthAPI'
import AppointmentAPI from '../api/AppointmentAPI'


export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])
    const userAppointments1 = ref([])
    const loading = ref(true)

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
            await getUserAppointments()
            await getUserAppointments1()
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })
    

    async function getUserAppointments() {

        const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
        userAppointments.value = data
    }
    async function getUserAppointments1() {

        const { data } = await AppointmentAPI.getUserAppointments1(user.value._id)
        userAppointments1.value = data
    }

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({ name: 'home' })
    }
    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    const noAppointments = computed(() => userAppointments.value.length == 0)

    const noAppointments1 = computed(() => userAppointments1.value.length == 0)

    return {
        user,
        getUserAppointments1,
        getUserAppointments,
        userAppointments,
        userAppointments1,
        loading,
        logout,
        getUserName,
        noAppointments,
        noAppointments1,
    }

})