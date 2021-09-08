<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="90px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="广告标题:">
              <el-input v-model="table.where.title" placeholder="请输入广告标题" clearable/>
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
        <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small" v-if="permission.includes('sys:ad:add')">添加
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" v-if="permission.includes('sys:ad:dall')">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)"  highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="title" label="广告标题" sortable="custom" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="adSortName" label="所属广告位" sortable="custom" show-overflow-tooltip min-width="200"/>
          <el-table-column label="广告封面" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-avatar shape="square" :size="25" :src="row.cover"/>
            </template>
          </el-table-column>
          <el-table-column label="广告类型" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['','primary','success','warning'][row.type-1]" size="mini">{{ ['图片', '文字', '视频', '推荐'][row.type-1] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="广告描述" show-overflow-tooltip min-width="200" align="center"/>
          <el-table-column prop="url" label="广告地址" show-overflow-tooltip min-width="200" align="center"/>
          <el-table-column label="广告尺寸" show-overflow-tooltip min-width="100">
            <template slot-scope="{row}">{{ row.width }} x {{ row.height }}</template>
          </el-table-column>
          <el-table-column prop="startTime" label="广告开始时间" show-overflow-tooltip min-width="160" align="center"/>
          <el-table-column prop="endTime" label="广告结束时间" show-overflow-tooltip min-width="160" align="center"/>
          <el-table-column prop="viewNum" label="点击率" show-overflow-tooltip min-width="100" align="center"/>
          <el-table-column prop="status" label="状态" sortable min-width="100">
            <template slot-scope="{row}">
              <ele-dot :type="['danger', 'success'][row.status]" :ripple="row.status===0"
                        :text="['禁用','正常'][row.status]"/>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" sortable="custom" show-overflow-tooltip/>
          <el-table-column label="创建时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:ad:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此广告吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:ad:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改广告':'修改广告'" :visible.sync="showEdit" width="700px"
               @closed="editForm={}" :destroy-on-close="true" custom-class="ele-dialog-form" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="100px">
        <el-form-item label="广告图片:">
          <uploadImage :limit="1" :updDir="updDir" v-model="editForm.cover"></uploadImage>
        </el-form-item>
        <el-row :gutter="15">
          <el-col :sm="12">
            <el-form-item label="广告标题:" prop="title">
              <el-input v-model="editForm.title" placeholder="请输入广告标题" clearable/>
            </el-form-item>
            <el-form-item label="广告类型:" prop="type">
              <el-select v-model="editForm.type" placeholder="请选择广告类型" class="ele-block" clearable>
                <el-option label="图片" :value="1"/>
                <el-option label="文字" :value="2"/>
                <el-option label="视频" :value="3"/>
                <el-option label="其他" :value="4"/>
              </el-select>
            </el-form-item>
            <el-form-item label="广告URL:" prop="url">
              <el-input v-model="editForm.url" placeholder="请输入广告URL" clearable/>
            </el-form-item>
            <el-form-item label="广告宽度:" prop="width">
              <el-input v-model="editForm.width" placeholder="请输入广告宽度" clearable/>
            </el-form-item>
            <el-form-item label="开始时间:" prop="startTime">
              <el-date-picker
                v-model="editForm.startTime"
                type="datetime"
                placeholder="选择开始时间"
                size="small">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="排序号:" prop="sort">
              <el-input-number v-model="editForm.sort" controls-position="right" :min="0"
                                placeholder="请输入排序号" class="ele-fluid ele-text-left"/>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="广告位" prop="adSortId" :rules="{
                    required: true, message: '所属广告位不能为空', trigger: 'change'
                  }">
              <el-select filterable clearable v-model="editForm.adSortId" size="small" placeholder="-请选择广告位-" class="ele-block">
                <el-option v-for="item in adSortList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="广告描述:" prop="description">
              <el-input v-model="editForm.description" placeholder="请输入广告描述" clearable/>
            </el-form-item>
            <el-form-item label="广告状态:">
              <el-radio-group v-model="editForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="广告高度:" prop="height">
              <el-input v-model="editForm.height" placeholder="请输入广告高度" clearable/>
            </el-form-item>
            <el-form-item label="结束时间:" prop="endTime">
              <el-date-picker
                v-model="editForm.endTime"
                type="datetime"
                placeholder="选择结束时间"
                size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadImage from '@/components/uploadImage'
import { mapGetters } from "vuex";
export default {
  name: "SysAd",
  components: {uploadImage},
  data() {
    return {
      table: {url: '/ad/index', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {status:1},  // 表单数据
      editRules: {  // 表单验证规则
        title: [
          {required: true, message: '请输入广告标题', trigger: 'blur'}
        ],
        adSortId: [
          {required: true, message: '请选择所属广告位', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择广告类型', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入广告描述', trigger: 'blur'}
        ],
        width: [
          {required: true, message: '请输入广告宽度', trigger: 'blur'}
        ],
        height: [
          {required: true, message: '请输入广告高速', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'}
        ],
      },
      updDir: 'ad',
      // 广告位列表
      adSortList:[],
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  mounted() {
    this.getAdSortList(); // 查询广告位列表
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
          this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/ad/edit' : '/ad/add', this.editForm).then(res => {
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
        this.$confirm('确定要删除选中的广告吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/ad/delete/' + ids).then(res => {
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
        this.$http.delete('/ad/delete/' + [row.id]).then(res => {
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
     * 获取广告位列表
     */
    getAdSortList() {
      this.$http.get('/adsort/getAdSortList').then(res => {
        if (res.data.code === 0) {
          this.adSortList = res.data.data;
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