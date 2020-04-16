import fetch from './util/fetch'

export default {
  // 修改用户信息
  updateUserInfo: async function (userInfo) {
    return fetch.basicPost(`/user/edit/info`, userInfo)
  },
  // 修改用户密码
  updateUserPassword: async function (id, oldPassword, newPassword) {
    return fetch.basicGet(`/user/edit/password?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}`)
  },
  // 用户登录
  login: async function (userObj) {
    return fetch.basicPost(`/user/login`, userObj)
  },
  // 用户注册
  register: async function (registerObj) {
    return fetch.basicPost(`/user/register`, registerObj)
  }
}
