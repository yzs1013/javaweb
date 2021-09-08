<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="会员手机:">
              <el-input v-model="table.where.mobile" placeholder="请输入会员手机" clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="9" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" @click="$refs.table.reload()" icon="el-icon-search" class="ele-btn-icon">查询
              </el-button>
              <el-button @click="(table.where={})&&$refs.table.reload()">重置</el-button>
              <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" v-if="permission.includes('sys:member:add')">添加</el-button>
              <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" v-if="permission.includes('sys:member:dall')">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 265px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="mobile" label="会员手机" sortable="custom" show-overflow-tooltip min-width="130"/>
          <el-table-column prop="nickname" label="会员昵称" sortable="custom" show-overflow-tooltip min-width="120"/>
          <el-table-column label="性别" min-width="60" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success','warning'][row.gender-1]" size="mini">{{ ['男', '女', '保密'][row.gender-1] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="头像" min-width="60" align="center">
            <template slot-scope="{row}">
              <el-avatar shape="square" :size="35" :src="row.avatar"/>
            </template>
          </el-table-column>
          <el-table-column label="设备来源" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success','warning', 'danger', 'info'][row.device-1]" size="mini">{{ ['苹果', '安卓', 'WAP站', 'PC站', '后台'][row.device-1] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="会员来源" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success'][row.source-1]" size="mini">{{ ['APP客户端', '后台添加'][row.source-1] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="会员状态" sortable="custom" :resizable="false" min-width="120">
            <template slot-scope="{row}">
              <el-switch v-model="row.status" @change="editStatus(row)" :active-value="1" :inactive-value="2"/>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="最近登录时间" sortable="custom" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.loginTime | toDateString }}</template>
          </el-table-column>
          <el-table-column prop="loginCount" label="登录次数" sortable="custom" show-overflow-tooltip min-width="120"/>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:member:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此会员吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:member:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改会员':'添加会员'" :visible.sync="showEdit" width="800px"
               @closed="editForm={}" :destroy-on-close="true" custom-class="ele-dialog-form" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="100px">
        <el-form-item label="会员头像:">
          <uploadImage :limit="1" :updDir="updDir" v-model="editForm.avatar"></uploadImage>
        </el-form-item>
        <el-row :gutter="15">
          <el-col :sm="12">
            <el-form-item label="会员姓名:" prop="realname">
              <el-input v-model="editForm.realname" placeholder="请输入会员姓名" clearable/>
            </el-form-item>
            <el-form-item label="手机号码:" prop="mobile">
              <el-input v-model="editForm.mobile" placeholder="请输入手机号码" clearable/>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="editForm.gender" placeholder="请选择性别" class="ele-block" clearable>
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型:" prop="device">
              <el-select v-model="editForm.device" placeholder="请选择设备类型" class="ele-block" clearable>
                <el-option label="苹果" :value="1"/>
                <el-option label="安卓" :value="2"/>
                <el-option label="WAP站" :value="3"/>
                <el-option label="PC站" :value="4"/>
                <el-option label="后台" :value="5"/>
              </el-select>
            </el-form-item>
            <el-form-item label="所在城市:" prop="city">
              <el-cascader v-model="city" :options="cityData.cityData" clearable popper-class="ele-pop-wrap-higher" class="ele-block"/>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="editForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="会员昵称:" prop="nickname">
              <el-input v-model="editForm.nickname" placeholder="请输入会员昵称" clearable/>
            </el-form-item>
            <el-form-item label="会员等级" prop="memberLevel" :rules="{
                    required: true, message: '所属会员等级不能为空', trigger: 'change'
                  }">
              <el-select filterable clearable v-model="editForm.memberLevel" size="small" placeholder="-请选择会员等级-" class="ele-block">
                <el-option v-for="item in memberLevelList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期:" prop="birthday">
              <el-date-picker
                v-model="editForm.birthday"
                type="date"
                placeholder="选择出生日期"
                size="small"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="会员来源:" prop="source">
              <el-select v-model="editForm.source" placeholder="请选择会员来源" class="ele-block" clearable>
                <el-option label="APP客户端" :value="1"/>
                <el-option label="后台添加" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址:" prop="address">
              <el-input v-model="editForm.address" placeholder="请输入详细地址" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="个人简介:">
          <el-input v-model="editForm.intro" placeholder="请输入个人简介" :rows="2" type="textarea"/>
        </el-form-item>
        <el-form-item label="个人签名:">
          <el-input v-model="editForm.signature" placeholder="请输入个人签名" :rows="2" type="textarea"/>
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
import cityData from '@/utils/cityData'
import uploadImage from '@/components/uploadImage'
import { mapGetters } from "vuex";
export default {
  name: "SysMember",
  data() {
    return {
      /* citySelect */
      cityData: cityData,  // 省市区数据
      city: [],  // 选中的省市区
      provinceCity: [],  // 选中的省市
      province: [],  // 选中的省

      table: {url: '/member/index', where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      editRules: {  // 表单验证规则
        name: [
          {required: true, message: '请输入会员名称', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'}
        ],
      },
      updDir: 'member',
      memberLevelList: [],  // 会员等级
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  components: {uploadImage},
  mounted() {
    this.getMemberLevelList(); // 查询职级列表
  },
  methods: {
    /* 显示编辑 */
    edit(row) {
      this.editForm = Object.assign({}, row);
      this.showEdit = true;
       // 取值赋予城市组件
      this.city = row.city;
    },
    /* 保存编辑 */
    save() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({lock: true});
          this.editForm = Object.assign({}, this.editForm, {
            city: this.city
          });
          this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/member/edit' : '/member/add', this.editForm).then(res => {
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
        this.$confirm('确定要删除选中的会员吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/member/delete/' + ids).then(res => {
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
        this.$http.delete('/member/delete/' + [row.id]).then(res => {
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
      this.$http.put('/member/status', params).then(res => {
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
    /**
     * 获取职级列表
     */
    getMemberLevelList() {
      this.$http.get('/memberlevel/getMemberLevelList').then(res => {
        if (res.data.code === 0) {
          this.memberLevelList = res.data.data;
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