<!--
<template>

</template>

<script>
    export default {
        name: "searchArticles"
    }
</script>

<style scoped>

</style>
-->
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
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
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
        prop="writer">
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
        :current-page="currentPage"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchArticles',
  data () {
    return {
      access: '管理',
      currentPage: 1,
      totalPage: 1,
      tableData: [{
        name: 'ssss',
        writer: 'sssss'
      }],
      search: ''
    }
  },
  methods: {
    read () {
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
