
const state = {
  userInfo: {
    username: '',
    userId: '',
    avatar: ''
  }
}

const mutations = {
  updateUser (state, userInfo) {
    state.userInfo.username = userInfo.username
    state.userInfo.userId = userInfo.userId
    state.userInfo.avatar = userInfo.avatar
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
