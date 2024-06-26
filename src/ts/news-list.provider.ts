import { NewsItemDTO, DateItem, NewsItem, NavDTO } from './types'
import moment from 'moment'

export class NewsListProvider {
  private _nav: NavDTO
  private _list: NewsItem[]

  constructor() {
    this._nav = { current: 0, total: 0 }
    this._list = []
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

  set nav(val: NavDTO) {
    this._nav = val
  }

  public get isLastPage() {
    return this.nav.current >= this.nav.total
  }

  private formatList(list: NewsItemDTO[]): NewsItem[] {
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
}
