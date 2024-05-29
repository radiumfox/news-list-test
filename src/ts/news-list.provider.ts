import { NewsItemDTO, DateItem, NewsItem, NavDTO } from './types'
import moment from 'moment'

export class NewsListProvider {
  private rawNews: NewsItemDTO[]
  private _nav: NavDTO
  private _list: NewsItem[]

  constructor(rawNews: NewsItemDTO[], nav: NavDTO) {
    this.rawNews = rawNews
    this._nav = nav
    this._list = this.formatList(this.rawNews)
  }

  public get list(): NewsItem[] {
    return this._list
  }

  set list(newItems: NewsItemDTO[]) {
    this._list = this._list.concat(this.formatList(newItems))
  }

  public get nav() {
    return this._nav
  }

  public set nav(val) {
    this._nav = val
  }

  private formatList(list: NewsItemDTO[]) {
    return list.map((item: NewsItemDTO) => {
      return {
        ...item,
        date: this.getDate(item.date),
        type: item.type.value
      }
    })
  }

  private getDate(date: number): DateItem {
    const momentObj = moment(date)
    return {
      day: momentObj.date(),
      monthYear: momentObj.format('MMMM YYYY')
    }
  }

  public get canLoadMore() {
    return this.nav.current < this.nav.total
  }
}
