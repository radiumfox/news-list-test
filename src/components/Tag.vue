<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="tag">
    <span class="tag__text">{{ props.text }}</span>
  </div>
</template>
