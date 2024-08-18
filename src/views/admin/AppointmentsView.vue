<script setup>
import AdminAppointment from '../../components/AdminAppointment.vue'
import { useUserStore } from '../../stores/user'
import { computed, ref, watch } from 'vue'
import axios from 'axios'

// Importar funciones para el formateo de fechas, si es necesario
// import { format } from 'date-fns';

const user = useUserStore()
const selectedDate = ref(null)

// Función para filtrar citas por fecha
const filterAppointmentsByDate = (appointments, date) => {
    if (!date) return appointments

    const formattedDate = new Date(date).toISOString().split('T')[0]
    return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0]
        return appointmentDate === formattedDate
    })
}

// Computed property para obtener citas filtradas
const filteredAppointments = computed(() => {
    return filterAppointmentsByDate(user.userAppointments || [], selectedDate.value)
})

// Computed property para calcular el total de las citas del usuario
const totalAppointments = computed(() => {
    return (user.userAppointments || []).reduce((acc, appointment) => {
        return acc + (appointment.totalAmount || 0)
    }, 0)
})

// Computed property para calcular el total de los vales
const totalVouchers = computed(() => {
    return (user.userVouchers || []).reduce((acc, voucher) => {
        return acc + (voucher.amount || 0)
    }, 0)
})

// Computed property para calcular el total neto del día
const totalNet = computed(() => {
    return totalAppointments.value - totalVouchers.value
})

// Función para manejar el cambio en la selección de fecha
const handleDateChange = async () => {
    try {
        console.log('Fecha seleccionada:', selectedDate.value)
        if (!selectedDate.value) return
        
        const [appointmentsResponse, vouchersResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}appointmentss`, {
                params: {
                    date: selectedDate.value
                },
                withCredentials: true
            }),
            axios.get(`${import.meta.env.VITE_API_URL}vouchers`, {
                params: {
                    date: selectedDate.value
                },
                withCredentials: true
            })
        ])

        // Actualiza las citas del usuario con las citas obtenidas
        user.userAppointments = appointmentsResponse.data
        // Actualiza los vales del usuario con los vales obtenidos
        user.userVouchers = vouchersResponse.data
        
    } catch (error) {
        console.error('Error al obtener las citas y vales:', error)
    }
}

watch(selectedDate, handleDateChange)
</script>

<template>
    <p class="text-white text-lg mt-5">
        A continuación podrás administrar tus próximas citas
    </p>
    
    <!-- Selector de fecha -->
    <div class="mt-5">
        <label for="date" class="block text-white text-lg">Selecciona una fecha:</label>
        <input
            type="date"
            id="date"
            v-model="selectedDate"
            class="border border-gray-300 p-2 rounded"
        />
    </div>

    <p v-if="user.loading" class="text-white text-2xl text-center mt-5">
        Cargando...
    </p>

    <div v-else>
        <p v-if="filteredAppointments.length === 0" class="text-white text-2xl text-center mt-5">
            No tienes próximas citas para la fecha seleccionada
        </p>

        <div v-else>
            <div class="grid grid-cols-1 gap-5 mt-10">
                <AdminAppointment
                    v-for="appointment in filteredAppointments"
                    :key="appointment._id"
                    :appointment="appointment"
                />
            </div>
            
            <!-- Mostrar el total de ingresos, total de vales y total neto del día -->
            <p class="text-white text-2xl text-right mt-10">
                Total de Ingresos: <span class="text-blue-500">{{ totalAppointments }}</span>
            </p>
            <p class="text-white text-2xl text-right">
                Total de Vales: <span class="text-blue-500">{{ totalVouchers }}</span>
            </p>
            <p class="text-white text-2xl text-right">
                Total Neto del Día: <span class="text-blue-500">{{ totalNet }}</span>
            </p>
        </div>
    </div>
</template>





