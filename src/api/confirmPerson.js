import request from '@/utils/request'

// 确诊人员
export function confirmPersonList(params) {
  return request({
    url: '/confirmPerson/ConfirmPersonList',
    method: 'get',
    params
  })
}

export function findConfirmPersonEdit(confirmPersonId) {
  return request({
    url: '/confirmPerson/getConfirmPerson',
    method: 'get',
    params: { confirmPersonId }
  })
}

export function saveConfirmPerson(confirmPerson) {
  return request({
    url: '/confirmPerson/addConfirmPerson',
    method: 'post',
    data: confirmPerson
  })
}

export function updateConfirmPerson(confirmPerson) {
  return request({
    url: '/confirmPerson/updateConfirmPerson',
    method: 'post',
    data: confirmPerson
  })
}

export function deleteConfirmPerson(confirmPersonId) {
  return request({
    url: '/confirmPerson/deleteConfirmPerson',
    method: 'get',
    params: { confirmPersonId }
  })
}
