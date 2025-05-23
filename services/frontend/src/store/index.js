import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_ITEMS (state, items) {
      state.items = items
    },
    ADD_ITEM (state, item) {
      state.items.push(item)
    },
    SET_ERROR (state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchItems ({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const response = await fetch('/api/items')
        const items = await response.json()
        commit('SET_ITEMS', items)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching items:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addItem ({ commit, dispatch }, item) {
      commit('SET_ERROR', null)

      try {
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })

        if (response.ok) {
          // Refresh items list
          dispatch('fetchItems')
        } else {
          throw new Error('Failed to add item')
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error adding item:', error)
      }
    }
  },
  getters: {
    itemCount: state => state.items.length,
    isLoading: state => state.loading,
    hasError: state => !!state.error
  }
})
