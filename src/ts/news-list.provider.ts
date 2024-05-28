import { NewsItemDTO, DateItem, NewsItem } from './types'
import moment from 'moment'

export class NewsListProvider {
  rawNews: NewsItemDTO[]

  constructor(rawNews: NewsItemDTO[]) {
    this.rawNews = rawNews
  }

  get list(): NewsItem[] {
    return this.rawNews.map((item: NewsItemDTO) => {
      return {
        ...item,
        date: this.getDate(item.date),
        type: item.type.value
      }
    })
  }

  getDate(date: number): DateItem {
    const momentObj = moment(date)
    return {
      day: momentObj.date(),
      monthYear: momentObj.format('MMMM YYYY')
    }
  }
}
