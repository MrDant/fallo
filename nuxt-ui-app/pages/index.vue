<template>
  <div>
    <div class="text-end">
      <NuxtLink to="/create">+ Nouveau</NuxtLink>
    </div>
    <Loading v-if="loading" />
    <div class="flex flex-col gap-2" v-else>
      <div v-for="session in data" :key="session.id" class="session-card">
        <div class="session-col">
          <p class="text-tangaroa pacifico-regular">{{ session.title }}</p>
          <p class="pl-2 pb-2">{{ countSecondes(session.actions) }} secondes</p>
          <p class="pl-2 pb-2">{{ session.actions.length }} exercice(s)</p>
        </div>
        <NuxtLink
          :to="'/' + session.id"
          class="rounded-full overflow-hidden w-32 h-32"
        >
          <NuxtImg :src="session.img" class="w-full h-full" />
        </NuxtLink>
        <div class="session-col justify-self-end">
          <UButton
            @click="deleteSession(session.id)"
            variant="link"
            class="text-maroon-flush text-2xl"
          >
            <UIcon name="i-heroicons-x-circle-16-solid" />
          </UButton>
          <UButton
            variant="link"
            @click="navigateTo('/edit/' + session.id)"
            class="text-kabul text-2xl"
          >
            <UIcon name="i-heroicons-paint-brush-solid" />
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { removeSession } = useDBStore();
const { data } = storeToRefs(useDBStore());
const loading = ref(false);

function countSecondes(actions) {
  return actions.reduce((a, b) => a + +b.timer, 0);
}
function deleteSession(id) {
  useToast().add({
    title: "Suppression de la session",
    description: "Êtes-vous sur de vous supprimer cette session ?",
    actions: [
      {
        label: "Confirmer",
        click: async () => {
          loading.value = true;
          await removeSession(id);
          loading.value = false;
        },
      },
    ],
  });
}
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
