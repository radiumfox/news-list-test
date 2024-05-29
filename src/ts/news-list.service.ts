import axios from 'axios'

export class NewsListService {
  static async fetchNews(page: number = 1) {
    try {
      const res = await axios.get(`https://flems.github.io/test/api/news/${page}`)

      if (res.status === 200) {
        return res.data
      }

      throw new Error('Something went wrong')
    } catch (e) {
      console.log(e)
    }
  }
}
