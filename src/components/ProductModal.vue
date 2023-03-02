<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew == true">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        {{ tempProduct }}
        <div class="modal-body">
          <div class="row">
            <!-- 圖片區 -->
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <h4>主要圖片</h4>
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                  <div class="mb-3">
                    <label for="customFile" class="form-label"
                      >或上傳圖片</label
                    >
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="fileInput"
                      @change="uploadFile"
                    />
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                </div>
                <!-- **多圖新增 -->
                <div>
                  <h4>多圖新增</h4>
                  <!-- 以防萬一 判斷tempProduct.imagesUrl是一個陣列，是的話顯示 -->
                  <div v-if="Array.isArray(tempProduct.imagesUrl)">
                    <template
                      v-for="(img, key) in tempProduct.imagesUrl"
                      :key="key"
                    >
                      <input
                        class="w-100"
                        type="text"
                        v-model="tempProduct.imagesUrl[key]"
                      />
                      <img
                        class="img-fluid"
                        :src="tempProduct.imagesUrl[key]"
                        alt=""
                      />
                    </template>
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      v-if="
                        !tempProduct.imagesUrl.length ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                      @click="tempProduct.imagesUrl.push('')"
                    >
                      <!-- v-if＝images是空的或欄位有值時 -->
                      新增圖片
                    </button>
                    <button
                      v-else
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.pop('')"
                    >
                      刪除圖片
                    </button>
                  </div>
                  <div v-else>
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="$emit('createImages')"
                    >
                      新增圖片
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 產品詳情區 -->
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>

              <!-- <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入原價"
                      v-model.number="tempProduct.origin_price"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      id="unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div> -->
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">食用方法</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  v-model="tempProduct.食用方法"
                />
              </div>
              <!-- 成份 -->
              <div class="mb-3">
                <div class="input-group mb-3 row">
                  <div class="col-4">
                    <label for="title" class="form-label">成份</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempProduct.element.title"
                    />
                  </div>
                  <div class="col-4">
                    <label for="quantity" class="form-label">含量</label>
                    <input
                      type="text"
                      class="form-control"
                      id="quantity"
                      v-model="tempProduct.element.quantity"
                    />
                  </div>
                  <div class="col-4">
                    <label for="percent" class="form-label"
                      >每日參考值百分比</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      v-model="tempProduct.element.percent"
                    />
                  </div>
                </div>
                <div>
                  <template
                    v-for="(element, key) in tempProduct.elements"
                    :key="key"
                  >
                    <div class="input-group mb-3 row">
                      <div class="col-4">
                        <label for="title" class="form-label">成份</label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          v-model="tempProduct.elements[key].title"
                        />
                      </div>
                      <div class="col-4">
                        <label for="quantity" class="form-label">含量</label>
                        <input
                          type="text"
                          class="form-control"
                          id="quantity"
                          v-model="tempProduct.elements[key].quantity"
                        />
                      </div>
                      <div class="col-4">
                        <label for="percent" class="form-label"
                          >每日參考值百分比</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="percent"
                          v-model="tempProduct.elements[key].percent"
                        />
                      </div>
                    </div>
                  </template>
                  <button
                    type="button"
                    class="col-2"
                    @click="tempProduct.elements.push({})"
                  >
                    新增
                  </button>
                  <button class="col-2" @click="tempProduct.elements.pop('')">
                    刪除
                  </button>
                </div>
              </div>
              <!-- 成份end -->
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="$emit('update-product', tempProduct)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-product', 'createImages'],
  data () {
    return {
      productModal: null,
      tempProduct: {
        origin_price: 0,
        unit: '顆',
        element: {
          title: ''
        },
        elements: []
      }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  methods: {
    show () {
      this.productModal.show()
    },
    hide () {
      this.productModal.hide()
    },
    uploadFile () {
      // 取出上傳之圖片
      const file = this.$refs.fileInput.files[0]
      // api上傳格式為formData
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.fileInput.value = ''
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.productModal = new Modal(this.$refs.productModal)
  }
}
</script>
