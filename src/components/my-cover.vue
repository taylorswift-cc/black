<template>
  <div class="cover_container">
    <div class="btn-false" @click="openDialog">
      <img :src="value || defaultImg" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="mini" @change="toggleCol">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="item"
              :class="{selected:collectImgUrl === item.url}"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" @click="collectImgUrl=item.url" />
            </div>
          </div>
          <el-pagination
            class="paging"
            v-if="total>reqParams.per_page"
            :total="total"
            background
            layout="prev, pager, next"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="current"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
            style="text-align:center"
            name="image"
          >
            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store/store.js'
import defaultImg from '../assets/images/default.png'
export default {
  name: 'my-cover',
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      defaultImg,
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      collectImgUrl: null,
      uploadImgUrl: null,
      headers: { Authorization: `Bearer ${store.getUser().token}` }
    }
  },
  props: ['value'],
  methods: {
    confirmImg () {
      if (this.activeName === 'image') {
        this.$emit('input', this.collectImgUrl)
      } else {
        this.$emit('input', this.uploadImgUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.uploadImgUrl = res.data.url
    },
    current (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleCol () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.btn-false {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.img_list {
  padding-top: 20px;
  .item {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/50px;
      }
    }
  }
}
.paging {
  text-align: center;
}
.cover_container {
  display: inline-block;
  margin-right: 30px;
}
</style>
