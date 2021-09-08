(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f573816","chunk-2d0a40c7","chunk-2d22883b"],{"057c":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-form",{ref:"basicInfoForm",staticStyle:{"margin-top":"20px"},attrs:{model:e.info,rules:e.rules,"label-width":"150px"}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"表名称",prop:"tableName"}},[l("el-input",{attrs:{placeholder:"请输入仓库名称"},model:{value:e.info.tableName,callback:function(t){e.$set(e.info,"tableName",t)},expression:"info.tableName"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"表描述",prop:"tableComment"}},[l("el-input",{attrs:{placeholder:"请输入"},model:{value:e.info.tableComment,callback:function(t){e.$set(e.info,"tableComment",t)},expression:"info.tableComment"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"实体类名称",prop:"className"}},[l("el-input",{attrs:{placeholder:"请输入"},model:{value:e.info.className,callback:function(t){e.$set(e.info,"className",t)},expression:"info.className"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"作者",prop:"functionAuthor"}},[l("el-input",{attrs:{placeholder:"请输入"},model:{value:e.info.functionAuthor,callback:function(t){e.$set(e.info,"functionAuthor",t)},expression:"info.functionAuthor"}})],1)],1),l("el-col",{attrs:{span:24}},[l("el-form-item",{attrs:{label:"备注",prop:"remark"}},[l("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.info.remark,callback:function(t){e.$set(e.info,"remark",t)},expression:"info.remark"}})],1)],1)],1)],1)},o=[],n={name:"BasicInfoForm",props:{info:{type:Object,default:null}},data:function(){return{rules:{tableName:[{required:!0,message:"请输入表名称",trigger:"blur"}],tableComment:[{required:!0,message:"请输入表描述",trigger:"blur"}],className:[{required:!0,message:"请输入实体类名称",trigger:"blur"}],functionAuthor:[{required:!0,message:"请输入作者",trigger:"blur"}]}}}},s=n,r=l("0c7c"),i=Object(r["a"])(s,a,o,!1,null,null,null);t["default"]=i.exports},"5c68":function(e,t,l){},"821c":function(e,t,l){"use strict";l("5c68")},bd47:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-drawer",{staticClass:"edit-table",attrs:{title:"编辑",visible:e.visible,direction:e.direction,size:"calc(100vw - 256px)","before-close":e.handleClose},on:{"update:visible":function(t){e.visible=t}}},[l("el-card",{staticStyle:{margin:"5px 20px"},attrs:{shadow:"never","body-style":"position:relative;padding:0;"}},[l("el-tabs",{staticClass:"demo-icon-tabs",model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:"基本信息",name:"basic"}},[l("basic-info-form",{ref:"basicInfo",attrs:{info:e.info}})],1),l("el-tab-pane",{staticStyle:{"margin-top":"10px"},attrs:{label:"字段信息",name:"cloum"}},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],attrs:{size:"medium",data:e.cloumns,"max-height":e.tableHeight}},[l("el-table-column",{attrs:{label:"编号",type:"index",width:"60"}}),l("el-table-column",{attrs:{prop:"columnName",label:"字段列名","show-overflow-tooltip":!0,"min-width":"10%"}}),l("el-table-column",{attrs:{label:"字段描述","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-input",{model:{value:t.row.columnComment,callback:function(l){e.$set(t.row,"columnComment",l)},expression:"scope.row.columnComment"}})]}}])}),l("el-table-column",{attrs:{prop:"columnType",label:"数据类型","show-overflow-tooltip":!0,"min-width":"10%"}}),l("el-table-column",{attrs:{label:"字段类型","min-width":"11%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-select",{model:{value:t.row.javaType,callback:function(l){e.$set(t.row,"javaType",l)},expression:"scope.row.javaType"}},[l("el-option",{attrs:{label:"Long",value:"Long"}}),l("el-option",{attrs:{label:"String",value:"String"}}),l("el-option",{attrs:{label:"Integer",value:"Integer"}}),l("el-option",{attrs:{label:"Double",value:"Double"}}),l("el-option",{attrs:{label:"BigDecimal",value:"BigDecimal"}}),l("el-option",{attrs:{label:"Date",value:"Date"}})],1)]}}])}),l("el-table-column",{attrs:{label:"字段属性","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-input",{model:{value:t.row.javaField,callback:function(l){e.$set(t.row,"javaField",l)},expression:"scope.row.javaField"}})]}}])}),l("el-table-column",{attrs:{label:"插入","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-checkbox",{attrs:{"true-label":"1"},model:{value:t.row.isInsert,callback:function(l){e.$set(t.row,"isInsert",l)},expression:"scope.row.isInsert"}})]}}])}),l("el-table-column",{attrs:{label:"编辑","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-checkbox",{attrs:{"true-label":"1"},model:{value:t.row.isEdit,callback:function(l){e.$set(t.row,"isEdit",l)},expression:"scope.row.isEdit"}})]}}])}),l("el-table-column",{attrs:{label:"列表","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-checkbox",{attrs:{"true-label":"1"},model:{value:t.row.isList,callback:function(l){e.$set(t.row,"isList",l)},expression:"scope.row.isList"}})]}}])}),l("el-table-column",{attrs:{label:"查询","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-checkbox",{attrs:{"true-label":"1"},model:{value:t.row.isQuery,callback:function(l){e.$set(t.row,"isQuery",l)},expression:"scope.row.isQuery"}})]}}])}),l("el-table-column",{attrs:{label:"查询方式","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-select",{model:{value:t.row.queryType,callback:function(l){e.$set(t.row,"queryType",l)},expression:"scope.row.queryType"}},[l("el-option",{attrs:{label:"=",value:"EQ"}}),l("el-option",{attrs:{label:"!=",value:"NE"}}),l("el-option",{attrs:{label:">",value:"GT"}}),l("el-option",{attrs:{label:">=",value:"GTE"}}),l("el-option",{attrs:{label:"<",value:"LT"}}),l("el-option",{attrs:{label:"<=",value:"LTE"}}),l("el-option",{attrs:{label:"LIKE",value:"LIKE"}}),l("el-option",{attrs:{label:"BETWEEN",value:"BETWEEN"}})],1)]}}])}),l("el-table-column",{attrs:{label:"必填","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-checkbox",{attrs:{"true-label":"1"},model:{value:t.row.isRequired,callback:function(l){e.$set(t.row,"isRequired",l)},expression:"scope.row.isRequired"}})]}}])}),l("el-table-column",{attrs:{label:"显示类型","min-width":"12%"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-select",{model:{value:t.row.htmlType,callback:function(l){e.$set(t.row,"htmlType",l)},expression:"scope.row.htmlType"}},[l("el-option",{attrs:{label:"文本框",value:"input"}}),l("el-option",{attrs:{label:"文本域",value:"textarea"}}),l("el-option",{attrs:{label:"下拉框",value:"select"}}),l("el-option",{attrs:{label:"单选框",value:"radio"}}),l("el-option",{attrs:{label:"复选框",value:"checkbox"}}),l("el-option",{attrs:{label:"日期控件",value:"datetime"}})],1)]}}])})],1)],1),l("el-tab-pane",{attrs:{label:"生成信息",name:"genInfo"}},[l("gen-info-form",{ref:"genInfo",attrs:{info:e.info}})],1)],1)],1),l("el-form",{attrs:{"label-width":"100px"}},[l("el-form-item",{staticStyle:{"text-align":"center","margin-left":"-100px","margin-top":"10px"}},[l("el-button",{attrs:{loading:e.submitLoading,type:"primary",size:"medium"},on:{click:function(t){return e.submitForm()}}},[e._v("确定提交 ")]),l("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.$emit("returnBack")}}},[e._v("返回")])],1)],1)],1)},o=[],n=(l("a623"),l("d81d"),l("a9e3"),l("d3b7"),l("3ca3"),l("ddb0"),l("057c")),s=l("da08"),r={name:"GenEdit",data:function(){return{tableLoading:!1,submitLoading:!1,activeName:"cloum",tableHeight:document.documentElement.scrollHeight-180+"px",cloumns:[],dictOptions:[],info:{},direction:"rtl"}},props:{visible:{type:Boolean,default:function(){return!1}},tableId:{type:Number,default:function(){return 0}}},components:{basicInfoForm:n["default"],genInfoForm:s["default"]},computed:{},mounted:function(){this.getTableInfo()},methods:{getTableInfo:function(){var e=this;this.tableLoading=!0,this.$http.get("/gentable/getTableInfo/"+this.tableId).then((function(t){e.cloumns=t.data.data.records,e.info=t.data.data.info,e.tableLoading=!1})).catch((function(t){e.cloumns=[],e.info={},e.tableLoading=!1,e.$message.error(t.message)}))},submitForm:function(){var e=this;this.submitLoading=!0;var t=this.$refs.basicInfo.$refs.basicInfoForm,l=this.$refs.genInfo.$refs.genInfoForm;Promise.all([t,l].map(this.getFormPromise)).then((function(a){var o=a.every((function(e){return!!e}));if(o){var n=Object.assign({},t.model,l.model);n.columns=e.cloumns,n.params={treeCode:n.treeCode,treeName:n.treeName,treeParentCode:n.treeParentCode},e.$http.put("/gentable/updateGenTable",n).then((function(t){e.$message({message:t.data.msg,type:"success"}),e.submitLoading=!1,e.$emit("returnBack")})).catch((function(t){e.submitLoading=!1,e.$message.error(t.message)}))}else e.submitLoading=!1,e.$message.error("业务表更新失败")}))},getFormPromise:function(e){return new Promise((function(t){e.validate((function(e){t(e)}))}))},handleClose:function(e){e&&e(),this.$emit("returnBack")}}},i=r,c=(l("821c"),l("0c7c")),u=Object(c["a"])(i,a,o,!1,null,"5fb8843a",null);t["default"]=u.exports},da08:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-form",{ref:"genInfoForm",staticStyle:{"margin-top":"20px"},attrs:{model:e.info,rules:e.rules,"label-width":"150px"}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{prop:"tplCategory"}},[l("span",{attrs:{slot:"label"},slot:"label"},[e._v("生成模板")]),l("el-select",{model:{value:e.info.tplCategory,callback:function(t){e.$set(e.info,"tplCategory",t)},expression:"info.tplCategory"}},[l("el-option",{attrs:{label:"单表（增删改查）",value:"crud"}}),l("el-option",{attrs:{label:"树表（增删改查）",value:"tree"}})],1)],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{prop:"packageName"}},[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 生成包路径 "),l("el-tooltip",{attrs:{content:"生成在哪个java包下，例如 com.ruoyi.system",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-input",{model:{value:e.info.packageName,callback:function(t){e.$set(e.info,"packageName",t)},expression:"info.packageName"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{prop:"moduleName"}},[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 生成模块名 "),l("el-tooltip",{attrs:{content:"可理解为子系统名，例如 system",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-input",{model:{value:e.info.moduleName,callback:function(t){e.$set(e.info,"moduleName",t)},expression:"info.moduleName"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{prop:"businessName"}},[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 生成业务名 "),l("el-tooltip",{attrs:{content:"可理解为功能英文名，例如 user",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-input",{model:{value:e.info.businessName,callback:function(t){e.$set(e.info,"businessName",t)},expression:"info.businessName"}})],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{prop:"functionName"}},[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 生成功能名 "),l("el-tooltip",{attrs:{content:"用作类描述，例如 用户",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-input",{model:{value:e.info.functionName,callback:function(t){e.$set(e.info,"functionName",t)},expression:"info.functionName"}})],1)],1)],1),l("el-row",{directives:[{name:"show",rawName:"v-show",value:"tree"==e.info.tplCategory,expression:"info.tplCategory == 'tree'"}]},[l("h4",{staticClass:"form-header"},[e._v("其他信息")]),l("el-col",{attrs:{span:12}},[l("el-form-item",[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 树编码字段 "),l("el-tooltip",{attrs:{content:"树显示的编码字段名， 如：dept_id",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.info.treeCode,callback:function(t){e.$set(e.info,"treeCode",t)},expression:"info.treeCode"}},e._l(e.info.columns,(function(e){return l("el-option",{key:e.columnName,attrs:{label:e.columnName+"："+e.columnComment,value:e.columnName}})})),1)],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 树父编码字段 "),l("el-tooltip",{attrs:{content:"树显示的父编码字段名， 如：parent_Id",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.info.treeParentCode,callback:function(t){e.$set(e.info,"treeParentCode",t)},expression:"info.treeParentCode"}},e._l(e.info.columns,(function(e){return l("el-option",{key:e.columnName,attrs:{label:e.columnName+"："+e.columnComment,value:e.columnName}})})),1)],1)],1),l("el-col",{attrs:{span:12}},[l("el-form-item",[l("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 树名称字段 "),l("el-tooltip",{attrs:{content:"树节点的显示名称字段名， 如：dept_name",placement:"top"}},[l("i",{staticClass:"el-icon-question"})])],1),l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.info.treeName,callback:function(t){e.$set(e.info,"treeName",t)},expression:"info.treeName"}},e._l(e.info.columns,(function(e){return l("el-option",{key:e.columnName,attrs:{label:e.columnName+"："+e.columnComment,value:e.columnName}})})),1)],1)],1)],1)],1)},o=[],n={name:"BasicInfoForm",props:{info:{type:Object,default:null}},data:function(){return{rules:{tplCategory:[{required:!0,message:"请选择生成模板",trigger:"blur"}],packageName:[{required:!0,message:"请输入生成包路径",trigger:"blur"}],moduleName:[{required:!0,message:"请输入生成模块名",trigger:"blur"}],businessName:[{required:!0,message:"请输入生成业务名",trigger:"blur"}],functionName:[{required:!0,message:"请输入生成功能名",trigger:"blur"}]}}},created:function(){}},s=n,r=l("0c7c"),i=Object(r["a"])(s,a,o,!1,null,null,null);t["default"]=i.exports}}]);