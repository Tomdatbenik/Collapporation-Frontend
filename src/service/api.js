import axios from 'axios'
import store from '@/store/index.js'

let isRefreshing = false
let subscribers = []

const service = axios.create({
  baseURL: 'http://localhost:8102/',
  withCredentials: false
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('user-token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer' + token
    }
    return config
  },
  response => {
    return response.data
  },
  error => {
    const {
      config,
      response: { status }
    } = error
    const originalRequest = config

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        store
          .dispatch('user/getRefreshToken')
          .then(newToken => {
            console.log(
              'received refresh token in api handler with token: ' + newToken
            )
            isRefreshing = false
            onRefreshed(newToken)
          })
          .catch(() => {
            return Promise.reject(error)
          })
      }

      const retryOriginalRequest = new Promise(resolve => {
        subscribeTokenRefresh(token => {
          // replace the expired token and retry
          console.log('setting refresh token as new header')
          originalRequest.headers['Authorization'] = 'Bearer' + token
          resolve(axios(originalRequest))
        })
      })

      return retryOriginalRequest
    }

    return Promise.reject(error)
  }
)

function subscribeTokenRefresh(cb) {
  subscribers.push(cb)
}

function onRefreshed(newToken) {
  subscribers = subscribers.filter(callback => callback(newToken))
}

export default service
