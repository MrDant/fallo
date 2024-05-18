<template>
  <div>
    <Loading v-if="loading" />
    <template v-else>
      <h1 class="text-tangaroa pacifico-regular text-center text-3xl">
        {{ session.title }}
      </h1>
      <div class="flex justify-center w-full">
        <div class="flex gap-2 overflow-x-auto py-2 w-full scrollbar-hide">
          <div
            class="rounded-full w-8 h-8 shadow overflow-hidden border-2 flex-shrink-0"
            v-for="(action, index) in session.actions"
            :class="current == index ? ' brightness-50' : ''"
            :key="action"
          >
            <NuxtImg :src="action.img" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="rounded-full shadow-xl border p-3 relative overflow-hidden">
          <svg
            class="absolute top-0 left-0 right-0 bottom-0 w-full h-full -rotate-90"
            fill="transparent"
          >
            <circle
              class="circle"
              cx="50%"
              cy="50%"
              r="50%"
              stroke="#685044"
              stroke-linecap="round"
              stroke-width="20"
              stroke-dasharray="315%"
              :stroke-dashoffset="
                (timer / session.actions[current].timer) * 315 + '%'
              "
            ></circle>
          </svg>
          <div
            class="rounded-full w-60 h-60 overflow-hidden relative shadow-xl"
          >
            <NuxtImg
              :src="session.actions[current].img"
              class="w-full h-full"
            />
            <div
              class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-80"
              v-if="sleep"
            >
              <p class="text-white shadow-2xl text-5xl">
                {{ sleep }}
              </p>
            </div>
          </div>
        </div>
        <p class="text-center text-tangaroa pacifico-regular text-xl">
          {{ session.actions[current].name }}
        </p>
        <p class="text-center text-8xl">{{ timer }}</p>
      </div>
      <div class="flex justify-around items-end text-2xl mt-5">
        <UButton
          icon="i-heroicons-arrow-left-circle-16-solid"
          class="text-4xl"
          @click="prev()"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          color="white"
          :disabled="current == 0"
        />
        <NuxtLink to="/">
          <UIcon
            name="i-heroicons-x-circle-16-solid"
            class="text-maroon-flush shadow-white"
        /></NuxtLink>
        <div>
          <UIcon name="i-heroicons-play" v-if="!interval" @click="play()" />
          <UIcon name="i-heroicons-pause-circle" v-else @click="pause()" />
        </div>
        <UButton
          icon="i-heroicons-arrow-right-circle-16-solid"
          class="text-4xl"
          @click="next()"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          color="white"
          :disabled="current == session.actions.length - 1"
        />
      </div>
    </template>
  </div>
</template>
<script setup>
const id = useRoute().params.id;
const session = ref();
const loading = ref(true);
const current = ref(0);
const timer = ref(0);
const interval = ref(null);
const sleep = ref(null);
const { getSession } = useDBStore();
const step = ref();
const finishAudio = ref();

onMounted(() => {
  session.value = getSession(id);
  if (!session.value) {
    navigateTo("/");
  }
  loading.value = false;
  initStep();
  step.value = new Audio("/step.mp3");
  finishAudio.value = new Audio("/finish.mp3");
});

onBeforeUnmount(() => {
  pause();
});
function play() {
  if (interval.value !== null) return;
  interval.value = setInterval(function () {
    if (sleep.value !== null) {
      sleep.value--;
      if (sleep.value > 0) {
        return;
      }
      sleep.value = null;
    }
    timer.value--;
    if (timer.value < 0) {
      next();
    } else if (timer.value <= 3) {
      step.value.play();
    }
  }, 1000);
}
function pause() {
  clearInterval(interval.value);
  interval.value = null;
}
function next() {
  sleep.value = 3;
  current.value++;
  if (current.value == session.value.actions.length) {
    finishAudio.value.play();
    pause();
    useToast().add({
      title: "Félécitations !",
      description: "Vous venez de terminer votre série !",
    });
  } else {
    initStep();
  }
}

function prev() {
  current.value--;
  initStep();
}

function initStep() {
  sleep.value = 3;
  timer.value = session.value.actions[current.value].timer;
}
</script>

<style lang="scss" scoped>
circle {
  transition: stroke-dashoffset 1s ease-out;
}
</style>
