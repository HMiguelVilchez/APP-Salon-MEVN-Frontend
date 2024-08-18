<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const amount = ref('')
const date = ref('') // Variable reactiva para la fecha seleccionada
const description = ref('')

const saveVoucher = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}vouchers`, {
      amount: amount.value,
      date: date.value,
      description: description.value // Incluye la fecha seleccionada en la solicitud
    })

    if (response.status === 200) {
      alert('Vale creado exitosamente')
      router.push({ name: 'my_appointments' }) // Redirige a la página de citas después de crear el vale
    }
  } catch (error) {
    console.error('Error al crear el vale:', error)
    alert('Hubo un error al crear el vale')
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl text-white font-bold mb-4">Crear Nuevo Vale</h1>
    <form @submit.prevent="saveVoucher" class="space-y-4">
      <div>
        <label for="description" class="block text-lg text-white">Comentario</label>
        <textarea id="description" v-model="description" class="w-full p-2 rounded"></textarea>
      </div>
      <div>
        <label for="amount" class="block text-lg text-white">Monto</label>
        <input type="number" id="amount" v-model="amount" class="w-full p-2 rounded" />
      </div>
      <div>
        <label for="date" class="block text-lg text-white">Fecha</label>
        <input type="date" id="date" v-model="date" class="w-full p-2 rounded" />
      </div>
      <button type="submit" class="bg-green-600 hover:bg-green-700 text-white p-3 rounded">Guardar Vale</button>
    </form>
  </div>
</template>
