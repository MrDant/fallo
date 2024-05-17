<template>
  <div
    class="rounded-full w-20 h-20 overflow-hidden flex items-center justify-center shadow relative border"
    :class="loading ? '' : 'hover:brightness-50'"
  >
    <NuxtImg :src="model" />
    <div class="bg-black absolute rounded-full p-2 leading-none bg-opacity-50">
      <UIcon
        v-if="loading"
        name="i-svg-spinners-pulse-multiple"
        class="text-white"
      />

      <UIcon v-else name="i-heroicons-camera" class="text-white" />
    </div>
    <UInput
      class="appearance-none opacity-0 absolute top-0 right-0 bottom-0 left-0 cursor-pointer"
      type="file"
      @change="updateImage($event)"
      :disabled="loading"
    />
  </div>
</template>
<script setup>
const model = defineModel();
const loading = ref(false);
function updateImage(event) {
  loading.value = true;
  let fileReader = new FileReader();
  fileReader.onload = (event) => {
    loading.value = false;
    model.value = event.target.result + "";
  };
  fileReader.readAsDataURL(event[0]);
}
</script>
