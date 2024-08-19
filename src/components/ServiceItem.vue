<script setup>
import { formatCurrency } from "../helpers";
import { useAppointmentStore } from "../stores/appointments";
import { ref } from "vue";

const appointments = useAppointmentStore();
const errorMessage = ref("");

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const handleServiceSelection = () => {
  try {
    appointments.onServiceSelected(props.service);
    errorMessage.value = ""; // Limpiar mensaje de error si la selección es exitosa
  } catch (error) {
    console.error("Error al seleccionar el servicio:", error);
    errorMessage.value = "Hubo un problema al seleccionar el servicio. Inténtalo de nuevo.";
  }
};
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    :class="appointments.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
    @click="handleServiceSelection"
    role="button"
    :aria-pressed="appointments.isServiceSelected(service._id).toString()"
    :aria-label="'Seleccionar servicio ' + service.name"
    tabindex="0"
    @keydown.enter.prevent="handleServiceSelection"
    @keydown.space.prevent="handleServiceSelection"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p
      class="font-black text-2xl sm:text-4xl"
      :class="appointments.isServiceSelected(service._id) ? ' text-white' : 'text-blue-600'"
    >
      {{ formatCurrency(service.price) }}
    </p>
    <!-- Mensaje de error -->
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Estilos personalizados adicionales si es necesario */
</style>
