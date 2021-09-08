<template>
  <el-drawer
    class="edit-table"
    title="编辑"
    :visible.sync="visible"
    :direction="direction"
    :size="'calc(100vw - 256px)'"
    :before-close="handleClose"
  >
    <el-card shadow="never" body-style="position:relative;padding:0;" style="margin:5px 20px;">
      <el-tabs v-model="activeName" class="demo-icon-tabs">
        <el-tab-pane label="基本信息" name="basic">
          <basic-info-form ref="basicInfo" :info="info" />
        </el-tab-pane>
        <el-tab-pane label="字段信息" name="cloum" style="margin-top:10px;">
          <el-table size="medium" v-loading="tableLoading" :data="cloumns" :max-height="tableHeight">
            <el-table-column label="编号" type="index" width="60" />
            <el-table-column prop="columnName" label="字段列名" :show-overflow-tooltip="true" min-width="10%"/>
            <el-table-column label="字段描述" min-width="10%">
              <template slot-scope="scope">
                <el-input v-model="scope.row.columnComment"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="columnType" label="数据类型" :show-overflow-tooltip="true" min-width="10%"/>
            <el-table-column label="字段类型" min-width="11%">
              <template slot-scope="scope">
                <el-select v-model="scope.row.javaType">
                  <el-option label="Long" value="Long" />
                  <el-option label="String" value="String" />
                  <el-option label="Integer" value="Integer" />
                  <el-option label="Double" value="Double" />
                  <el-option label="BigDecimal" value="BigDecimal" />
                  <el-option label="Date" value="Date" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="字段属性" min-width="10%">
              <template slot-scope="scope">
                <el-input v-model="scope.row.javaField"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="插入" min-width="5%">
              <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.isInsert"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="编辑" min-width="5%">
              <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.isEdit"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="列表" min-width="5%">
              <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.isList"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="查询" min-width="5%">
              <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.isQuery"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="查询方式" min-width="10%">
              <template slot-scope="scope">
                <el-select v-model="scope.row.queryType">
                  <el-option label="=" value="EQ" />
                  <el-option label="!=" value="NE" />
                  <el-option label=">" value="GT" />
                  <el-option label=">=" value="GTE" />
                  <el-option label="<" value="LT" />
                  <el-option label="<=" value="LTE" />
                  <el-option label="LIKE" value="LIKE" />
                  <el-option label="BETWEEN" value="BETWEEN" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="必填" min-width="5%">
              <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.isRequired"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="显示类型" min-width="12%">
              <template slot-scope="scope">
                <el-select v-model="scope.row.htmlType">
                  <el-option label="文本框" value="input" />
                  <el-option label="文本域" value="textarea" />
                  <el-option label="下拉框" value="select" />
                  <el-option label="单选框" value="radio" />
                  <el-option label="复选框" value="checkbox" />
                  <el-option label="日期控件" value="datetime" />
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="生成信息" name="genInfo">
          <gen-info-form ref="genInfo" :info="info" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
      <el-form label-width="100px">
        <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
          <el-button
                    :loading="submitLoading"
                    @click="submitForm()"
                    type="primary"
                    size="medium"
            >确定提交
            </el-button>
          <el-button @click="$emit('returnBack')" size="medium">返回</el-button>
        </el-form-item>
      </el-form>
  </el-drawer>
</template>

<script>
  import basicInfoForm from "./basicInfoForm";
  import genInfoForm from "./genInfoForm";

  export default {
    name: "GenEdit",
    data() {
      return {
        tableLoading: false,
        submitLoading: false,
        // 选中选项卡的 name
        activeName: "cloum",
        // 表格的高度
        tableHeight: document.documentElement.scrollHeight - 180 + "px",
        // 表列信息
        cloumns: [],
        // 字典信息
        dictOptions: [],
        // 表详细信息
        info: {},
        direction: 'rtl',
      };
    },
    props: {
      visible: {
        type: Boolean,
        default() {
          return false;
        }
      },
      tableId: {
        type: Number,
        default() {
          return 0;
        }
      }
    },
    components: {basicInfoForm,genInfoForm},
    computed: {
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      /**
       * 获取表详情
       */
      getTableInfo() {
        this.tableLoading = true
        this.$http.get('/gentable/getTableInfo/' + this.tableId)
        .then(res => {
          this.cloumns = res.data.data.records;
          this.info = res.data.data.info;
          this.tableLoading = false;
        }).catch(e => {
          this.cloumns = [];
          this.info = {};
          this.tableLoading = false;
          this.$message.error(e.message);
        });
      },

      /**
       * 提交表单
       */
      submitForm() {
        this.submitLoading = true;
        const basicForm = this.$refs.basicInfo.$refs.basicInfoForm;
        const genForm = this.$refs.genInfo.$refs.genInfoForm;
        Promise.all([basicForm, genForm].map(this.getFormPromise)).then(res => {
          const validateResult = res.every(item => !!item);
          if (validateResult) {
            const genTable = Object.assign({}, basicForm.model, genForm.model);
            genTable.columns = this.cloumns;
            genTable.params = {
              treeCode: genTable.treeCode,
              treeName: genTable.treeName,
              treeParentCode: genTable.treeParentCode
            };
            // 更新业务表
            this.$http.put('/gentable/updateGenTable',genTable).then(res => {
              this.$message({
                  message: res.data.msg,
                  type: "success"
              });
              this.submitLoading = false;
              this.$emit("returnBack");
            })
            .catch(e => {
              this.submitLoading = false;
              this.$message.error(e.message);
            })
          } else {
            this.submitLoading = false;
            this.$message.error("业务表更新失败");
          }
        });
      },
      getFormPromise(form) {
        return new Promise(resolve => {
          form.validate(res => {
            resolve(res);
          });
        });
      },
      /**
       * 关闭页面
       */
      handleClose(hide) {
        if (hide) {
          hide();
        }
        this.$emit("returnBack");
      }
    }
  };
</script>

<style scoped>
/* 选项卡 */
.demo-icon-tabs >>> .el-tabs__nav-scroll {
  padding: 0 20px;
}

.demo-icon-tabs >>> .el-tabs__item {
  height: 45px;
  line-height: 45px;
}
</style>
