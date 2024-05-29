<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])
</script>
<template>
  <button
    @click="emits('click')"
    :class="['button-base', { loading: props.loading }]"
    type="button"
  >
    <div v-if="props.loading" class="button-base__loader"></div>
    <span class="button-base__text">
      {{ props.text }}
    </span>
  </button>
</template>
