<template>
  <div class="login-container">
    <div class="login-form">
      <form @submit.prevent="handleLogin">
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="p.username" type="text" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="p.password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {login } from "../api/user.ts";

export default defineComponent({
  setup() {
    const p = ref({username:null,password:null});


    const handleLogin = async () => {
      try {

        login(p.value).then((res:any)=>{
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
        })
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    return {
      p,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center fixed;
  background-size: cover;
}

.login-form {
  background: rgba(255, 255, 255, 0.3); /* Semi-transparent white background */
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px); /* Apply blur effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
