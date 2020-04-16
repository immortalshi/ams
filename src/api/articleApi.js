import fetch from './util/fetch'

export default {
  // 添加文章
  addNewArticle: async function (articleObj) {
    return fetch.basicPost(`/article/add`, articleObj)
  },
  // 增加文章观看次数
  addArticleSeeCount: async function (articleId) {
    return fetch.basicGet(`/article/count?articleId=${articleId}`)
  },
  // 删除文章
  delArticle: async function (userId, articleId) {
    return fetch.basicGet(`/article/delete?userId=${userId}&articleId=${articleId}`)
  },
  // 修改文章
  updateArticle: async function (updateArticleObj) {
    return fetch.basicPost(`/article/edit`, updateArticleObj)
  },
  // 分页获取用户收藏文章
  getFavoriteArticle: async function (userId, page, size, searchText) {
    return fetch.basicGet(`/article/get/favorite?userId=${userId}&page=${page}&size=${size}&searchText=${searchText}`)
  },
  // 分页获取待审批文章
  getPendingArticle: async function (userId, page, size, searchText) {
    return fetch.basicGet(`/article/get/pending?userId=${userId}&page=${page}&size=${size}&searchText=${searchText}`)
  },
  // 分页获取已审批文章
  getReviewedArticle: async function (userId, page, size, searchText) {
    return fetch.basicGet(`/article/get/reviewed?userId=${userId}&page=${page}&size=${size}&searchText=${searchText}`)
  },
  // 分页获取已上传文章
  getSelfArticle: async function (userId, page, size, searchText) {
    return fetch.basicGet(`/article/get/self?userId=${userId}&page=${page}&size=${size}&searchText=${searchText}`)
  },
  // 审批文章
  reviewArticle: async function (reviewObj) {
    return fetch.basicPost(`/article/review`, reviewObj)
  }
}
