<script setup>
import { RouterView, RouterLink, useRoute } from "vue-router";

const route = useRoute();
const authRoutes = [
  { name: "register", text: "Crear Cuenta" },
  { name: "login", text: "Iniciar Sesión" },
  { name: "home", text: "Iniciar Sesión" },
  { name: "forgot-password", text: "Olvidé mi password" },
];
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        class="uppercase font-bold text-white"
        :class="{ hidden: route.name === authRoute.name }"
        :to="{ name: authRoute.name }"
        >{{ authRoute.text }}
      </RouterLink>
    </nav>
  </div>
</template>
<style scoped></style>
