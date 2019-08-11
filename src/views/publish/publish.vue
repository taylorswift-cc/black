<template>
  <div class="pub_container">
    <el-card>
      <div slot="header">
        <my-bread>{{this.pubOrEdit?'修改':'发布'}}文章</my-bread>
      </div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="标题：">
            <el-input v-model="articleForm.title" placeholder="文章标题" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="内容：">
            <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
          </el-form-item>
          <el-form-item label="封面：">
            <el-radio-group v-model="articleForm.cover.type" @change="empty">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div v-if="articleForm.cover.type === 1">
              <my-cover v-model="articleForm.cover.images[0]"></my-cover>
            </div>
            <div v-else-if="articleForm.cover.type === 3">
              <my-cover v-model="articleForm.cover.images[0]"></my-cover>
              <my-cover v-model="articleForm.cover.images[1]"></my-cover>
              <my-cover v-model="articleForm.cover.images[2]"></my-cover>
            </div>
            <!-- 添加封面组件位置 -->
          </el-form-item>
          <el-form-item label="频道：">
            <my-select v-model="articleForm.channel_id"></my-select>
          </el-form-item>
          <el-form-item>
            <el-button
              :type="this.pubOrEdit?'success':'primary'"
              @click="publish(false)"
            >{{this.pubOrEdit?'修改':'发表'}}</el-button>
            <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  watch: {
    $route: function () {
      if (!this.$route.query.id) {
        this.pubOrEdit = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    if (this.pubOrEdit) {
      this.getEditData()
    }
  },
  methods: {
    async getEditData () {
      const {
        data: { data }
      } = await this.$http.get(`articles/${this.pubOrEdit}`)
      this.articleForm = data
    },
    empty () {
      this.articleForm.cover.images = []
    },
    async publish (draft) {
      if (this.pubOrEdit) {
        await this.$http.put(
          `articles/${this.pubOrEdit}?draft=${draft}`,
          this.articleForm
        )
        this.$message.success(
          draft ? '文章修改并存入草稿成功' : '文章修改成功'
        )
      } else {
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      }
      this.$router.push('/article')
    }
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      pubOrEdit: this.$route.query.id,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
