<template>
    <div>
      <el-badge v-if="newMsg===0" :value="newMsg" :max="99" :hidden="true">
        <i class="el-icon-chat-dot-round" style=" text-align: center; font-size: 24px" @click="readMsg"></i>
      </el-badge>
      <el-badge v-else :value="newMsg" :max="99" :hidden="false">
        <i class="el-icon-chat-dot-round" style=" text-align: center; font-size: 24px" @click="readMsg"></i>
      </el-badge>
      <el-drawer
        title="我是标题"
        :visible.sync="messageDialog"
        :with-header="false"
        direction="ltr">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="信息"
            width="300"
            align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.message }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                title="删除"
                circle
                @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "message",
      data(){
          return{
            messageDialog: false,
            tableData: [{
              message: '提交成功',
            }],
            totalMsg:0,
            newMsg:122,
            oldMsg:0,
            count:0,
            max:'99',
            /*message:'',*/
          }
      },
      methods:{
        readMsg(){
          this.messageDialog = true
          this.oldMsg += this.newMsg
          this.newMsg = 0
          this.count = this.oldMsg + this.newMsg
        },
      }
    }
</script>

<style scoped>

</style>
