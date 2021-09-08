<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="通知标题:">
              <el-input v-model="table.where.title" placeholder="请输入通知标题" clearable/>
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
        <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small" v-if="permission.includes('sys:notice:add')">添加
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" v-if="permission.includes('sys:notice:dall')">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="title" label="通知标题" sortable="custom" show-overflow-tooltip min-width="250"/>
          <el-table-column label="通知来源" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success'][row.source]" size="mini">{{ ['内部通知', '外部新闻'][row.source] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isTop" label="是否置顶" sortable="custom" :resizable="false" min-width="120">
            <template slot-scope="{row}">
              <el-switch v-model="row.isTop" @change="editIsTop(row)" :active-value="1" :inactive-value="2"/>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="通知状态" sortable="custom" :resizable="false" min-width="120">
            <template slot-scope="{row}">
              <el-switch v-model="row.status" @change="editStatus(row)" :active-value="1" :inactive-value="2"/>
            </template>
          </el-table-column>
          <el-table-column prop="browse" label="浏览量" sortable="custom" show-overflow-tooltip min-width="100"/>
          <el-table-column label="创建时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:notice:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此通知吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:notice:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改通知':'修改通知'" :visible.sync="showEdit" width="600px"
               @closed="editForm={}" :destroy-on-close="true" custom-class="ele-dialog-form" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="82px">
        <el-row :gutter="15">
          <el-col :sm="12">
            <el-form-item label="通知标题:" prop="title">
              <el-input v-model="editForm.title" placeholder="请输入通知标题" clearable/>
            </el-form-item>
            <el-form-item label="通知状态:">
              <el-radio-group v-model="editForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="通知来源:">
              <el-radio-group v-model="editForm.source">
                <el-radio :label="1">内部通知</el-radio>
                <el-radio :label="2">外部新闻</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否置顶:">
              <el-radio-group v-model="editForm.isTop">
                <el-radio :label="1">置顶</el-radio>
                <el-radio :label="2">不置顶</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 富文本编辑器 -->
        <tinymce-editor v-model="editForm.content" :init="editContent"/>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor'
import { mapGetters } from "vuex";
export default {
  name: "SysNotice",
  components: {TinymceEditor},
  data() {
    return {
      table: {url: '/notice/index', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      editRules: {  // 表单验证规则
        title: [
          {required: true, message: '请输入通知标题', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请输入选择通知状态', trigger: 'blur'}
        ],
        source: [
          {required: true, message: '请输入选择通知来源', trigger: 'blur'}
        ],
        isTop: [
          {required: true, message: '请输入选择是否置顶', trigger: 'blur'}
        ],
      },
      // 自定义文件上传(这里使用把选择的文件转成blob演示)
      file_picker_callback: (callback, value, meta) => {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        // 设定文件可选类型
        if (meta.filetype === 'image') {
          input.setAttribute('accept', 'image/*');
        } else if (meta.filetype === 'media') {
          input.setAttribute('accept', 'video/*');
        }
        input.onchange = () => {
          let file = input.files[0];
          let reader = new FileReader();
          reader.onload = (e) => {
            let blob = new Blob([e.target.result], {type: file.type});
            callback(URL.createObjectURL(blob));
          };
          reader.readAsArrayBuffer(file);
        }
        input.click();
      }
    }
  },
  computed: {
    ...mapGetters(["permission"]),

    editContent() {
      return {
        menubar: false,
        file_picker_callback: this.file_picker_callback,
        skin_url: this.$store.state.theme.theme === 'dark' ? '/tinymce/skins/ui/oxide-dark' : '/tinymce/skins/ui/oxide',
        content_css: this.$store.state.theme.theme === 'dark' ? '/tinymce/skins/content/dark/content.css' : '/tinymce/skins/content/default/content.css'
      };
    }
  },
  mounted() {
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
          this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/notice/edit' : '/notice/add', this.editForm).then(res => {
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
        this.$confirm('确定要删除选中的通知吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/notice/delete/' + ids).then(res => {
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
        this.$http.delete('/notice/delete/' + [row.id]).then(res => {
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
    editStatus(row) {
      const loading = this.$loading({lock: true});
      let params = Object.assign({}, row);
      this.$http.put('/notice/status', params).then(res => {
        loading.close();
        if (res.data.code === 0) {
          this.$message({type: 'success', message: res.data.msg});
        } else {
          row.status = !row.status ? 2 : 1;
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    },
    /* 是否置顶 */
    editIsTop(row) {
      const loading = this.$loading({lock: true});
      let params = Object.assign({}, row);
      this.$http.put('/notice/setIsTop', params).then(res => {
        loading.close();
        if (res.data.code === 0) {
          this.$message({type: 'success', message: res.data.msg});
        } else {
          row.isTop = !row.isTop ? 2 : 1;
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