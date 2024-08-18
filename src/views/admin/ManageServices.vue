<template>
    <div>
      <h2 class="text-3xl font-bold mb-4">Gestionar Servicios</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Nombre del Servicio:</label>
          <input
            type="text"
            id="name"
            v-model="service.name"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
  
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Precio del Servicio:</label>
          <input
            type="number"
            id="price"
            v-model="service.price"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
  
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ isEditing ? 'Actualizar Servicio' : 'Agregar Servicio' }}
        </button>
      </form>
  
      <h3 class="text-2xl font-bold mt-8 mb-4">Servicios Disponibles</h3>
  
      <ul>
        <li
          v-for="serv in services"
          :key="serv._id"
          class="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
        >
          <span>{{ serv.name }} - ${{ serv.price }}</span>
          <div>
            <button
              class="bg-green-500 text-white px-3 py-1 rounded mr-2"
              @click="editService(serv)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded"
              @click="deleteService(serv._id)"
            >
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const service = ref({ name: '', price: '' })
  const services = ref([])
  const isEditing = ref(false)
  let editingId = null
  
  const apiUrl = import.meta.env.VITE_API_URL
  
  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}services`)
      services.value = data
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }
  
  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await axios.put(`${apiUrl}services/${editingId}`, service.value)
      } else {
        await axios.post(`${apiUrl}services`, service.value)
      }
      fetchServices()
      resetForm()
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }
  
  const editService = (serv) => {
    service.value = { ...serv }
    isEditing.value = true
    editingId = serv._id
  }
  
  const deleteService = async (id) => {
    try {
      await axios.delete(`${apiUrl}services/${id}`)
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }
  
  const resetForm = () => {
    service.value = { name: '', price: '' }
    isEditing.value = false
    editingId = null
  }
  
  onMounted(() => {
    fetchServices()
  })
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  
  