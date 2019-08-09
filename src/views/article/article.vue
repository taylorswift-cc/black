<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>
          <template>内容管理</template>
        </my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="search.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核完成</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- v-model  ==  :value="search.channel_id"  @inpwut= -->
          <my-select v-model="search.channel_id"></my-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchC">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查到 {{count}} 条数据：</div>
      <div>
        <el-table :data="articles" style="width: 100%">
          <el-table-column label="头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.cover.images[0]"
                style="width:120px;height:80px"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <img src="../../assets/images/error.gif" style="width:120px;height:80px" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="danger">草稿</el-tag>
              <el-tag v-if="scope.row.status === 1">待审核</el-tag>
              <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
              <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                plain
                @click="edit(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                plain
                @click="del(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :page-size="search.per_page"
        background
        layout="prev, pager, next, total"
        :total="count"
        style="margin-top:20px;text-align:center"
        @current-change="changePage"
        :current-page="search.page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dataArr: [],
      articles: [],
      count: 0
    }
  },
  watch: {
    'search.channel_id': function (newVal, oldVal) {
      if (newVal === '') {
        this.search.channel_id = null
      }
    }
  },
  methods: {
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    del (id) {
      this.$confirm('文章删不删?', '提示你一哈子', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // async await如果报错会阻止后面的程序执行
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    searchC () {
      this.search.page = 1
      this.getArticles()
    },
    changePage (newPage) {
      this.search.page = newPage
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.search.begin_pubdate = dateArr[0]
        this.search.end_pubdate = dateArr[1]
      } else {
        this.search.begin_pubdate = null
        this.search.end_pubdate = null
      }
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.search })
      this.articles = data.results
      this.count = data.total_count
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
