import request from '@/utils/request'

export function getData() {
  return request({
    url: '/epidemicMap/getData',
    method: 'get'
  })
}
