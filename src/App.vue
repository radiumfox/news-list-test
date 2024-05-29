<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { NewsListProvider } from '@/ts/news-list.provider'
import { NewsListService } from '@/ts/news-list.service'
import CardItem from '@/components/CardItem.vue'
import CardPreloader from '@/components/CardPreloader.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import HeaderElement from '@/layouts/Header.vue'
import PageLayout from '@/layouts/PageLayout.vue'

let $NewsListProvider = reactive({})
const showButtonMore = ref(false)
const newsLoading = ref(true)
const buttonLoading = ref(false)

onMounted(() => {
  NewsListService.fetchNews()
    .then((data) => {
      $NewsListProvider = new NewsListProvider(data.items, data.nav)
      showButtonMore.value = $NewsListProvider.canLoadMore
    })
    .finally((res) => {
      newsLoading.value = false
    })
})

const loadMorePages = () => {
  buttonLoading.value = true
  NewsListService.fetchNews($NewsListProvider.nav.current + 1)
    .then((data) => {
      $NewsListProvider.list = data.items
      $NewsListProvider.nav = data.nav
      showButtonMore.value = $NewsListProvider.canLoadMore
    })
    .finally((res) => {
      buttonLoading.value = false
    })
}
</script>

<template>
  <PageLayout title="Новости" banner-src="../assets/images/banner-img.jpg">
    <template #content>
      <div v-if="newsLoading" class="cards-list">
        <CardPreloader />
        <CardPreloader />
        <CardPreloader />
      </div>

      <template v-else>
        <div class="cards-list">
          <CardItem
            v-for="(item, index) in $NewsListProvider.list"
            :title="item.previewText"
            :text="item.previewText"
            :img-src="item.image"
            :date="item.date"
            :tags="[item.type]"
            href="/"
          />
        </div>
        <div class="button-more-container">
          <ButtonBase
            @click="loadMorePages()"
            v-if="showButtonMore"
            text="Загрузить еще"
            :loading="buttonLoading"
          />
        </div>
      </template>
    </template>
  </PageLayout>
</template>
