import request from '@/utils/request'

// 疑似人员
export function suspectPersonList(params) {
  return request({
    url: '/suspectPerson/SuspectPersonList',
    method: 'get',
    params
  })
}

export function findSuspectPersonEdit(suspectPersonId) {
  return request({
    url: '/suspectPerson/getSuspectPerson',
    method: 'get',
    params: { suspectPersonId }
  })
}

export function saveSuspectPerson(suspectPerson) {
  return request({
    url: '/suspectPerson/addSuspectPerson',
    method: 'post',
    data: suspectPerson
  })
}

export function updateSuspectPerson(suspectPerson) {
  return request({
    url: '/suspectPerson/updateSuspectPerson',
    method: 'post',
    data: suspectPerson
  })
}

export function deleteSuspectPerson(suspectPersonId) {
  return request({
    url: '/suspectPerson/deleteSuspectPerson',
    method: 'get',
    params: { suspectPersonId }
  })
}
