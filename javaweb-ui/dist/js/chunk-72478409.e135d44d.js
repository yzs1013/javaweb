(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72478409"],{"4a7b9":function(e,t,s){},5044:function(e,t,s){"use strict";s.r(t);var l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"ele-body"},[s("el-card",{attrs:{shadow:"never"}},[s("el-form",{staticClass:"ele-form-search",attrs:{model:e.table.where,"label-width":"77px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$refs.table.reload()},submit:function(e){e.preventDefault()}}},[s("el-row",{attrs:{gutter:15}},[s("el-col",{attrs:{md:6,sm:12}},[s("el-form-item",{attrs:{label:"职级名称:"}},[s("el-input",{attrs:{placeholder:"请输入职级名称",clearable:""},model:{value:e.table.where.name,callback:function(t){e.$set(e.table.where,"name",t)},expression:"table.where.name"}})],1)],1),s("el-col",{attrs:{md:6,sm:12}},[s("div",{staticClass:"ele-form-actions"},[s("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.$refs.table.reload()}}},[e._v("查询 ")]),s("el-button",{on:{click:function(t){(e.table.where={})&&e.$refs.table.reload()}}},[e._v("重置")]),e.permission.includes("sys:level:export")?s("el-button",{staticClass:"ele-btn-icon",attrs:{type:"success",icon:"el-icon-download"},on:{click:function(t){return e.exportExcel()}}},[e._v("导出数据 ")]):e._e()],1)])],1)],1),s("div",{staticClass:"ele-table-tool ele-table-tool-default"},[e.permission.includes("sys:level:add")?s("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(t){e.showEdit=!0}}},[e._v("添加 ")]):e._e(),e.permission.includes("sys:level:dall")?s("el-button",{staticClass:"ele-btn-icon",attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(t){return e.remove()}}},[e._v("批量删除 ")]):e._e()],1),s("ele-data-table",{ref:"table",attrs:{config:e.table,choose:e.choose,height:"calc(100vh - 315px)","highlight-current-row":""},on:{"update:choose":function(t){e.choose=t}},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.index;return[s("el-table-column",{attrs:{type:"selection",width:"45",align:"center",fixed:"left"}}),s("el-table-column",{attrs:{type:"index",index:l,label:"编号",width:"60",align:"center",fixed:"left","show-overflow-tooltip":""}}),s("el-table-column",{attrs:{prop:"name",label:"职级名称",sortable:"custom","show-overflow-tooltip":"","min-width":"250"}}),s("el-table-column",{attrs:{prop:"status",label:"职级状态",sortable:"custom",resizable:!1,"min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[s("el-switch",{attrs:{"active-value":1,"inactive-value":2},on:{change:function(t){return e.editStatus(l)}},model:{value:l.status,callback:function(t){e.$set(l,"status",t)},expression:"row.status"}})]}}],null,!0)}),s("el-table-column",{attrs:{prop:"sort",label:"排序",sortable:"custom","show-overflow-tooltip":""}}),s("el-table-column",{attrs:{label:"创建时间",sortable:"custom","show-overflow-tooltip":"","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.row;return[e._v(e._s(e._f("toDateString")(s.createTime)))]}}],null,!0)}),s("el-table-column",{attrs:{label:"更新时间",sortable:"custom","show-overflow-tooltip":"","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.row;return[e._v(e._s(e._f("toDateString")(s.updateTime)))]}}],null,!0)}),s("el-table-column",{attrs:{label:"操作",width:"130px",align:"center",resizable:!1,fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e.permission.includes("sys:level:edit")?s("el-link",{attrs:{icon:"el-icon-edit",type:"primary",underline:!1},on:{click:function(t){return e.edit(l)}}},[e._v("修改")]):e._e(),s("el-popconfirm",{staticClass:"ele-action",attrs:{title:"确定要删除此职级吗？"},on:{confirm:function(t){return e.remove(l)}}},[e.permission.includes("sys:level:delete")?s("el-link",{attrs:{slot:"reference",icon:"el-icon-delete",type:"danger",underline:!1},slot:"reference"},[e._v("删除")]):e._e()],1)]}}],null,!0)})]}}])})],1),s("el-dialog",{attrs:{title:(e.editForm.id,"修改职级"),visible:e.showEdit,width:"400px","destroy-on-close":!0,"lock-scroll":!1},on:{"update:visible":function(t){e.showEdit=t},closed:function(t){e.editForm={}}}},[s("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.editRules,"label-width":"82px"}},[s("el-form-item",{attrs:{label:"职级名称:",prop:"name"}},[s("el-input",{attrs:{placeholder:"请输入职级名称",clearable:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),s("el-form-item",{attrs:{label:"职级状态:"}},[s("el-radio-group",{model:{value:e.editForm.status,callback:function(t){e.$set(e.editForm,"status",t)},expression:"editForm.status"}},[s("el-radio",{attrs:{label:1}},[e._v("正常")]),s("el-radio",{attrs:{label:2}},[e._v("禁用")])],1)],1),s("el-form-item",{attrs:{label:"排序号:",prop:"sort"}},[s("el-input-number",{staticClass:"ele-fluid ele-text-left",attrs:{"controls-position":"right",min:0,placeholder:"请输入排序号"},model:{value:e.editForm.sort,callback:function(t){e.$set(e.editForm,"sort",t)},expression:"editForm.sort"}})],1)],1),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.showEdit=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)},o=[],a=(s("d81d"),s("5530")),r=s("2f62"),n=s("bc3a"),i=s.n(n),c={name:"SysLevel",data:function(){return{table:{url:"/level/index",where:{}},choose:[],showEdit:!1,editForm:{},editRules:{name:[{required:!0,message:"请输入职级名称",trigger:"blur"}],sort:[{required:!0,message:"请输入排序",trigger:"blur"}]}}},computed:Object(a["a"])({},Object(r["b"])(["permission"])),mounted:function(){},methods:{edit:function(e){this.editForm=Object.assign({},e),this.showEdit=!0},save:function(){var e=this;this.$refs["editForm"].validate((function(t){if(!t)return!1;var s=e.$loading({lock:!0});e.$http[e.editForm.id?"put":"post"](e.editForm.id?"/level/edit":"/level/add",e.editForm).then((function(t){s.close(),0===t.data.code?(e.showEdit=!1,e.$message({type:"success",message:t.data.msg}),e.$refs.table.reload()):e.$message.error(t.data.msg)})).catch((function(t){s.close(),e.$message.error(t.message)}))}))},remove:function(e){var t=this;if(e){var s=this.$loading({lock:!0});this.$http.delete("/level/delete/"+[e.id]).then((function(e){s.close(),0===e.data.code?(t.$message({type:"success",message:e.data.msg}),t.$refs.table.reload()):t.$message.error(e.data.msg)})).catch((function(e){s.close(),t.$message.error(e.message)}))}else{if(0===this.choose.length)return this.$message.error("请至少选择一条数据");var l=this.choose.map((function(e){return e.id}));this.$confirm("确定要删除选中的职级吗?","提示",{type:"warning"}).then((function(){var e=t.$loading({lock:!0});t.$http.delete("/level/delete/"+l).then((function(s){e.close(),0===s.data.code?(t.$message({type:"success",message:s.data.msg}),t.$refs.table.reload()):t.$message.error(s.data.msg)})).catch((function(s){e.close(),t.$message.error(s.message)}))})).catch((function(){return 0}))}},editStatus:function(e){var t=this,s=this.$loading({lock:!0}),l=Object.assign({},e);this.$http.put("/level/status",l).then((function(l){s.close(),0===l.data.code?t.$message({type:"success",message:l.data.msg}):(e.status=e.status?1:2,t.$message.error(l.data.msg))})).catch((function(e){s.close(),t.$message.error(e.message)}))},exportExcel:function(){var e=this,t=JSON.parse(JSON.stringify(this.table.where));this.$http.post("/level/exportExcel",t).then((function(t){var s=t.data;0==s.code?(window.location.href=i.a.defaults.baseURL+"/common/download?fileName="+encodeURI(s.data)+"&isDelete="+!0,e.$message({type:"success",message:"导出成功"})):e.$message.error("导出失败")})).catch((function(t){console.log(t),e.$message.error("导出失败")}))}}},d=c,u=(s("6dbd"),s("0c7c")),m=Object(u["a"])(d,l,o,!1,null,"01ebf1f2",null);t["default"]=m.exports},"6dbd":function(e,t,s){"use strict";s("4a7b9")}}]);