<template>
    <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModel('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{product.category}}</td>
              <td>{{ product.title }}</td>
              <td class="text-end">{{ product.origin_price }}</td>
              <td class="text-end">{{ product.price }}</td>
              <td>
                <span class="text-success" v-if="product.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModel('edit',product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModel('delete',product)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <pagination
          :pages="pages"
          @change-page="getProducts"
          :get-products="getProducts"
        ></pagination> -->
        <!-- Modal -->
      <!-- 新增及編輯model -->

        <ProductModal
          :product="tempProduct"
          @update-product="updateProduct"
          :is-new="isNew"
          ref="productModal"
        ></ProductModal>

      <!-- 刪除model -->
        <DelProductModal
          :temp-Product="tempProduct"
          @delete-Product="deleteProduct"
          ref="delProductModal"
        ></DelProductModal>
      </div>
</template>
<script>
import ProductModal from '../../components/ProductModal.vue'
import DelProductModal from '../../components/DelProductModal.vue'
// import Modal from 'bootstrap/js/dist/modal'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      // productModal: null,
      // delProductModal: null,
      products: [],
      isNew: false, // 因為開同一個model，判斷是新增/編輯
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  components: {
    ProductModal,
    DelProductModal
  },
  methods: {
    getProducts (page = 1) {
      // page=1 預設第一頁
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          // console.log(res.data);
          this.products = res.data.products
          // this.pages = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 判斷開啟的model種類
    openModel (state, product) {
      if (state === 'new') {
        this.tempProduct = {
          imagesUrl: []
        } //* *
        this.isNew = true
        this.$refs.productModal.show()
      } else if (state === 'edit') {
        this.isNew = false
        this.tempProduct = { ...product }
        this.$refs.productModal.show()
      } else if (state === 'delete') {
        this.tempProduct = { ...product } // 後端認id
        this.$refs.delProductModal.show()
      }
    },
    updateProduct () {
      //* *
      let method = 'post'
      let sub = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`
      if (!this.isNew) {
        sub = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      this.$http[method](sub, {
        data: this.tempProduct
      })
        .then((res) => {
          alert(res.data.message)
          this.$refs.productModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteProduct () {
      // model裡的確定鍵
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.$refs.delProductModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
    // model實體化
    // this.productModal = new Modal('#productModal')
    // this.delProductModal = new Modal('#delProductModal')
  }
}
</script>
