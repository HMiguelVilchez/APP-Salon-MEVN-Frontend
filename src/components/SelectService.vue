<script setup>
import { useAppointmentStore } from '../stores/appointments';
import { formatCurrency } from "../helpers";

const appointments = useAppointmentStore();

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

// Función para manejar la eliminación del servicio
const handleServiceRemoval = () => {
  try {
    appointments.onServiceSelected(props.service);
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    alert("Hubo un problema al eliminar el servicio. Inténtalo de nuevo.");
  }
};
</script>

<template>
  <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center bg-white">
    <div>
      <p class="text-2xl font-extrabold text-gray-900">{{ service.name }}</p>
      <p class="text-3xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>
    <button 
      @click="handleServiceRemoval"
      type="button"
      class="inline-flex items-center rounded-md bg-red-600 text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      :aria-label="'Eliminar servicio ' + service.name"
    >
      Eliminar
    </button>
  </div>
</template>

<style scoped>
/* Estilos personalizados */
.bg-white {
  background-color: #ffffff;
}

.text-gray-900 {
  color: #1a202c;
}
</style>

