<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/">首页</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
	position: absolute;
	top: 5px;
	left: 5px;
}
</style>
