<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="用户账号:">
              <el-input v-model="table.where.username" placeholder="请输入用户账号" clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" @click="$refs.table.reload()" icon="el-icon-search" class="ele-btn-icon">查询
              </el-button>
              <el-button @click="exportData" icon="el-icon-download" type="success" class="ele-btn-icon" v-if="permission.includes('sys:loginlog:export')">导出日志</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" height="calc(100vh - 260px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="title" label="日志标题" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="username" label="登录账号" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="loginIp" label="登录IP" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="os" label="操作系统" align="center" min-width="110" show-overflow-tooltip/>
          <el-table-column prop="browser" label="浏览器" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="type" label="操作类型" align="center" min-width="110" show-overflow-tooltip>
            <template slot-scope="{row}">
              <ele-dot :type="['', 'success', 'warning'][row.type-1]" :ripple="row.type===0"
                        :text="['登录系统','注销系统','刷新TOKEN'][row.type-1]"/>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="{row}">
              <ele-dot :type="['success', 'danger'][row.status]" :ripple="row.status===0"
                        :text="['成功','失败'][row.status]"/>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="createTime" label="登录时间" align="center" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-popconfirm title="确定要删除此登录日志吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:loginlog:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapGetters } from "vuex";
export default {
  name: "SysLoginRecord",
  data() {
    return {
      table: {url: '/loginlog/index', where: {}},  // 表格配置
      daterange: '',  // 筛选日期范围
      pickerOptions: {  // 日期时间选择器快捷项
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    /* 日期选择改变回调 */
    onDateRangeChoose() {
      if (this.daterange) {
        this.table.where.createTimeStart = this.daterange[0];
        this.table.where.createTimeEnd = this.daterange[1];
      } else {
        this.table.where.createTimeStart = null;
        this.table.where.createTimeEnd = null;
      }
    },
    /* 导出数据 */
    exportData() {
      let array = [['登录账号', '用户姓名', 'IP地址', '设备型号', '操作系统', '浏览器', '操作类型', '备注', '登录时间']];
      // 请求查询全部(不分页)的接口
      const loading = this.$loading({lock: true});
      this.$http.get('/loginlog/index?page=1&limit=2000').then(res => {
        loading.close();
        if (res.data.code === 0) {
          res.data.data.records.forEach(d => {
            array.push([
              d.username, d.realname, d.loginIp,
              d.device, d.os, d.browser,
              ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][d.type],
              d.note, this.$util.toDateString(d.createTime)
            ]);
          });
          let sheet = XLSX.utils.aoa_to_sheet(array);
          this.$util.exportSheet(XLSX, sheet, '登录日志');
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    },
    /* 删除 */
    remove(row) {
      if (!row) {  // 批量删除
        if (this.choose.length === 0) return this.$message.error('请至少选择一条数据');
        let ids = this.choose.map(d => d.id);
        this.$confirm('确定要删除选中的登录日志吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.delete('/loginlog/delete/' + ids).then(res => {
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
        this.$http.delete('/loginlog/delete/' + [row.id]).then(res => {
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
  }
}
</script>

<style scoped>

</style>