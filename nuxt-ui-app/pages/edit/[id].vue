<template>
  <div>
    <Loading v-if="loading" />
    <template v-else>
      <div class="text-end">
        <UButton
          label="Supprimer"
          class="ml-auto"
          color="red"
          style="outline"
          @click="remove()"
        />
      </div>
      <FormSession v-model="form" class="-mt-4"></FormSession>
      <UDivider class="my-2" />
      <div class="flex gap-4 justify-end items-center">
        <ULink to="/">Annuler</ULink>
        <UButton label="Enregistrer" @click="save()" />
      </div>
    </template>
  </div>
</template>
<script setup>
const id = useRoute().params.id;
const form = ref();
const loading = ref(true);
const { getSession, removeSession, putSession } = useDBStore();

onMounted(() => {
  form.value = getSession(id);
  if (!form.value) {
    navigateTo("/");
  }
  loading.value = false;
});

async function remove() {
  await removeSession(id);
  await navigateTo("/");
}
async function save() {
  await putSession(form.value);
  useToast().add({
    title: "Succès",
    description: "Vos modifications ont été prises en compte",
  });
}
</script>
