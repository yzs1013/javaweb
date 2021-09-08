<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="90px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="布局描述:">
              <el-input v-model="table.where.locDesc" placeholder="请输入布局描述" clearable/>
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
        <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small" v-if="permission.includes('sys:layoutdesc:add')">添加
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" v-if="permission.includes('sys:layoutdesc:dall')">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="locDesc" label="布局描述" sortable="custom" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="locId" label="布局位置" sortable="custom" show-overflow-tooltip min-width="120"/>
          <el-table-column prop="itemName" label="所属站点" sortable="custom" show-overflow-tooltip min-width="120"/>
          <el-table-column prop="sort" label="排序" sortable="custom" show-overflow-tooltip/>
          <el-table-column label="创建时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:layoutdesc:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此布局描述吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:layoutdesc:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改布局描述':'修改布局描述'" :visible.sync="showEdit" width="400px"
               @closed="editForm={}" :destroy-on-close="true" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="120px">
        <el-form-item label="所属站点" prop="itemId" :rules="{
                required: true, message: '所属站点不能为空', trigger: 'change'
              }">
          <el-select filterable clearable v-model="editForm.itemId" size="small" placeholder="-请选择所属站点-" class="ele-block">
            <el-option v-for="item in itemList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="布局描述名称:" prop="locDesc">
          <el-input v-model="editForm.locDesc" placeholder="请输入布局描述名称" clearable/>
        </el-form-item>
        <el-form-item label="布局描述位置:" prop="locId">
          <el-input v-model="editForm.locId" placeholder="请输入布局描述位置" clearable/>
        </el-form-item>
        <el-form-item label="排序号:" prop="sort">
          <el-input-number v-model="editForm.sort" controls-position="right" :min="0"
                            placeholder="请输入排序号" class="ele-fluid ele-text-left"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SysLayoutDesc",
  data() {
    return {
      table: {url: '/layoutdesc/index', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      editRules: {  // 表单验证规则
        locDesc: [
          {required: true, message: '请输入布局描述', trigger: 'blur'}
        ],
        locId: [
          {required: true, message: '请选择所属布局位置', trigger: 'blur'}
        ],
        itemId: [
          {required: true, message: '请选择所属站点', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'}
        ],
      },
      // 站点列表
      itemList:[],
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  mounted() {
    // 查询站点列表
    this.getItemList();
  },
  methods: {
    /* 显示编辑 */
    edit(row) {
      this.editForm = Object.assign({}, row);
      this.showEdit = true;
    },
    /* 保存编辑 */
    save() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({lock: true});
          this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/layoutdesc/edit' : '/layoutdesc/add', this.editForm).then(res => {
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
        this.$confirm('确定要删除选中的布局描述吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/layoutdesc/delete/' + ids).then(res => {
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
        this.$http.delete('/layoutdesc/delete/' + [row.id]).then(res => {
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
     * 获取站点列表
     */
    getItemList() {
      this.$http.get('/item/getItemList').then(res => {
        if (res.data.code === 0) {
          this.itemList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    },
  }
}
</script>

<style scoped>
.ele-block >>> .el-upload, .ele-block >>> .el-upload-dragger {
  width: 100%;
}
</style>