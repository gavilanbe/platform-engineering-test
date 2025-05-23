<template>
  <div id="app">
    <header class="app-header">
      <h1>Item Manager</h1>
      <p>Platform Engineering Test - Microservices Architecture</p>
    </header>

    <nav class="app-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/items">Items</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  margin-b  margin-b  margin-b  marh1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.app-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.app-nav {
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  gap: 1rem;
}

.app-nav a {
  color: #495057;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  background-color: #667eea;
  color: white;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
