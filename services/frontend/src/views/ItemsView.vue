<template>
  <div class="items">
    <h2>Item Management</h2>

    <!-- Add Item Form -->
    <div class="add-item-section">
      <h3>Add New Item</h3>
      <form @submit.prevent="handleAddItem" class="add-item-form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            id="title"
            v-model="newItem.title"
            type="text"
            required
            placeholder="Enter item title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="newItem.description"
            placeholder="Enter item description"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" :disabled="loading" class="submit-button">
          {{ loading ? 'Adding...' : 'Add Item' }}
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Items List -->
    <div class="items-section">
      <h3>Items ({{ itemCount }})</h3>

      <div v-if="loading && items.length === 0" class="loading">
        Loading items...
      </div>

      <div v-else-if="items.length === 0" class="empty-state">
        No items found. Add your first item above!
      </div>

      <div v-else class="items-grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="item-card"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <small>{{ formatDate(item.createdAt) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ItemsView',
  data () {
    return {
      newItem: {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState(['items', 'loading', 'error']),
    ...mapGetters(['itemCount'])
  },
  async mounted () {
    await this.fetchItems()
  },
  methods: {
    ...mapActions(['fetchItems', 'addItem']),

    async handleAddItem () {
      if (!this.newItem.title.trim()) return

      await this.addItem({
        title: this.newItem.title.trim(),
        description: this.newItem.description.trim()
      })

      // Reset form if successful
      if (!this.error) {
        this.newItem = { title: '', description: '' }
      }
    },

    formatDate (dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.items {
  max-width: 800px;
  margin: 0 auto;
}

.add-item-section {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.add-item-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
  border: 1px solid #fcc;
}

.items-section h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.loading,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-style: italic;
}

.items-grid {
  display: grid;
  gap: 1rem;
}

.item-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.item-card:hover {
  transform: translateY(-2px);
}

.item-card h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.item-card p {
  margin: 0 0 1rem 0;
  color: #7f8c8d;
}

.item-card small {
  color: #95a5a6;
}
</style>
