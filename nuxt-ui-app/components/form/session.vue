<template>
  <div>
    <div class="flex items-center justify-around">
      <FormFileInput v-model="model.img" @update:modelValue="fetch()" />
      <UInput
        placeholder="Choissiez un nom"
        v-model="model.title"
        class="pacifico-regular"
        @change="fetch()"
      />
    </div>
    <UDivider class="my-2" />
    <div class="flex flex-wrap justify-around gap-2">
      <div
        class="action-card bg-white relative overflow-hidden"
        v-for="(action, index) in model.actions"
        :key="action.title"
      >
        <div class="absolute top-0 left-0 flex gap-1 z-10 bg-white p-2">
          <UIcon name="i-heroicons-clock" class="text-black" />
          <p class="text-xs text-black flex">
            <input
              v-model="action.timer"
              class=" bg-transparent border-none w-8"
            />
            <p>s</p>
          </p>
        </div>
        <div class="absolute top-0 right-0 flex gap-1 z-10 p-2" @click="removeAction(index)">
          <UIcon
            name="i-heroicons-x-circle-16-solid"
            class="text-maroon-flush"
          />
        </div>
        <div>
          <FormFileInput v-model="action.img" class="w-12 h-12" />
        </div>
        <UInput placeholder="Nom de l'action" v-model="action.name"/>
      </div>
      <div
        @click="addAction"
        class="action-card cursor-pointer border border-dashed border-heather hover:bg-black hover:bg-opacity-5"
      >
        <UIcon name="i-heroicons-plus-16-solid" class="text-heaver" />
      </div>
    </div>
  </div>
</template>
<script setup>
const model = defineModel({
  default: { title: "", img: "https://picsum.photos/200", actions: [] },
  required: true,
});

function addAction() {
  model.value.actions.push({
    name: "",
    img: "https://picsum.photos/200",
    timer: 30,
  });
  fetch();
}
function removeAction(index) {
  model.value.actions.splice(index, 1)
  fetch();
}
function fetch() {
  model.value = { ...model.value };
}
</script>
<style lang="scss" scoped>
.action-card {
  @apply rounded-md w-32 h-32 shadow flex items-center justify-center flex-col gap-2 p-2;
}
</style>
