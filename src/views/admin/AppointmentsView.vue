<script setup>
import AdminAppointment from '../../components/AdminAppointment.vue'
import { useUserStore } from '../../stores/user'
import { computed, ref, watch } from 'vue'

const user = useUserStore()
const selectedDate = ref(null)

// Computed property para calcular el total de todas las citas
const totalAmount = computed(() => {
    return (user.userAppointments || []).reduce((acc, appointment) => {
        return acc + (appointment.totalAmount || 0)
    }, 0)
})

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

// Función para manejar el cambio en la selección de fecha
const handleDateChange = () => {
    console.log('Fecha seleccionada:', selectedDate.value)
}

watch(selectedDate, handleDateChange)
</script>

<template>
    <p class="text-white text-lg mt-5">
        A continuación podrás administrar tus próximas citas
    </p>
    <button
                      type="button"
                      class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                      @click="user.logout"
                  >
                      Cerrar Sesión
                  </button>

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

            <!-- Mostrar el total acumulado -->
            <p class="text-white text-2xl text-right mt-10">
                Total acumulado del Día: <span class="text-blue-500">{{ totalAmount }}</span>
            </p>
        </div>
    </div>
</template>




