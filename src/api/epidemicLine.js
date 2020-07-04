import request from '@/utils/request'

export function getConfirmData() {
  return request({
    url: '/epidemicLine/getConfirmData',
    method: 'get'
  })
}
