<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%" v-loading="loading">
      <el-table-column
        align="center"
        label="ID"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        label="Name"
        prop="name">
      </el-table-column>
      <el-table-column
        align="center"
        label="Writer"
        prop="authorName">
      </el-table-column>
      <el-table-column
        align="center"
        label="CreateTime"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="Action"
        prop="action">
        <!--      <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>-->
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="addSeeCount(scope.row)"
            title="浏览"
            circle>
          </el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-check"
            title="通过"
            circle
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            size="small"
            type="info"
            icon="el-icon-delete"
            title="删除"
            circle
            disabled
            @click="handleDelete(scope.$index, scope.row)"
            v-if="access !== '管理'"></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            title="删除"
            circle
            @click="handleDelete(scope.$index, scope.row)"
            v-else></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage + 1"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import articleApi from '../api/articleApi'
import {mapGetters} from 'vuex'
export default {
  name: 'check',
  data () {
    return {
      reviewObj: {},
      loading: true,
      access: '管理',
      currentPage: 0,
      size: 10,
      totalPage: 0,
      tableData: [{
        name: 'ssss',
        writer: 'sssss'
      }],
      search: ''
    }
  },
  created () {
    this.getPendingArticle()
  },
  computed: {
    ...mapGetters({
      searchText: 'userInfo/searchText'
    })
  },
  watch: {
    searchText: function () {
      this.getPendingArticle()
    }
  },
  methods: {
    addSeeCount (row) {
      articleApi.addArticleSeeCount(row.id)
    },
    getPendingArticle () {
      articleApi.getPendingArticle(JSON.parse(localStorage.getItem('user')).id, this.currentPage, this.size, this.searchText)
        .then(res => {
          this.loading = false
          this.totalPage = res.res.total
          res.res.data.forEach(item => {
            item.createTime = this.renderTime(item.createTime)
          })
          this.tableData = res.res.data
        })
    },
    renderTime (date) {
      if (date) {
        return new Date(+new Date(new Date(date).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      } else {
        return ''
      }
    },
    read () {
    },
    handleEdit (index, row) {
      this.reviewObj = {
        articleId: row.id,
        userId: row.userId,
        pass: true
      }
      this.$confirm('是否通过该文章？', '提示', {
        confirmButton: '通过',
        cancelButtonText: '不通过'
      }).then(() => {
        articleApi.reviewArticle(this.reviewObj).then(res => {
          if (res.code === 200) {
            this.$message.success('审批成功')
            this.currentPage = 0
            this.getPendingArticle()
          } else {
            this.$message.error('审批失败')
          }
        })
      }).catch(() => {
        this.reviewObj.pass = false
        articleApi.reviewArticle(this.reviewObj).then(res => {
          if (res.code === 200) {
            this.$message.success('审批成功')
            this.currentPage = 0
            this.getPendingArticle()
          } else {
            this.$message.error('审批失败')
          }
        })
      })
    },
    handleDelete (index, row) {
      this.$confirm('是否直接删除该文章？', '提示', {
        confirmButton: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        articleApi.delArticle(row.userId, row.id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.currentPage = 0
            this.getPendingArticle()
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.getPendingArticle()
    },
    handleCurrentChange (val) {
      this.currentPage = val - 1
      this.getPendingArticle()
    }
  }
}
</script>

<style scoped>

</style>
