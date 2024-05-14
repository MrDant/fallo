<template>
  <div class="my-container">
    <UCard class="card">
      <template #header>
        <Header />
      </template>

      <div><slot /></div>
    </UCard>
  </div>
</template>

<style lang="scss" scoped>
.my-container {
  @apply h-1 min-h-screen;
  @apply md:flex items-center justify-center;
}
.card {
  @apply h-full shadow;
  @apply md:h-auto md:min-w-96;
}
</style>
