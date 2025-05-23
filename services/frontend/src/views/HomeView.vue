<template>
  <div class="home">
    <div class="hero">
      <h2>Welcome to the Item Manager</h2>
      <p>This application demonstrates a modern microservices architecture on Google Cloud Platform</p>

      <div class="features">
        <div class="feature">
          <h3>🚀 Microservices</h3>
          <p>Event-driven architecture with Pub/Sub messaging</p>
        </div>
        <div class="feature">
          <h3>☁️ Cloud Native</h3>
          <p>Kubernetes, Firestore, and GCP best practices</p>
        </div>
        <div class="feature">
          <h3>🔧 DevOps</h3>
          <p>CI/CD, Infrastructure as Code, and monitoring</p>
        </div>
      </div>

      <router-link to="/items" class="cta-button">
        Get Started →
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.hero > p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature:hover {
  transform: translateY(-4px);
}

.feature h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.feature p {
  margin: 0;
  color: #7f8c8d;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
}
</style>
