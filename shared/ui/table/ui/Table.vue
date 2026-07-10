<script setup lang="ts">
// Simple responsive table container wrapper
</script>

<template>
  <div class="overflow-x-auto border rounded-xl shadow-sm bg-white overflow-hidden border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <slot />
    </table>
  </div>
</template>
