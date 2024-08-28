<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '../../stores/user';

const date = ref('');
const vouchers = ref([]);
const selectedDate = ref(null);

const user = useUserStore();

// Computed property para calcular el total de las citas del usuario
const totalAppointments = computed(() => {
    return (user.userAppointments || []).reduce((acc, appointment) => {
        return acc + (appointment.totalAmount || 0);
    }, 0);
});

// Computed property para calcular el total de los vales
const totalVouchers = computed(() => {
    return (user.userVouchers || []).reduce((acc, voucher) => {
        return acc + (voucher.amount || 0);
    }, 0);
});

// Computed property para calcular el total neto del día
const totalNet = computed(() => {
    return totalAppointments.value - totalVouchers.value;
});

// Función para manejar el cambio en la selección de fecha
const handleDateChange = async () => {
    if (!selectedDate.value) return;

    try {
        const vouchersResponse = await axios.get(`${import.meta.env.VITE_API_URL}vouchers`, {
            params: { date: selectedDate.value },
            withCredentials: true
        });

        // Actualiza los vales del usuario con los vales obtenidos
        user.userVouchers = vouchersResponse.data;
        vouchers.value = vouchersResponse.data;
    } catch (error) {
        console.error('Error al obtener los vales:', error);
    }
};

// Fetch de vales al montar el componente
const fetchVouchers = async () => {
  if (date.value) {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}vouchers`, {
        params: { date: date.value },
        withCredentials: true
      });
      vouchers.value = data;
    } catch (error) {
      console.error('Error al obtener los vales:', error);
    }
  }
};

onMounted(() => {
  if (date.value) {
    fetchVouchers();
  }
});

watch(date, fetchVouchers);
</script>

<template>
  <div class="p-5">
    <h2 class="text-2xl font-black mb-5">Vales por Fecha</h2>
    <input
      type="date"
      v-model="date"
      class="mb-5 p-2 border border-gray-300 rounded-lg"
      @change="handleDateChange"
    />
    <div v-if="vouchers.length" class="space-y-3">
      <div v-for="voucher in vouchers" :key="voucher._id" class="p-4 bg-white rounded-lg shadow">
        <p class="text-gray-700">Monto: <span class="font-bold">{{ voucher.amount }}</span></p>
        <p class="text-gray-700">Fecha: <span class="font-bold">{{ new Date(voucher.date).toLocaleDateString() }} </span></p>
        <p class="text-gray-700">Descripción: <span class="font-bold">{{ voucher.description }}</span></p>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">No se encontraron vales para la fecha seleccionada.</p>
    </div>
    <!-- Mostrar el total acumulado y otros detalles -->
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
</template>




