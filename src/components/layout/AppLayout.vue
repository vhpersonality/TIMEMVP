<template>
  <el-container class="layout-container" style="height: 100vh">
    <AppSidebar />
    <el-container>
      <AppHeader />
      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>

<style scoped>
.layout-container .el-main {
  padding: 20px;
  background-color: #f8f9fa;
}
</style>