<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{settingForm.id}}</el-form-item>
            <el-form-item label="手机：">{{settingForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="settingForm.name">{{settingForm.name}}</el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" v-model="settingForm.intro">{{settingForm.intro}}</el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="settingForm.email">{{settingForm.email}}</el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="setData">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :headers="headers"
            style="text-align:center"
            :http-request="patch"
            name="photo"
          >
            <img v-if="settingForm.photo" :src="settingForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import store from '@/store/store.js'
import eventBus from '@/components/eventBus.js'
export default {
  data () {
    return {
      settingForm: {
        name: '',
        intro: '',
        email: '',
        id: '',
        mobile: '',
        photo: ''
      },
      headers: { Authorization: `Bearer ${store.getUser().token}` }
    }
  },
  methods: {
    async patch (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      const res = await this.$http.patch('user/photo', formData)
      this.$message.success('头像修改成功')
      this.settingForm.photo = res.data.data.photo
      store.setUser({ photo: res.data.data.photo })
      eventBus.$emit('updataAvatar', res.data.data.photo)
    },
    async setData () {
      await this.$http.patch('user/profile', {
        name: this.settingForm.name,
        intro: this.settingForm.intro,
        email: this.settingForm.email
      })
      this.$message.success('资料修改成功')
      store.setUser({ name: this.settingForm.name })
      eventBus.$emit('updataName', this.settingForm.name)
    },
    async getData () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.settingForm = data
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="less">
</style>
