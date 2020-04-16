import { generate } from '../../api/util/axios_index'
const commonApi = 'http://127.0.0.1:8088'

const basicApi = generate({baseUrl: commonApi})

export default {
  basicGet: basicApi.get,
  basicPost: basicApi.post
}
