<template>
  <el-drawer
    class="edit-table"
    title="编辑布局"
    :visible.sync="visible"
    :direction="direction"
    :size="'calc(100vw - 256px)'"
    :before-close="handleClose"
  >
    <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="150px" style="margin:10px auto;">
      <el-form-item label="布局图片：">
        <uploadImage :limit="1" :updDir="updDir" v-model="editForm.image"></uploadImage>
      </el-form-item>
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="布局位置描述：" prop="locDesc">
            <el-input v-model="editForm.locDesc" placeholder="请输入布局位置描述" clearable/>
          </el-form-item>
          <el-form-item label="所属站点：" prop="itemId" :rules="{
                  required: true, message: '所属站点不能为空', trigger: 'change'
                }">
            <el-select filterable clearable v-model="editForm.itemId" size="small" placeholder="-请选择所属站点-" class="ele-block">
              <el-option v-for="item in itemList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="布局类型：" prop="type">
            <el-select v-model="editForm.type" placeholder="请选择布局类型：" class="ele-block" clearable>
              <el-option label="CMS文章" :value="1"/>
              <el-option label="通知公告" :value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="布局描述位置：" prop="locId">
            <el-input v-model="editForm.locId" placeholder="请输入布局描述位置" clearable/>
          </el-form-item>
          <el-form-item label="排序号：" prop="sort">
            <el-input-number v-model="editForm.sort" controls-position="right" :min="0"
                              placeholder="请输入排序号" class="ele-fluid ele-text-left"/>
          </el-form-item>
          <el-form-item label="布局内容：" prop="typeId">
            <el-input v-model="editForm.typeId" placeholder="请选择布局内容" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button @click="save" type="primary" size="medium">保存 </el-button>
        <el-button @click="$emit('returnBack')" size="medium">返回</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
  import uploadImage from '@/components/uploadImage'

  export default {
    name: "LayoutEdit",
    components: {uploadImage},
    data() {
      return {
        direction: 'rtl',
        editForm: {},  // 表单数据
        editRules: {  // 表单验证规则
          locDesc: [
            {required: true, message: '请输入布局位置描述', trigger: 'blur'}
          ],
          locId: [
            {required: true, message: '请选择所属布局位置', trigger: 'blur'}
          ],
          itemId: [
            {required: true, message: '请选择所属站点', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择布局类型', trigger: 'blur'}
          ],
          typeId: [
            {required: true, message: '请选择布局内容', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入排序', trigger: 'blur'}
          ],
        },
        updDir: 'layout',
      };
    },
    props: {
      visible: {
        type: Boolean,
        default() {
          return false;
        }
      },
      layoutId: {
        type: Number,
        default() {
          return 0;
        }
      },
      // 接收站点
      itemList:{
        type:Array,
        default(){
          return []
        }
      },
    },
    computed: {
    },
    mounted() {
      this.getLayoutInfo();
    },
    methods: {
      /**
       * 获取布局详情
       */
      getLayoutInfo(){
        this.$http.get('/layout/info/' + this.layoutId).then(res => {
          if (res.data.code === 0) {
            this.editForm = res.data.data;
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
            this.$http[this.editForm.id ? 'put' : 'post'](this.editForm.id ? '/layout/edit' : '/layout/add', this.editForm).then(res => {
              loading.close();
              if (res.data.code === 0) {
                this.$message({type: 'success', message: res.data.msg});
                this.$emit('reload')
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
