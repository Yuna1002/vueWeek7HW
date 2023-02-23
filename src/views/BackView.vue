<template>
    這是後台
    <div class="d-flex justify-content-between align-items-center ">
      <div>
        <router-link to="/admin/backProducts">產品管理</router-link> |
      <router-link to="/admin/backOders">訂單管理</router-link> |
      <router-link to="/" >返回前台</router-link>
      </div>
      <div><button class="btn btn-primary" type="button" @click.prevent="logout">登出</button></div>
    </div>

      <hr>
      <router-view></router-view>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env
export default {
  components: {
    RouterLink,
    RouterView
  },
  methods: {
    logout () {
      document.cookie = `yunaToken=; expires=${new Date()}`
      this.$router.push('/login')
    },
    checkAccount () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)yunaToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(`${VITE_APP_URL}/api/user/check`)
        .then((res) => {
          //
        })
        .catch((err) => {
          if (!err.response.data.success) {
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.checkAccount()
  }
}
</script>
