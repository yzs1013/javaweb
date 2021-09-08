<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="用户账号:">
              <el-input v-model="table.where.operName" placeholder="请输入用户账号" clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="模块名称:">
              <el-input v-model="table.where.title" placeholder="请输入模块名称" clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" @click="$refs.table.reload()" icon="el-icon-search" class="ele-btn-icon">查询
              </el-button>
              <el-button @click="reload">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" height="calc(100vh - 260px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="title" label="操作模块" min-width="110" show-overflow-tooltip align="center"/>
          <el-table-column prop="logType" label="操作类型" min-width="110" show-overflow-tooltip align="center">
            <template slot-scope="{row}">
              <el-tag v-if="row.logType === 0" type="" size="small">其他</el-tag>
              <el-tag v-if="row.logType === 1" type="" size="small">新增</el-tag>
              <el-tag v-if="row.logType === 2" type="success" size="small">修改</el-tag>
              <el-tag v-if="row.logType === 3" type="warning" size="small">删除</el-tag>
              <el-tag v-if="row.logType === 5" type="danger" size="small">导出数据</el-tag>
              <el-tag v-if="row.logType === 6" type="info" size="small">导入模板</el-tag>
              <el-tag v-if="row.logType === 7" type="success" size="small">强退</el-tag>
              <el-tag v-if="row.logType === 8" type="warning" size="small">生成代码</el-tag>
              <el-tag v-if="row.logType === 9" type="danger" size="small">清空数据</el-tag>
              <el-tag v-if="row.logType === 10" type="info" size="small">设置状态</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operName" label="操作人" align="center" show-overflow-tooltip min-width="110"/>
          <el-table-column prop="operUrl" label="请求URL" align="center" min-width="200" show-overflow-tooltip/>
          <el-table-column prop="operIp" label="请求IP" align="center" min-width="110" show-overflow-tooltip/>
          <el-table-column prop="operLocation" label="请求地址" align="center" min-width="110" show-overflow-tooltip/>
          <el-table-column prop="requestMethod" label="请求方式" align="center" min-width="110" show-overflow-tooltip/>
          <el-table-column prop="note" label="备注" align="center" min-width="200" show-overflow-tooltip/>
          <el-table-column prop="status" label="状态" sortable align="center" min-width="100">
            <template slot-scope="{row}">
              <ele-dot :type="['success', 'danger'][row.status]" :ripple="row.status===0"
                        :text="['正常', '禁用'][row.status]"/>
            </template>
          </el-table-column>
          <el-table-column prop="spendTime" label="耗时" sortable="custom" min-width="100" show-overflow-tooltip>
            <template slot-scope="{row}">{{ row.spendTime / 1000 }}s</template>
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间" sortable="custom" min-width="160" show-overflow-tooltip>
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="90px" align="center" :resizable="false" fixed="right">
            <template slot-scope="{row}">
              <el-link @click="view(row)" icon="el-icon-view" type="primary" :underline="false">详情</el-link>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="showView" width="600px" :destroy-on-close="true" :lock-scroll="false">
      <el-form label-width="82px" size="mini" class="ele-form-detail">
        <el-row :gutter="15">
          <el-col :sm="12">
            <el-form-item label="操作人:" prop="operName">
              <div class="ele-text-secondary">{{ viewForm.operName }}({{ viewForm.username }})</div>
            </el-form-item>
            <el-form-item label="操作模块:" prop="operModel">
              <div class="ele-text-secondary">{{ viewForm.operModel }}</div>
            </el-form-item>
            <el-form-item label="操作时间:" prop="createTime">
              <div class="ele-text-secondary">{{ viewForm.createTime | toDateString }}</div>
            </el-form-item>
            <el-form-item label="请求方式:" prop="requestMethod">
              <div class="ele-text-secondary">{{ viewForm.requestMethod }}</div>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="IP地址:" prop="ip">
              <div class="ele-text-secondary">{{ viewForm.operIp }}</div>
            </el-form-item>
            <el-form-item label="操作功能:" prop="operType">
              <div class="ele-text-secondary">{{ viewForm.operType }}</div>
            </el-form-item>
            <el-form-item label="请求耗时:" prop="spendTime">
              <div class="ele-text-secondary">{{ viewForm.spendTime / 1000 }}s</div>
            </el-form-item>
            <el-form-item label="请求状态:" prop="status">
              <el-tag :type="['success','danger'][viewForm.status]" size="mini">
                {{ ['正常', '异常'][viewForm.status] }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin: 12px 0;">
          <el-divider/>
        </div>
        <el-form-item label="请求地址:" prop="url">
          <div class="ele-text-secondary">{{ viewForm.url }}</div>
        </el-form-item>
        <el-form-item label="调用方法:" prop="operMethod">
          <div class="ele-text-secondary">{{ viewForm.operMethod }}</div>
        </el-form-item>
        <el-form-item label="请求参数:" prop="operParam">
          <div class="ele-text-secondary">{{ viewForm.operParam }}</div>
        </el-form-item>
        <el-form-item label="返回结果:" prop="jsonResult">
          <div class="ele-text-secondary">{{ viewForm.jsonResult }}</div>
        </el-form-item>
        <el-form-item label="备注:" prop="note">
          <div class="ele-text-secondary">{{ viewForm.note }}</div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showView=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SysOperRecord",
  data() {
    return {
      table: {url: '/operlog/index', where: {}},  // 表格配置
      showView: false,  // 是否显示查看弹窗
      viewForm: {},  // 表单数据
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
    /* 详情 */
    view(row) {
      this.viewForm = Object.assign({}, row);
      this.showView = true;
    },
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
    /* 刷新 */
    reload() {
      this.daterange = null;
      this.table.where = {};
      this.$refs.table.reload();
    }
  }
}
</script>

<style scoped>

</style>