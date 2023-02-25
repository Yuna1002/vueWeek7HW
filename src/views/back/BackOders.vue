<template>
    <div class="container">

        <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in orders" :key="item.id">
                <!-- 未付款 文字顏色為灰色 -->
            <tr :class="{ 'text-secondary': !item.is_paid }">
                <td>{{ $filters.date(item.create_at) }}</td>
                <!-- <span v-text="item.user.email" v-if="item.user"></span> -->
                  <td>{{ item.user.email }}</td>
                  <td>
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                        {{ product.product.title }} 數量：{{ product.qty }}
                        {{ product.product.unit }}
                      </li>
                    </ul>
                  </td>
                  <td >{{ $filters.toThousands(item.total) }}</td>
                  <td>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`paidSwitch${item.id}`"
                        v-model="item.is_paid"
                        @change="updatePaid(item)"
                      />
                      <label class="form-check-label" :for="`paidSwitch${item.id}`">
                        <span v-if="item.is_paid">已付款</span>
                        <span v-else>未付款</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-primary btn-sm"
                        type="button"
                        @click="openOrderModal(item)"
                      >
                        檢視
                      </button>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        type="button"
                        @click="openDelModal(item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
            </tr>
          </template>
        </tbody>
      </table>
      <OrderModal @update-paid="updatePaid" :order="tempOrder" ref="orderModal"></OrderModal>
      <DelModal
              :item="tempOrder"
              @del-item="delOrder"
              ref="delModal"
            ></DelModal>
       <BackPagination
              :pages="pages"
              @emit-Pages="getOrders"
        ></BackPagination>
    </div>
</template>

<script>
import OrderModal from '../../components/OrderModal.vue'
import DelModal from '../../components/DelModal.vue'
import BackPagination from '../../components/BackPagination.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      orders: [],
      tempOrder: {},
      pages: {}
    }
  },
  components: {
    OrderModal,
    DelModal,
    BackPagination
  },
  methods: {
    getOrders (page = 1) {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          console.log('orders', res.data.orders)
          this.orders = res.data.orders
          this.pages = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    updatePaid (item) {
      const data = {
        is_paid: item.is_paid
      }
      this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${item.id}`, { data }).then((res) => {
        alert(res.data.message)
      })
    },
    openOrderModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.show()
    },
    openDelModal (item) {
      this.tempOrder = { ...item }
      this.$refs.delModal.show()
    },
    delOrder () {
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        // 打開modal時item就被複製至tempOrder
        .then((res) => {
          this.$refs.delModal.hide()
          alert(res.data.message)
          this.getOrders()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  mounted () {
    this.getOrders()
  }
}
</script>
