<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group
        v-model="reqParams.collect"
        size="small"
        style="width:100%;margin-bottom:20px"
        @change="toggleAll"
      >
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
        <el-button type="success" size="small" style="float:right" @click="openDialog">添加素材</el-button>
      </el-radio-group>
      <div class="item_box">
        <div class="img_box" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="opcity_box" v-show="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggle(item)"></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        v-if="total>reqParams.per_page"
        @current-change="changeCollect"
      ></el-pagination>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
          :headers="headers"
          style="text-align:center"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: { Authorization: `Bearer ${store.getUser().token}` }
    }
  },
  methods: {
    toggleAll () {
      console.log(this.reqParams.collect)
      this.reqParams.page = 1
      this.getImg()
    },
    delImg (id) {
      this.$confirm('删不删?', '提示一哈子', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除素材成功')
          this.getImg()
        })
        .catch(() => {})
    },
    async toggle (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('添加素材成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImg()
      }, 2000)
    },
    openDialog () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    changeCollect (page) {
      this.reqParams.page = page
      this.getImg()
    },
    async getImg () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.img_box {
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 50px;
  margin-bottom: 20px;
  display: inline-block;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .opcity_box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    span {
      margin: 0 20px;
    }
    .red {
      color: red;
    }
  }
}
</style>
