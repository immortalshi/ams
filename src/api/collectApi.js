import fetch from './util/fetch'

export default {
  // 将文章加入收藏
  addCollectArticle: async function (userId, articleId) {
    return fetch.basicGet(`/favorite/add?userId=${userId}&articleId=${articleId}`)
  },
  // 将文章移除收藏
  removeCollect: async function (userId, articleId) {
    return fetch.basicGet(`/favorite/delete?userId=${userId}&articleId=${articleId}`)
  }
}
