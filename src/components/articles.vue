<template>
  <!--<ul style="list-style: none; padding-left: 20px">
    <li style="height: 250px;width: 200px; border-radius: 20px; border: dashed 1px gray;background-color: lightblue">
      <div class="top">
        <div style="width:180px;
                    position: absolute;
                    z-index: 9999;
                    text-align: center;
                    ">
          {{title}}
        </div>
        <img src="../assets/fj.jpg" style="width: 100%; height: 100%; border-radius: 20px 20px 0px 0px;"@click="read"/></div>
      <el-button style="margin-top: 10px" type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button v-if="this.access !== '管理'" style="margin-top: 10px" type="info" icon="el-icon-delete" circle disabled></el-button>
      <el-button v-else style="margin-top: 10px" type="primary" icon="el-icon-delete" circle></el-button>
      &lt;!&ndash;<el-button type="primary" style="height: 50px; width: 184px; border-radius: 0px 0px 20px 20px; margin-bottom: 8px">

        &lt;!&ndash;<el-button type="primary" style="margin: 17px 0px; width:100px" round>删除</el-button>&ndash;&gt;
        删除
      </el-button>&ndash;&gt;
    </li>
  </ul>-->
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
        label="ModifyTime"
        prop="modifyTime">
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
            icon="el-icon-star-off"
            title="收藏"
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
import collectApi from '../api/collectApi'
import {mapGetters} from 'vuex'
export default {
  name: 'articles',
  data () {
    return {
      loading: true,
      access: '管理',
      currentPage: 0,
      totalPage: 0,
      size: 10,
      tableData: [],
      newData: [],
      search: ''
    }
  },
  created () {
    this.getReviewedArticle()
  },
  computed: {
    ...mapGetters({
      searchText: 'userInfo/searchText'
    })
  },
  watch: {
    searchText: function () {
      this.getReviewedArticle()
    }
  },
  methods: {
    addSeeCount (row) {
      articleApi.addArticleSeeCount(row.id)
    },
    getReviewedArticle () {
      articleApi.getReviewedArticle(JSON.parse(localStorage.getItem('user')).id, this.currentPage, this.size, this.searchText).then(res => {
        this.loading = false
        this.totalPage = res.res.total
        res.res.data.forEach(item => {
          item.createTime = this.renderTime(item.createTime)
          item.modifyTime = this.renderTime(item.modifyTime)
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
      collectApi.addCollectArticle(row.userId, row.id).then(res => {
        if (res.code === 200) {
          this.$message.success('收藏成功')
          this.getReviewedArticle()
        } else {
          this.$message.error('收藏失败')
        }
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
            this.getReviewedArticle()
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.getReviewedArticle()
    },
    handleCurrentChange (val) {
      this.currentPage = val - 1
      this.getReviewedArticle()
    }
  }
}
</script>

<style scoped>

</style>
