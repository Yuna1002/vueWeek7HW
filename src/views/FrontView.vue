<template>
    這是前台
    <div class="d-flex justify-content-between align-items-center ">
      <div>
        <router-link to="/">首頁</router-link> |
      <router-link to="/products">產品列表</router-link>|
      <router-link to="/cart">購物車</router-link>
      </div>
      <div><router-link to="/admin" class="btn btn-primary">前往後台</router-link></div>
    </div>

      <hr>
      <router-view></router-view>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  components: {
    RouterLink,
    RouterView
  }
}
</script>
