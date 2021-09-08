<template>
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
      <!-- 操作按钮 -->
      <div class="ele-table-tool ele-table-tool-default">
        <el-button @click="importTable" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small">导入业务表
        </el-button>
        <el-button @click="edit()" type="success" icon="el-icon-edit" class="ele-btn-icon" size="small" :disabled="choose.length!==1">修改业务表
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" :disabled="choose.length===0">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="tableName" label="业务表名称" sortable="custom" show-overflow-tooltip min-width="150"/>
          <el-table-column prop="tableComment" label="表描述" sortable="custom" show-overflow-tooltip align="center" min-width="150" />
          <el-table-column prop="className" label="实体类名称" sortable="custom" show-overflow-tooltip align="center" min-width="120"  />
          <el-table-column prop="tplCategory" label="使用模板" sortable="custom" show-overflow-tooltip align="center" min-width="120"  />
          <el-table-column prop="packageName" label="包路径" sortable="custom" show-overflow-tooltip align="center" min-width="200"  />
          <el-table-column prop="moduleName" label="所属模块" sortable="custom" show-overflow-tooltip align="center" min-width="120"  />
          <el-table-column prop="businessName" label="业务名称" sortable="custom" show-overflow-tooltip align="center" min-width="120"  />
          <el-table-column prop="functionName" label="业务标题" sortable="custom" show-overflow-tooltip align="center" min-width="120"  />
          <el-table-column label="创建时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="220px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false">修改</el-link>
              <el-popconfirm title="确定要删除此业务表吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false">删除</el-link>
              </el-popconfirm>
              <el-popconfirm title="确定要生成当前模块吗？生成后将覆盖已存在的模块文件!" @confirm="generate(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-copy-document" type="success" :underline="false">一键生成</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>

    <!-- 导入业务表 -->
    <import-table ref="import" @search="$refs.table.reload();" />

    <!-- 编辑数据表 -->
    <editTable
            v-if="showEdit"
            @returnBack="showEdit=false"
            :visible="showEdit"
            :tableId="tableId"
    ></editTable>

  </div>
</template>

<script>
import importTable from "./importTable";
import editTable from './editTable';
import { mapGetters } from "vuex";
export default {
  name: "GenTable",
  data() {
    return {
      table: {url: '/gentable/index', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      tableId:'',
    }
  },
  components: {importTable, editTable},
  mounted() {
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    /* 显示编辑 */
    edit(row) {
      this.tableId = row.id || this.choose[0];
      this.showEdit = true
    },
    /* 保存编辑 */
    save() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({lock: true});
          this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/gentable/edit' : '/gentable/add', this.editForm).then(res => {
            loading.close();
            if (res.data.code === 0) {
              this.showEdit = false;
              this.$message({type: 'success', message: res.data.msg});
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            loading.close();
            this.$message.error(e.message);
          });
        } else {
          return false;
        }
      });
    },
    /* 删除 */
    remove(row) {
      if (!row) {  // 批量删除
        if (this.choose.length === 0) return this.$message.error('请至少选择一条数据');
        let ids = this.choose.map(d => d.id);
        this.$confirm('确定要删除选中的业务表吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/gentable/delete/' + ids).then(res => {
            loading.close();
            if (res.data.code === 0) {
              this.$message({type: 'success', message: res.data.msg});
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            loading.close();
            this.$message.error(e.message);
          });
        }).catch(() => 0);
      } else {  // 单个删除
        const loading = this.$loading({lock: true});
        this.$http.delete('/gentable/delete/' + [row.id]).then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({type: 'success', message: res.data.msg});
            this.$refs.table.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          loading.close();
          this.$message.error(e.message);
        });
      }
    },

    /**
     * 导入表
     */
    importTable(){
      this.$refs.import.show();
    },
  
    /**
     * 一键生成模块
     */
    generate(row) {
      const loading = this.$loading({lock: true});
      const tableNames = row.tableName || this.tableNames.join(',');
      if (tableNames == "") {
        this.msgError("请选择要生成的数据");
        return;
      }
      this.$http.post('/gentable/batchGenCode', {tableNames: tableNames}).then(res => {
        loading.close();
        if (res.data.code === 0) {
          this.$message({type: 'success', message: res.data.msg});
          this.$refs.table.reload();
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
.ele-block >>> .el-upload, .ele-block >>> .el-upload-dragger {
  width: 100%;
}
</style>