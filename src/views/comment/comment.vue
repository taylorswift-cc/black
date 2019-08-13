<template>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <div>
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.comment_status"
              type="success"
              size="small"
              @click="toggleCom(scope.row)"
            >打开评论</el-button>
            <el-button v-else type="danger" size="small" @click="toggleCom(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="commentForm.per_page"
      :current-page="commentForm.page"
      @current-change="commentPage"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      commentForm: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 110,
      comments: []
    }
  },
  methods: {
    async toggleCom (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      row.comment_status = data.allow_comment
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
    },
    commentPage (newPage) {
      this.commentForm.page = newPage
      this.getComment()
    },
    async getComment () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.commentForm })
      this.comments = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style scoped lang="less">
</style>
