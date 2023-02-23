<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1 class="h3 mb-3 font-weight-normal text-center">登入後台</h1>
            <div class="col-8 ">
                <form id="form" class="form-signin" @submit.prevent="login">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="name@example.com"
                  required
                  autofocus
                  v-model="user.username"
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  v-model="user.password"
                />
                <label for="password">Password</label>
              </div>
              <button
                class="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
                @click="login"
              >
                登入
              </button>
            </form>
            </div>
        </div>
    </div>

</template>
<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post(`${VITE_APP_URL}/admin/signin`, this.user)
        .then((res) => {
          // 將token、expired儲存在cookie
          const { token, expired } = res.data
          document.cookie = `yunaToken=${token}; expires=${new Date(expired)}`

          this.$router.push('/admin/backProducts')
        })
        .catch((err) => {
          if (err.response.data.success === false) {
            alert('輸入錯誤，請重新輸入')
            this.user.username = ''
            this.user.password = ''
          }
        })
    }
  }
}
</script>
