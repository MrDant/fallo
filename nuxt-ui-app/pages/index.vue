<template>
  <div>
    <div class="text-end">
      <NuxtLink to="/create">+ Nouveau</NuxtLink>
    </div>
    {{ data }}
  </div>
</template>
<script setup>
const { data } = useDBStore();
</script>
