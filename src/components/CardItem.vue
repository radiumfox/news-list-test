<script setup lang="ts">
import { PropType, ref } from 'vue'
import { DateItem } from '@/ts/types'
import Tag from '@/components/Tag.vue'

const props = defineProps({
  imgSrc: {
    type: String,
    default: ''
  },
  date: {
    type: Object as PropType<DateItem>,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    }
  },
  href: {
    type: String,
    default: ''
  }
})

const imageLoaded = ref(false)

const img = new Image()

img.onload = () => {
  imageLoaded.value = true
}

img.src = props.imgSrc
</script>
<template>
  <a :class="['card-item', { 'card-item--img': props.imgSrc }]" :href="props.href" target="_self">
    <div v-if="props.imgSrc" class="card-item__img-container">
      <div v-if="!imageLoaded" class="card-item__img-preloader"></div>
      <img v-else class="card-item__img" :src="props.imgSrc" width="536" height="250" />
    </div>

    <div class="card-item__content">
      <div>
        <div class="card-item__date">
          <span class="card-item__day">{{ props.date.day }}</span>
          <span class="card-item__month-year">{{ props.date.monthYear }}</span>
        </div>

        <h2 class="card-item__title" v-html="props.title"></h2>
        <p class="card-item__text" v-html="props.text"></p>
      </div>

      <div class="card-item__tags">
        <Tag v-for="(tag, index) in props.tags" :text="tag" :key="index" />
      </div>
    </div>
  </a>
</template>
