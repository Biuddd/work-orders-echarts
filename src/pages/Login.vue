<template>
  <div class="login-container">
    <a-card title="Sign In" :bordered="false" class="card">
      <a-form layout="vertical" @submit.prevent="onSubmit">
        <a-form-item label="Username" required>
          <a-input v-model:value="username" placeholder="Enter username (admin for admin role)" />
        </a-form-item>
        <a-form-item label="Password" required>
          <a-input-password v-model:value="password" placeholder="Any value" />
        </a-form-item>
        <a-space>
          <a-form-item style="text-align: center; margin-top: 16px;">
            <a-button type="primary" @click="onSubmit">Login</a-button>
          </a-form-item>
        </a-space>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const username = ref('');
const password = ref('');

function onSubmit() {
  if (!username.value || !password.value) {
    message.warning('Please enter username and password');
    return;
  }
  store.login(username.value.trim());
  message.success(`Logged in as ${store.user.role}`);
  router.push({ name: 'dashboard' });
}
</script>

<style scoped lang="less">
.login-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f7fa;
}
.card {
  width: 360px;
}
</style>
