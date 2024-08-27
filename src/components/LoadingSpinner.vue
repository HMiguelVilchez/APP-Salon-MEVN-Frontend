<template>
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner',
  };
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 9999;
  }
  
  .spinner {
    width: 100px; /* Tamaño más grande */
    height: 100px; /* Tamaño más grande */
    border: 8px solid rgba(0, 0, 0, 0.1); /* Bordes más gruesos */
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  