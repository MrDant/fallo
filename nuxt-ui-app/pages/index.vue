<template>
  <div>
    <div class="text-end">
      <NuxtLink to="/create">+ Nouveau</NuxtLink>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="session in data" :key="session" class="session-card">
        <div class="session-col">
          <p class="text-tangaroa pacifico-regular">{{ session.title }}</p>
          <p class="pl-2 pb-2">{{ session.actions.length }} exercice(s)</p>
        </div>
        <div class="rounded-full overflow-hidden w-32 h-32">
          <NuxtImg :src="session.img" class="w-full h-full" />
        </div>
        <div class="session-col text-2xl justify-self-end">
          <NuxtLink :to="'/edit/' + session.id">
            <UIcon name="i-heroicons-paint-brush-solid" />
          </NuxtLink>
          <NuxtLink :to="'/' + session.id">
            <UIcon name="i-heroicons-play-circle-solid" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data } = useDBStore();
</script>
<style lang="scss" scoped>
.session-card {
  @apply bg-white border-heather rounded shadow text-heather-600;
  @apply grid grid-cols-3 items-center;
  @apply p-2 h-40;
}
.session-col {
  @apply flex flex-col justify-between h-full;
}
</style>
