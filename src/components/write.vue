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
    <!--<el-button type="text" @click="dialogVisible = true" style="width: 100%;background-color: #409eff; color: #ffffff">上传文件</el-button>
    <el-dialog
      title="上传"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span style="margin: 10px 0px;font-size: 24px">题目</span>
      <el-input type="text" v-model="articleTitle"></el-input>
      <span style="margin: 10px 0px;font-size: 24px">作者</span>
      <el-input type="text" v-model="writer" disabled></el-input>
      <span style="margin: 10px 0px;font-size: 24px">正文</span>
      <el-input type="textarea" v-model="inner"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">提交</el-button>
  </span>
    </el-dialog>-->
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
<LeftMenu></LeftMenu>
<script>
  export default {
    name: "write",
    data(){
      return{
        access:'管理',
        /*dialogVisible: false,*/
        currentPage: 1,
        totalPage:1,
        /*articleTitle:'',
        writer:'sss',
        inner:'',*/
        tableData: [{
          name: 'ssss',
          writer: 'sssss'
        },],
        search: ''
      }
    },
    methods:{
      read(){
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      /*handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }*/
    }
  }
</script>

<style scoped>
/*  /deep/ .el-dialog__body{
    margin: 0px 30px;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .el-textarea__inner{
    min-height: 200px !important;
  }*/

</style>
