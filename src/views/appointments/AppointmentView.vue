<template>
  <div>
    <!-- Selector de Barbero -->
    <label for="barber" class="block text-white">Selecciona el Barbero:</label>
    <select
      id="barber"
      v-model="selectedBarber"
      class="w-full p-2 border border-gray-300 rounded"
      @change="handleBarberChange"
    >
      <option value="">Selecciona un barbero</option>
      <option value="Cruz">Cruz</option>
      <option value="David">David</option>
    </select>

    <!-- Mensaje de error si no se selecciona un barbero -->
    <div v-if="!selectedBarber">
      <p class="text-red-500">Por favor, selecciona un barbero para continuar.</p>
    </div>

    <!-- Mostrar servicios si hay un barbero seleccionado -->
    <div v-if="selectedBarber">
      <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
      <p v-if="appointments.noServiceSelected" class="text-white text-2xl text-center">
        No hay servicios Seleccionados
      </p>
      <div v-else class="grid gap-5">
        <SelectService
          v-for="service in appointments.services"
          :service="service"
          :key="service._id"
        />
        <p class="text-right text-white text-2xl">
          Total a Pagar:
          <span class="font-black">{{ formatCurrency(appointments.totalAmount) }}</span>
        </p>
      </div>
      
      <div v-if="!appointments.noServiceSelected" class="space-y-8">
        <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
        <div class="lg:flex gap-5 items-start">
          <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
            <VueTailwindDatepicker
              :disable-date="disableDate"
              i18n="es"
              as-single
              no-input
              :formatter="formatter"
              v-model="appointments.date"
            />
          </div>
          <div
            v-if="appointments.isDateSelected"
            class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
          >
            <button
              v-for="hour in appointments.hours"
              class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
              :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
              @click="appointments.time = hour"
              :disabled="appointments.disableTime(hour) ? true : false"
              :aria-label="'Seleccionar hora ' + hour"
            >
              {{ hour }}
            </button>
          </div>
        </div>
        <!-- Condición revisada para habilitar el botón -->
        <div v-if="selectedBarber && appointments.date && appointments.time" class="flex justify-end">
          <button
            class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
            @click="appointments.saveAppointment"
          >
            Confirma Reserva
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import SelectService from '../../components/SelectService.vue';
import { useAppointmentStore } from '../../stores/appointments';
import { formatCurrency } from '../../helpers';

const appointments = useAppointmentStore();
const selectedBarber = ref('');
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

// Función para deshabilitar fechas si no se selecciona un barbero
const disableDate = (date) => {
  if (!selectedBarber.value) return true; // Deshabilitar fechas si no se selecciona un barbero

  const today = new Date();
  const adjustedDate = new Date(today.setHours(0, 0, 0, 0)); // Ajuste a las horas para evitar desactivaciones incorrectas

  return (
    date < adjustedDate ||
    [0, 6].includes(date.getDay()) // Deshabilitar fines de semana
  );
};

// Mapea el nombre del barbero a su ObjectId correspondiente
const handleBarberChange = () => {
  const barberMapping = {
    'Cruz': '66b63e2afc053ca48e515452', // Ejemplo de ObjectId para Cruz
    'David': '66b63e2afc053ca48e515453', // Ejemplo de ObjectId para David
  };
  appointments.selectedBarber = barberMapping[selectedBarber.value] || ''; // Asigna el ObjectId al valor seleccionado
  appointments.time = ''; // Limpiar la hora cuando cambie el barbero
  appointments.date = ''; // Limpiar la fecha cuando cambie el barbero
};

// Función para guardar la cita
const saveAppointment = async () => {
  if (!selectedBarber.value) {
    alert('Por favor, selecciona un barbero antes de proceder.');
    return;
  }

  const appointmentData = {
    services: appointments.services,
    date: appointments.date,
    time: appointments.time,
    totalAmount: appointments.totalAmount,
    selectedBarber: appointments.selectedBarber, // Asegúrate que este campo es un ObjectId
    vouchers: appointments.vouchers,
  };

  try {
    const response = await axios.post('/api/appointments', appointmentData);
    alert(response.data.msg);
  } catch (error) {
    console.error('Error al crear la cita:', error);
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>









