<script setup lang="ts">
import HeaderElement from '@/layouts/Header.vue'
import FooterElement from '@/layouts/Footer.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="page-wrapper">
    <HeaderElement />

    <main class="page-main">
      <div class="banner">
        <div class="banner__container">
          <h1 class="banner__title">{{ props.title }}</h1>
        </div>
      </div>

      <div class="page-main__content">
        <slot name="content"></slot>
      </div>
    </main>

    <FooterElement />
  </div>
</template>
