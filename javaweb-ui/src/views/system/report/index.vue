<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
    
          <el-col :md="4" :sm="12">
            <el-form-item label="标题:">
              <el-input v-model="table.where.title" placeholder="请输入标题" clearable/>
            </el-form-item>
          </el-col>
          <!-- 媒体类型下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="媒体类型:">
              <el-select v-model="table.where.medtype" placeholder="请选择媒体类型" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="网站" :value="1"/>
                <el-option label="论坛" :value="2"/>
                <el-option label="博客" :value="3"/>
                <el-option label="微博" :value="4"/>
                <el-option label="纸媒" :value="5"/>
                <el-option label="微信" :value="6"/>
                <el-option label="App" :value="7"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 信息类型下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="信息类型:">
              <el-select v-model="table.where.infotype" placeholder="请选择信息类型" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="原文" :value="1"/>
                <el-option label="动态" :value="2"/>
                <el-option label="卖报" :value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 等级舆情下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="等级舆情:">
              <el-select v-model="table.where.grade" placeholder="请选择等级舆情" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="Ⅰ级信息" :value="1"/>
                <el-option label="Ⅱ级信息" :value="2"/>
                <el-option label="Ⅲ级信息" :value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 领域类型下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="领域类型:">
              <el-select v-model="table.where.domaintype" placeholder="请选择领域类型" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="时政" :value="1"/>
                <el-option label="经济" :value="2"/>
                <el-option label="文化理论" :value="3"/>
                <el-option label="其他" :value="4"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 发送对象下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="发送对象:">
              <el-select v-model="table.where.sendtoa" placeholder="请选择发送对象" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="区政府" :value="1"/>
                <el-option label="区宣传部" :value="2"/>
                <el-option label="区网信办" :value="3"/>
                <el-option label="中宣部" :value="4"/>
                <el-option label="中央网信办" :value="5"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 所属地域下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="所属地域:">
              <el-select v-model="table.where.city" placeholder="请选择所属地域" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="贺州" :value="11"/>
                <el-option label="河池" :value="12"/>
                <el-option label="崇左" :value="13"/>
                <el-option label="南宁" :value="1"/>
                <el-option label="柳州" :value="2"/>
                <el-option label="桂林" :value="3"/>
                <el-option label="梧州" :value="4"/>
                <el-option label="北海" :value="5"/>
                <el-option label="防城港" :value="6"/>
                <el-option label="钦州" :value="7"/>
                <el-option label="贵港" :value="8"/>
                <el-option label="玉林" :value="9"/>
                <el-option label="百色" :value="10"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 是否启用下拉单选 -->
          <el-col :md="4" :sm="12">
            <el-form-item label="是否启用:">
              <el-select v-model="table.where.status" placeholder="请选择是否启用" clearable class="ele-fluid">
                <el-option label="全部" :value="''"/>
                <el-option label="启用" :value="1"/>
                <el-option label="停用" :value="2"/>
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
        <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small" v-if="permission.includes('sys:report:add')">添加
        </el-button>
        <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small" v-if="permission.includes('sys:report:dall')">批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 315px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="sourceurl" label="原文链接" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="source" label="来源" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="keyword" label="关键词" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="author" label="作者" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="username" label="用户名" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="medtype" label="媒体类型" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.medtype-1]" :ripple="row.medtype===0"
                         :text="['网站','论坛','博客','微博','纸媒','微信','App'][row.medtype-1]"/>
              </template>
            </el-table-column>
          <el-table-column prop="yuqingtype" label="舆情类型" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="infotype" label="信息类型" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.infotype-1]" :ripple="row.infotype===0"
                         :text="['原文','动态','卖报'][row.infotype-1]"/>
              </template>
            </el-table-column>
            <el-table-column prop="grade" label="等级舆情" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.grade-1]" :ripple="row.grade===0"
                         :text="['Ⅰ级信息','Ⅱ级信息','Ⅲ级信息'][row.grade-1]"/>
              </template>
            </el-table-column>
          <el-table-column label="报送时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.sendtime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="刊发时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.filetime | toDateString }}</template>
          </el-table-column>
          <el-table-column prop="workunit" label="报送单位" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="uid" label="报送人" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="specialId" label="专题选择" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="domaintype" label="领域类型" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.domaintype-1]" :ripple="row.domaintype===0"
                         :text="['时政','经济','文化理论','其他'][row.domaintype-1]"/>
              </template>
            </el-table-column>
          <el-table-column prop="content" label="正文" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="attachment" label="附件" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="sendtoa" label="发送对象" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.sendtoa-1]" :ripple="row.sendtoa===0"
                         :text="['区政府','区宣传部','区网信办','中宣部','中央网信办'][row.sendtoa-1]"/>
              </template>
            </el-table-column>
          <el-table-column prop="views" label="浏览数" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="replies" label="回复数" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="caiyong" label="采用类型" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="jiafen" label="加分" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="city" label="所属地域" align="center" min-width="100">
              <template slot-scope="{row}">
                <ele-dot :type="['success', 'danger', 'primary', 'warning', 'info'][row.city-1]" :ripple="row.city===0"
                         :text="['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','崇左'][row.city-1]"/>
              </template>
            </el-table-column>
          <el-table-column prop="emailsend" label="用邮件接收得来" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="group" label="组别" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="isoldsys" label="是旧系统" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="fhzz" label="回复作者" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="fhly" label="回复来源" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="fhbt" label="回复标题" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="fbnr" label="回复内容" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="fhfj" label="回复附件" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="czuid" label="czuid" align="center" show-overflow-tooltip min-width="200"/>
          <el-table-column prop="isDeleted" label="是否已删除" align="center" show-overflow-tooltip min-width="200"/>
            <el-table-column prop="status" label="是否启用" align="center" :resizable="false" min-width="120">
              <template slot-scope="{row}">
                <el-switch v-model="row.status" @change="setStatus(row)" :active-value="1" :inactive-value="2"/>
              </template>
            </el-table-column>
          <el-table-column label="添加时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.createTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" show-overflow-tooltip min-width="160">
            <template slot-scope="{row}">{{ row.updateTime | toDateString }}</template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:report:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此信息浏览吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:report:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改信息浏览':'修改信息浏览'" :visible.sync="showEdit" width="400px"
               @closed="editForm={}" :destroy-on-close="true" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="82px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="editForm.title" placeholder="请输入标题" clearable/>
        </el-form-item>
        <el-form-item label="原文链接:" prop="sourceurl">
          <el-input v-model="editForm.sourceurl" placeholder="请输入原文链接" clearable/>
        </el-form-item>
        <el-form-item label="来源:" prop="source">
          <el-input v-model="editForm.source" placeholder="请输入来源" clearable/>
        </el-form-item>
        <el-form-item label="关键词:" prop="keyword">
          <el-input v-model="editForm.keyword" placeholder="请输入关键词" clearable/>
        </el-form-item>
        <el-form-item label="作者:" prop="author">
          <el-input v-model="editForm.author" placeholder="请输入作者" clearable/>
        </el-form-item>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="editForm.username" placeholder="请输入用户名" clearable/>
        </el-form-item>
        <el-form-item label="媒体类型:" prop="medtype">
          <el-select v-model="editForm.medtype" placeholder="请选择媒体类型" class="ele-block" clearable>
              <el-option label="网站" :value="1"/>
              <el-option label="论坛" :value="2"/>
              <el-option label="博客" :value="3"/>
              <el-option label="微博" :value="4"/>
              <el-option label="纸媒" :value="5"/>
              <el-option label="微信" :value="6"/>
              <el-option label="App" :value="7"/>
          </el-select>
        </el-form-item>
        <el-form-item label="舆情类型:" prop="yuqingtype">
          <el-input-number v-model="editForm.yuqingtype" controls-position="right" :min="0"
                           placeholder="请输入舆情类型" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="信息类型:" prop="infotype">
          <el-select v-model="editForm.infotype" placeholder="请选择信息类型" class="ele-block" clearable>
              <el-option label="原文" :value="1"/>
              <el-option label="动态" :value="2"/>
              <el-option label="卖报" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="等级舆情:" prop="grade">
          <el-select v-model="editForm.grade" placeholder="请选择等级舆情" class="ele-block" clearable>
              <el-option label="Ⅰ级信息" :value="1"/>
              <el-option label="Ⅱ级信息" :value="2"/>
              <el-option label="Ⅲ级信息" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="报送时间:" prop="sendtime">
          <el-date-picker
                  v-model="editForm.sendtime"
                  type="datetime"
                  placeholder="选择报送时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="刊发时间:" prop="filetime">
          <el-date-picker
                  v-model="editForm.filetime"
                  type="datetime"
                  placeholder="选择刊发时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报送单位:" prop="workunit">
          <el-input v-model="editForm.workunit" placeholder="请输入报送单位" clearable/>
        </el-form-item>
        <el-form-item label="报送人:" prop="uid">
          <el-input-number v-model="editForm.uid" controls-position="right" :min="0"
                           placeholder="请输入报送人" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="专题选择:" prop="special_id">
          <el-input-number v-model="editForm.special_id" controls-position="right" :min="0"
                           placeholder="请输入专题选择" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="领域类型:" prop="domaintype">
          <el-select v-model="editForm.domaintype" placeholder="请选择领域类型" class="ele-block" clearable>
              <el-option label="时政" :value="1"/>
              <el-option label="经济" :value="2"/>
              <el-option label="文化理论" :value="3"/>
              <el-option label="其他" :value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item label="正文:">
          <el-input v-model="editForm.content" placeholder="请输入正文" :rows="3" type="textarea"/>
        </el-form-item>
        <el-form-item label="附件:" prop="attachment">
          <el-input v-model="editForm.attachment" placeholder="请输入附件" clearable/>
        </el-form-item>
        <el-form-item label="发送对象:" prop="sendtoa">
          <el-select v-model="editForm.sendtoa" placeholder="请选择发送对象" class="ele-block" clearable>
              <el-option label="区政府" :value="1"/>
              <el-option label="区宣传部" :value="2"/>
              <el-option label="区网信办" :value="3"/>
              <el-option label="中宣部" :value="4"/>
              <el-option label="中央网信办" :value="5"/>
          </el-select>
        </el-form-item>
        <el-form-item label="浏览数:" prop="views">
          <el-input-number v-model="editForm.views" controls-position="right" :min="0"
                           placeholder="请输入浏览数" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="回复数:" prop="replies">
          <el-input-number v-model="editForm.replies" controls-position="right" :min="0"
                           placeholder="请输入回复数" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="采用类型:" prop="caiyong">
          <el-input v-model="editForm.caiyong" placeholder="请输入采用类型" clearable/>
        </el-form-item>
        <el-form-item label="加分:" prop="jiafen">
          <el-input-number v-model="editForm.jiafen" controls-position="right" :min="0"
                           placeholder="请输入加分" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="所属地域:" prop="city">
          <el-select v-model="editForm.city" placeholder="请选择所属地域" class="ele-block" clearable>
              <el-option label="贺州" :value="11"/>
              <el-option label="河池" :value="12"/>
              <el-option label="崇左" :value="13"/>
              <el-option label="南宁" :value="1"/>
              <el-option label="柳州" :value="2"/>
              <el-option label="桂林" :value="3"/>
              <el-option label="梧州" :value="4"/>
              <el-option label="北海" :value="5"/>
              <el-option label="防城港" :value="6"/>
              <el-option label="钦州" :value="7"/>
              <el-option label="贵港" :value="8"/>
              <el-option label="玉林" :value="9"/>
              <el-option label="百色" :value="10"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用邮件接收得来:" prop="emailsend">
          <el-input-number v-model="editForm.emailsend" controls-position="right" :min="0"
                           placeholder="请输入用邮件接收得来" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="组别:" prop="group">
          <el-input-number v-model="editForm.group" controls-position="right" :min="0"
                           placeholder="请输入组别" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="是旧系统:" prop="isoldsys">
          <el-input-number v-model="editForm.isoldsys" controls-position="right" :min="0"
                           placeholder="请输入是旧系统" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="回复作者:" prop="fhzz">
          <el-input v-model="editForm.fhzz" placeholder="请输入回复作者" clearable/>
        </el-form-item>
        <el-form-item label="回复来源:" prop="fhly">
          <el-input v-model="editForm.fhly" placeholder="请输入回复来源" clearable/>
        </el-form-item>
        <el-form-item label="回复标题:" prop="fhbt">
          <el-input v-model="editForm.fhbt" placeholder="请输入回复标题" clearable/>
        </el-form-item>
        <el-form-item label="回复内容:" prop="fbnr">
          <el-input v-model="editForm.fbnr" placeholder="请输入回复内容" clearable/>
        </el-form-item>
        <el-form-item label="回复附件:" prop="fhfj">
          <el-input-number v-model="editForm.fhfj" controls-position="right" :min="0"
                           placeholder="请输入回复附件" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="czuid:" prop="czuid">
          <el-input-number v-model="editForm.czuid" controls-position="right" :min="0"
                           placeholder="请输入czuid" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="是否已删除:" prop="is_deleted">
          <el-input-number v-model="editForm.is_deleted" controls-position="right" :min="0"
                           placeholder="请输入是否已删除" class="ele-fluid ele-text-left"/>
        </el-form-item>
        <el-form-item label="是否启用:" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择是否启用" class="ele-block" clearable>
              <el-option label="启用" :value="1"/>
              <el-option label="停用" :value="2"/>
          </el-select>
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
    name: "SysReport",
    data() {
      return {
        table: {url: '/report/index', where: {}},  // 表格配置
        choose: [],  // 表格选中数据
        showEdit: false,  // 是否显示表单弹窗
        editForm: {},  // 表单数据
        editRules: {  // 表单验证规则

        },
      }
    },
    computed: {
      ...mapGetters(["permission"]),
    },
    mounted() {
    },
    methods: {
      /* 显示编辑 */
      edit(row) {
        this.$http.get('/report/info/' + row.id).then(res => {
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
            this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/report/edit' : '/report/add', this.editForm).then(res => {
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
          this.$confirm('确定要删除选中的信息浏览吗?', '提示', {type: 'warning'}).then(() => {
            const loading = this.$loading({lock: true});
            this.$http.delete('/report/delete/' + ids).then(res => {
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
          this.$http.delete('/report/delete/' + [row.id]).then(res => {
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
        this.$http.put('/report/setStatus', params).then(res => {
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