<template>
  <el-dialog title="导入业务表" :visible.sync="visible" width="65%" top="5vh">
    <div class="ele-body">
      <el-card shadow="never">
        <!-- 搜索表单 -->
        <el-form :model="table.where" label-width="77px" class="ele-form-search"
                @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
          <el-row :gutter="15">
            <el-col :md="6" :sm="12">
              <el-form-item label="表名称:">
                <el-input v-model="table.where.tableName" placeholder="请输入表名称" clearable/>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12">
              <el-form-item label="表描述:">
                <el-input v-model="table.where.tableComment" placeholder="请输入表描述" clearable/>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12">
              <div class="ele-form-actions">
                <el-button type="primary" @click="$refs.table.reload()" icon="el-icon-search" class="ele-btn-icon">查询
                </el-button>
                <el-button @click="(table.where={})&&$refs.table.reload()">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- 数据表格 -->
        <ele-data-table ref="table" :config="table" :choose.sync="choose" highlight-current-row>
          <template slot-scope="{index}">
            <el-table-column type="selection" width="45" align="center" fixed="left"/>
            <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
            <el-table-column prop="tableName" label="业务表名称" sortable="custom" show-overflow-tooltip min-width="150"/>
            <el-table-column prop="tableComment" label="表描述" sortable="custom" show-overflow-tooltip align="center" min-width="150" />
            <el-table-column label="创建时间" sortable="custom" show-overflow-tooltip min-width="160">
              <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
            </el-table-column>
            <el-table-column label="更新时间" sortable="custom" show-overflow-tooltip min-width="160">
              <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
            </el-table-column>
          </template>
        </ele-data-table>
      </el-card>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="importTable">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "GenTable",
  data() {
    return {
      table: {url: '/gentable/genDbTableList', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      // 遮罩层
      visible: false,
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 显示弹窗
     */
    show() {
      this.visible = true;
    },
    /**
     * 导入业务表
     */
    importTable(){
      if (this.choose.length === 0) return this.$message.error('请至少选择一条数据');
      let tableNames = this.choose.map(d => d.tableName);
      this.$confirm('确定要导入所选中的业务表吗?', '提示', {type: 'warning'}).then(() => {
        const loading = this.$loading({lock: true});
        this.$http.post('/gentable/importTable', tableNames).then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({type: 'success', message: res.data.msg});
            this.visible = false;
            this.$emit("search");
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          loading.close();
          this.$message.error(e.message);
        });
      }).catch(() => 0);
    },
  }
}
</script>

<style scoped>
.ele-block >>> .el-upload, .ele-block >>> .el-upload-dragger {
  width: 100%;
}
</style>