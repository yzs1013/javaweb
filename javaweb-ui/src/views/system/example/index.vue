<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
    
          <el-col :md="6" :sm="12">
            <el-form-item label="案例名称:">
              <el-input v-model="table.where.name" placeholder="请输入案例名称" clearable/>
            </el-form-item>
          </el-col>
          <!-- 状态下拉单选 -->
          <el-col :md="6" :sm="12">
            <el-form-item label="状态:">
              <el-select v-model="table.where.status" placeholder="请选择状态" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="正常" :value="1"/>
                <el-option label="停用" :value="2"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 类型下拉单选 -->
          <el-col :md="6" :sm="12">
            <el-form-item label="类型:">
              <el-select v-model="table.where.type" placeholder="请选择类型" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="京东" :value="1"/>
                <el-option label="淘宝" :value="2"/>
                <el-option label="拼多多" :value="3"/>
                <el-option label="唯品会" :value="4"/>
              </el-select>
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
        <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small" v-if="permission.includes('sys:example:add')">添加
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" v-if="permission.includes('sys:example:dall')">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="name" label="案例名称" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column label="头像" min-width="60" align="center">
            <template slot-scope="{row}">
              <el-avatar shape="square" :size="35" :src="row.avatar"/>
            </template>
          </el-table-column>
            <el-table-column prop="status" label="状态" align="center" :resizable="false" min-width="120">
              <template slot-scope="{row}">
                <el-switch v-model="row.status" @change="setStatus(row)" :active-value="1" :inactive-value="2"/>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.type-1]" :ripple="row.type===0"
                         :text="['京东','淘宝','拼多多','唯品会'][row.type-1]"/>
              </template>
            </el-table-column>
          <el-table-column prop="sort" label="显示顺序" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column label="出生时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.birthday | toDateString }}</template>
          </el-table-column>
          <el-table-column label="添加时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:example:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此演示案例表吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:example:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改演示案例表':'修改演示案例表'" :visible.sync="showEdit" width="400px"
               @closed="editForm={}" :destroy-on-close="true" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="82px">
        <el-form-item label="案例名称:" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入案例名称" clearable/>
        </el-form-item>
        <el-form-item label="头像:">
          <uploadImage :limit="1" :updDir="updDir" v-model="editForm.avatar"></uploadImage>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择类型" class="ele-block" clearable>
              <el-option label="京东" :value="1"/>
              <el-option label="淘宝" :value="2"/>
              <el-option label="拼多多" :value="3"/>
              <el-option label="唯品会" :value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item label="显示顺序:" prop="sort">
          <el-input-number v-model="editForm.sort" controls-position="right" :min="0"
                           placeholder="请输入显示顺序" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="出生时间:" prop="birthday">
          <el-date-picker
                  v-model="editForm.birthday"
                  type="datetime"
                  placeholder="选择出生时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
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
  import uploadImage from '@/components/uploadImage'
  export default {
    name: "SysExample",
    data() {
      return {
        table: {url: '/example/index', where: {}},  // 表格配置
        choose: [],  // 表格选中数据
        showEdit: false,  // 是否显示表单弹窗
        editForm: {},  // 表单数据
        editRules: {  // 表单验证规则

        },
        updDir: 'example',
      }
    },
    computed: {
      ...mapGetters(["permission"]),
    },
    components: {uploadImage},
    mounted() {
    },
    methods: {
      /* 显示编辑 */
      edit(row) {
        this.$http.get('/example/info/' + row.id).then(res => {
          if (res.data.code === 0) {
            this.editForm = res.data.data;
            this.showEdit = true;
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.$message.error(e.message);
        });
      },
      /* 保存编辑 */
      save() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({lock: true});
            this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/example/edit' : '/example/add', this.editForm).then(res => {
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
          this.$confirm('确定要删除选中的演示案例表吗?', '提示', {type: 'warning'}).then(() => {
            const loading = this.$loading({lock: true});
            this.$http.delete('/example/delete/' + ids).then(res => {
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
          this.$http.delete('/example/delete/' + [row.id]).then(res => {
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
      /* 更改状态 */
      setStatus(row) {
        const loading = this.$loading({lock: true});
        //let params = new FormData();
        // params.append('status', row.status);
        let params = {"id":row.id, 'status': row.status};
        this.$http.put('/example/setStatus', params).then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({type: 'success', message: res.data.msg});
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          loading.close();
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