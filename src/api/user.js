import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName: userName,
    userPassword: password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'permission/findByCurrentUser',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

/* SWJ- 通过id向后台获取该id内容详情 */
export const getContentByMsgId = msg_id => {
// console.log("获取内容的id")
// console.log(msg_id)
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      id: msg_id
    }
  })
}

/* SWJ-向后台标记已读，传id */
export const hasRead = msg_id => {
  // console.log("标记已读的id")
  // console.log(msg_id)
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msgId: msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
