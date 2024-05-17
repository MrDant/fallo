<template>
  <div>
    <FormSession v-model="form"></FormSession>
    <UDivider class="my-2" />
    <div class="flex gap-4 justify-end items-center">
      <ULink to="/">Annuler</ULink>
      <UButton label="Créer" @click="save()" />
    </div>
  </div>
</template>
<script setup>
const form = ref({ title: "", img: "https://picsum.photos/200", actions: [] });
const { addSession } = useDBStore();
async function save() {
  await addSession(form.value);
  await navigateTo("/");
}
</script>
