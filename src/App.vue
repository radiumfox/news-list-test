<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { NewsListProvider } from '@/ts/news-list.provider'
import { NewsListService } from '@/ts/news-list.service'
import { SCREEN_WIDTHS } from '@/ts/constants'
import CardItem from '@/components/CardItem.vue'
import CardPreloader from '@/components/CardPreloader.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import PageLayout from '@/layouts/PageLayout.vue'

/**
 * Прим.:
 * По запросу приходит список из 10 элементов,
 * для красоты отображаем 9 на пк и тлф, и 8 на планшете
 *
 * Метод addNews() добавляет новости в список отображаемых новостей displayedList
 * и убирает уже показанные из "резерва" $NewsListProvider.list
 */

let $NewsListProvider = reactive(new NewsListProvider([], {}))

const newsLoading = ref(true)
const buttonLoading = ref(false)
const newsCount = ref(
  window.innerWidth > SCREEN_WIDTHS.TABLET || window.innerWidth <= SCREEN_WIDTHS.MOBILE ? 9 : 8
)

let displayedList = reactive([])

const fetchNews = () => {
  buttonLoading.value = true

  NewsListService.fetchNews($NewsListProvider.nav.current + 1)
    .then((data) => {
      $NewsListProvider.list = data.items
      $NewsListProvider.nav = data.nav

      addNews()
    })
    .finally((res) => {
      newsLoading.value = false
      buttonLoading.value = false
    })
}

const addNews = () => {
  displayedList = displayedList.concat($NewsListProvider.list.slice(0, newsCount.value))
  $NewsListProvider.list.splice(0, newsCount.value)
}

const showMoreNews = () => {
  if (!$NewsListProvider.isLastPage) {
    fetchNews()
  } else {
    addNews()
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <PageLayout title="Новости">
    <template #content>
      <div v-if="newsLoading" class="cards-list">
        <CardPreloader />
        <CardPreloader />
        <CardPreloader />
      </div>

      <template v-else>
        <div class="cards-list">
          <CardItem
            v-for="(item, index) in displayedList"
            :title="item.name"
            :text="item.previewText"
            :img-src="item.image"
            :date="item.date"
            :tags="[item.type]"
            href="/"
          />
        </div>
        <div class="button-more-container">
          <ButtonBase
            @click="showMoreNews()"
            v-if="$NewsListProvider.list.length"
            text="Загрузить еще"
            :loading="buttonLoading"
          />
        </div>
      </template>
    </template>
  </PageLayout>
</template>
