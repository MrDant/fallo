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
  @apply min-h-screen md:min-h-96;
  @apply md:flex items-center justify-center;
}
.card {
  @apply min-h-screen h-full shadow;
  @apply md:h-auto md:min-w-96;
}
</style>
