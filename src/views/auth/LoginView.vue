<script setup>
import { ref, inject } from "vue";
import { useRouter } from 'vue-router';
import AuthAPI from "../../api/AuthAPI";

const toast = inject("toast");
const router = useRouter();
const isLoading = ref(false); // Estado de carga

const handleSubmit = async (formData) => {
  isLoading.value = true; // Inicia el loading spinner
  try {
    const {
      data: { token },
    } = await AuthAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: 'my_appointments' }); // Redirige a la página de citas
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  } finally {
    isLoading.value = false; // Detén el loading spinner
  }
};
</script>


<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Cruz Barber
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Si tienes cuenta inicia sesión
  </p>

  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de Usuario"
      validation="required|email"
      autocomplete="username"
      :validation-messages="{
        required: 'El Email es obligatorio',
        email: 'Email no válido',
      }"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Password de Usuario"
      validation="required"
      autocomplete="current-password"
      :validation-messages="{
        required: 'El Password es obligatorio',
      }"
    />
    <FormKit type="submit">Iniciar Sesión</FormKit>
  </FormKit>
</template>

<style scoped></style>

