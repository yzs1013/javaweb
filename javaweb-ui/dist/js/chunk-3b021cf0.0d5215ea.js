(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b021cf0"],{"5cfa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ele-body"},[n("el-card",{attrs:{shadow:"never"}},[n("el-form",{staticClass:"ele-form-search",attrs:{model:e.where,"label-width":"77px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(t)},submit:function(e){e.preventDefault()}}},[n("el-row",{attrs:{gutter:15}},[n("el-col",{attrs:{md:6,sm:12}},[n("el-form-item",{attrs:{label:"部门名称:"}},[n("el-input",{attrs:{placeholder:"请输入部门名称",clearable:""},model:{value:e.where.name,callback:function(t){e.$set(e.where,"name",t)},expression:"where.name"}})],1)],1),n("el-col",{attrs:{md:9,sm:12}},[n("div",{staticClass:"ele-form-actions"},[n("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]),e.permission.includes("sys:dept:add")?n("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){return e.add()}}},[e._v("添加")]):e._e(),e.permission.includes("sys:dept:expand")?n("el-button",{staticClass:"ele-btn-icon",attrs:{type:"success",icon:"el-icon-_fold"},on:{click:function(t){return e.expendAll()}}},[e._v("展开全部")]):e._e(),e.permission.includes("sys:dept:collapse")?n("el-button",{staticClass:"ele-btn-icon",attrs:{type:"warning",icon:"el-icon-_unfold"},on:{click:function(t){return e.foldAll()}}},[e._v("折叠全部")]):e._e()],1)])],1)],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{data:e.data,"row-key":"id","default-expand-all":"",border:"",height:"calc(100vh - 215px)","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"编号",type:"index",width:"60",align:"center",fixed:"left"}}),n("el-table-column",{attrs:{label:"部门名称","show-overflow-tooltip":"","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(e._s(n.name))]}}])}),n("el-table-column",{attrs:{prop:"note",label:"备注","min-width":"200",align:"center"}}),n("el-table-column",{attrs:{prop:"sort",label:"排序",width:"60px",align:"center"}}),n("el-table-column",{attrs:{label:"创建时间","show-overflow-tooltip":"","min-width":"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(e._s(e._f("toDateString")(n.createTime)))]}}])}),n("el-table-column",{attrs:{label:"更新时间","show-overflow-tooltip":"","min-width":"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(e._s(e._f("toDateString")(n.updateTime)))]}}])}),n("el-table-column",{attrs:{label:"操作",width:"190px",align:"center",resizable:!1,fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e.permission.includes("sys:dept:addz")?n("el-link",{attrs:{icon:"el-icon-plus",type:"primary",underline:!1},on:{click:function(t){return e.add(r)}}},[e._v("添加")]):e._e(),e.permission.includes("sys:dept:edit")?n("el-link",{attrs:{icon:"el-icon-edit",type:"primary",underline:!1},on:{click:function(t){return e.edit(r)}}},[e._v("修改")]):e._e(),n("el-popconfirm",{staticClass:"ele-action",attrs:{title:"确定要删除此部门吗？"},on:{confirm:function(t){return e.remove(r)}}},[e.permission.includes("sys:dept:delete")?n("el-link",{attrs:{slot:"reference",icon:"el-icon-delete",type:"danger",underline:!1},slot:"reference"},[e._v("删除")]):e._e()],1)]}}])})],1)],1),n("el-dialog",{attrs:{title:e.form.id?"修改部门":"添加部门",visible:e.showEdit,width:"400px","destroy-on-close":!0,"lock-scroll":!1},on:{"update:visible":function(t){e.showEdit=t},closed:function(t){e.form={}}}},[n("el-form",{ref:"editForm",attrs:{model:e.form,rules:e.rules,"label-width":"82px"}},[n("el-form-item",{attrs:{label:"部门名称:",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入部门名称",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"排序号:",prop:"sort"}},[n("el-input-number",{staticClass:"ele-fluid ele-text-left",attrs:{"controls-position":"right",min:0,placeholder:"请输入排序号"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),n("el-form-item",{attrs:{label:"备注:"}},[n("el-input",{attrs:{placeholder:"请输入备注",rows:4,type:"textarea"},model:{value:e.form.note,callback:function(t){e.$set(e.form,"note",t)},expression:"form.note"}})],1)],1),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.showEdit=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)},i=[],o=(n("c740"),n("4160"),n("a434"),n("159b"),n("5530")),a=n("2f62"),l={name:"SysDept",data:function(){return{loading:!0,data:[],where:{},showEdit:!1,form:{},rules:{name:[{required:!0,message:"请输入部门名称",trigger:"blur"}],sort:[{required:!0,message:"请输入排序号",trigger:"blur"}]}}},computed:Object(o["a"])({},Object(a["b"])(["permission"])),mounted:function(){this.query()},methods:{query:function(){var e=this;this.loading=!0,this.$http.get("/dept/index",{params:this.where}).then((function(t){e.loading=!1,0===t.data.code?e.data=e.$util.toTreeData(t.data.data,"id","pid"):e.$message.error(t.data.msg||"获取数据失败")})).catch((function(t){e.loading=!1,e.$message.error(t.message)}))},add:function(e){this.form={sort:0,pid:e?e.id:null},this.showEdit=!0},edit:function(e){this.form=Object.assign({},e,{pid:e.pid||null}),this.showEdit=!0},save:function(){var e=this;this.$refs["editForm"].validate((function(t){if(!t)return!1;var n=e.$loading({lock:!0});e.$http[e.form.id?"put":"post"](e.form.id?"/dept/edit":"/dept/add",Object.assign({},e.form,{pid:e.form.pid||0})).then((function(t){n.close(),0===t.data.code?(e.showEdit=!1,e.$message({type:"success",message:t.data.msg}),e.form.id?e.$util.eachTreeData(e.data,(function(t){if(t.id===e.form.id)return Object.assign(t,e.form),!1})):e.query()):e.$message.error(t.data.msg)})).catch((function(t){n.close(),e.$message.error(t.message)}))}))},remove:function(e){var t=this;if(e.children&&e.children.length>0)return this.$message.error("请先删除子节点");var n=this.$loading({lock:!0});this.$http.delete("/dept/delete/"+e.id).then((function(r){n.close(),0===r.data.code?(t.$message({type:"success",message:r.data.msg}),t.$util.eachTreeData(t.data,(function(t){if(t.id===e.pid)return t.children.splice(t.children.findIndex((function(t){return t.id===e.id})),1),!1}))):t.$message.error(r.data.msg)})).catch((function(e){n.close(),t.$message.error(e.message)}))},expendAll:function(){var e=this;this.data.forEach((function(t){e.$refs.table.toggleRowExpansion(t,!0)}))},foldAll:function(){var e=this;this.data.forEach((function(t){e.$refs.table.toggleRowExpansion(t,!1)}))}}},s=l,c=n("0c7c"),d=Object(c["a"])(s,r,i,!1,null,"278e7d20",null);t["default"]=d.exports},c740:function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").findIndex,o=n("44d2"),a=n("ae40"),l="findIndex",s=!0,c=a(l);l in[]&&Array(1)[l]((function(){s=!1})),r({target:"Array",proto:!0,forced:s||!c},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(l)}}]);