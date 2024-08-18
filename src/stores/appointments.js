import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO, convertToDDMMYY } from '../helpers/date'
import { useUserStore } from '../stores/user'

export const useAppointmentStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const time = ref('')
    const appointmentsByDate = ref([])
    const hours = ref([])
    const vouchers = ref([]);

    const toast = inject('toast')
    const router = useRouter()
    const user = useUserStore()

    onMounted(() => {
        const startHour = 7
        const endHour = 21
        for (let hour = startHour; hour <= endHour; hour++) {
            // Agregar la hora en punto
            hours.value.push(`${hour}:30`);
    
            // Agregar la hora con 30 minutos
            if (hour < endHour) {
                hours.value.push(`${hour}:59`);
            }
        }
    })

    watch(date, async () => {
        time.value = ''
        if (date.value === '') return
        const { data } = await AppointmentAPI.getByDate(date.value)

        if (appointmentId.value) {
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0]?.time || ''
        } else {
            appointmentsByDate.value = data
        }
    })

    function setSelectedAppointment(appointment) {
        services.value = appointment.services
        date.value = convertToDDMMYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id,
        vouchers.value = appointment.vouchers || []; // Asignar los vales si existen
}

    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length === 2) {
                alert('Máximo 2 servicios')
                return
            }
            services.value.push(service)
        }
    }

    async function saveAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value,
            vouchers: vouchers.value.map(voucher => voucher._id) // Incluir los IDs de los vales
    }

        if (appointmentId.value) {
            try {
                const { data } = await AppointmentAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                toast.open({
                    message: error.response?.data?.msg || 'Error al actualizar la cita',
                    type: 'error'
                })
            }
        } else {
            try {
                const { data } = await AppointmentAPI.create(appointment)
                toast.open({
                    message: data.msg || 'Cita creada exitosamente',
                    type: 'success'
                })
            } catch (error) {
                toast.open({
                    message: error.response?.data?.msg || 'Error al crear la cita',
                    type: 'error'
                })
            }
        }

        clearAppoinmentData()
        user.getUserAppointments()

        router.push({
            name: 'my_appointments'
        })
    }

    function clearAppoinmentData() {
        appointmentId.value = ''
        services.value = []
        date.value = ''
        time.value = ''
    }

    async function cancelAppointment(id) {
        if (confirm('¿Deseas cancelar esta cita?')) {
            try {
                const { data } = await AppointmentAPI.delete(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                user.getUserAppointments()
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServiceSelected = computed(() => {
        return services.value.length === 0
    })

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        const now = new Date()
        const currentHour = now.getHours()
    
        return (hour) => {
            // Convertir la hora en formato 'HH:MM' a un número de hora
            const hourNumber = parseInt(hour.split(':')[0], 10)
    
            // Verificar si la hora es anterior a la hora actual
            if (hourNumber < currentHour) {
                return true
            }
    
            // Verificar si la hora está ocupada
            return appointmentsByDate.value.some(appointment => appointment.time === hour)
        }
    })

    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        clearAppoinmentData,
        cancelAppointment,
        isServiceSelected,
        noServiceSelected,
        totalAmount,
        isValidReservation,
        isDateSelected,
        disableTime
    }
})