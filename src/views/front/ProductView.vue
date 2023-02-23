<template>
    <h3 class="mb-4">產品詳情</h3>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h3>{{ product.title }}</h3>
                <img class="img-fluid" :src="product.imageUrl" alt="">
            </div>
            <div class="col-6">
                <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                  <p>商品描述：{{ product.description }}</p>
                  <p>商品內容：{{product.content  }}</p>
            </div>
        </div>
    </div>

</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err)
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }

}
</script>
