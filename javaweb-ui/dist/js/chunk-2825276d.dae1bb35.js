(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2825276d"],{c740:function(e,t,l){"use strict";var a=l("23e7"),r=l("b727").findIndex,o=l("44d2"),i=l("ae40"),n="findIndex",s=!0,c=i(n);n in[]&&Array(1)[n]((function(){s=!1})),a({target:"Array",proto:!0,forced:s||!c},{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),o(n)},f794:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"ele-body"},[l("el-card",{attrs:{shadow:"never"}},[l("el-form",{staticClass:"ele-form-search",attrs:{model:e.where,"label-width":"77px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(t)},submit:function(e){e.preventDefault()}}},[l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{md:6,sm:12}},[l("el-form-item",{attrs:{label:"菜单名称:"}},[l("el-input",{attrs:{placeholder:"请输入菜单名称",clearable:""},model:{value:e.where.title,callback:function(t){e.$set(e.where,"title",t)},expression:"where.title"}})],1)],1),l("el-col",{attrs:{md:12,sm:12}},[l("div",{staticClass:"ele-form-actions"},[l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]),e.permission.includes("sys:menu:add")?l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){return e.add()}}},[e._v("添加")]):e._e(),e.permission.includes("sys:menu:expand")?l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"success",icon:"el-icon-_fold"},on:{click:function(t){return e.expendAll()}}},[e._v("展开全部")]):e._e(),e.permission.includes("sys:menu:collapse")?l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"warning",icon:"el-icon-_unfold"},on:{click:function(t){return e.foldAll()}}},[e._v("折叠全部")]):e._e()],1)])],1)],1),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",attrs:{data:e.data,"row-key":"id","default-expand-all":"",border:"",height:"calc(100vh - 215px)","highlight-current-row":"",lazy:"",load:e.load,"tree-props":{children:"children",hasChildren:"hasChildren"}}},[l("el-table-column",{attrs:{label:"编号",type:"index",width:"60",align:"center",fixed:"left"}}),l("el-table-column",{attrs:{label:"菜单名称","show-overflow-tooltip":"","min-width":"200",fixed:"left"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("i",{class:a.icon}),e._v(" "+e._s(a.title))]}}])}),l("el-table-column",{attrs:{prop:"path",label:"路由地址","show-overflow-tooltip":"","min-width":"150"}}),l("el-table-column",{attrs:{prop:"component",label:"组件路径","show-overflow-tooltip":"","min-width":"150"}}),l("el-table-column",{attrs:{prop:"permission",label:"权限标识","show-overflow-tooltip":"","min-width":"150"}}),l("el-table-column",{attrs:{prop:"status",label:"状态",sortable:"","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[l("ele-dot",{attrs:{type:["danger","success"][t.status],ripple:0===t.status,text:["禁用","正常"][t.status]}})]}}])}),l("el-table-column",{attrs:{label:"类型",width:"60px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-tag",{attrs:{type:["primary","success"][a.type],size:"mini"}},[e._v(e._s(["菜单","按钮"][a.type]))])]}}])}),l("el-table-column",{attrs:{prop:"sort",label:"排序",width:"60px",align:"center"}}),l("el-table-column",{attrs:{label:"创建时间","show-overflow-tooltip":"","min-width":"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e._v(e._s(e._f("toDateString")(l.createTime)))]}}])}),l("el-table-column",{attrs:{label:"操作",width:"190px",align:"center",resizable:!1,fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e.permission.includes("sys:menu:addz")?l("el-link",{attrs:{icon:"el-icon-plus",type:"primary",underline:!1},on:{click:function(t){return e.add(a)}}},[e._v("添加")]):e._e(),e.permission.includes("sys:menu:edit")?l("el-link",{attrs:{icon:"el-icon-edit",type:"primary",underline:!1},on:{click:function(t){return e.edit(a)}}},[e._v("修改")]):e._e(),l("el-popconfirm",{staticClass:"ele-action",attrs:{title:"确定要删除此菜单吗？"},on:{confirm:function(t){return e.remove(a)}}},[e.permission.includes("sys:menu:delete")?l("el-link",{attrs:{slot:"reference",icon:"el-icon-delete",type:"danger",underline:!1},slot:"reference"},[e._v("删除")]):e._e()],1)]}}])})],1)],1),l("el-dialog",{attrs:{title:e.form.id?"修改菜单":"添加菜单",visible:e.showEdit,width:"800px","destroy-on-close":!0,"custom-class":"ele-dialog-form","lock-scroll":!1},on:{"update:visible":function(t){e.showEdit=t},closed:function(t){e.form={}}}},[l("el-form",{ref:"editForm",attrs:{model:e.form,rules:e.rules,"label-width":"82px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.save(t)},submit:function(e){e.preventDefault()}}},[l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"菜单名称:",prop:"title"}},[l("el-input",{attrs:{placeholder:"请输入菜单名称",clearable:""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),l("el-form-item",{attrs:{label:"路由地址:"}},[l("el-input",{attrs:{placeholder:"请输入路由地址",clearable:""},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),l("el-form-item",{attrs:{label:"权限标识:"}},[l("el-input",{attrs:{placeholder:"请输入权限标识",clearable:""},model:{value:e.form.permission,callback:function(t){e.$set(e.form,"permission",t)},expression:"form.permission"}})],1),l("el-form-item",{attrs:{label:"菜单类型:"}},[l("el-radio-group",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[l("el-radio",{attrs:{label:0}},[e._v("菜单")]),l("el-radio",{attrs:{label:1}},[e._v("按钮")])],1)],1),l("el-form-item",{attrs:{label:"打开方式:"}},[l("el-radio-group",{model:{value:e.form.target,callback:function(t){e.$set(e.form,"target",t)},expression:"form.target"}},[l("el-radio",{attrs:{label:"_self"}},[e._v("内部打开")]),l("el-radio",{attrs:{label:"_blank"}},[e._v("外部打开")])],1)],1)],1),l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"菜单图标:"}},[l("ele-icon-picker",{attrs:{placeholder:"请选择菜单图标"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}})],1),l("el-form-item",{attrs:{label:"组件路径:"}},[l("el-input",{attrs:{placeholder:"请输入组件路径",clearable:""},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}})],1),l("el-form-item",{attrs:{label:"上级菜单:"}},[l("treeselect",{attrs:{options:e.menuList,placeholder:"请选择上级菜单",defaultExpandLevel:3,normalizer:function(e){return{id:e.id,label:e.title,children:e.children||void 0}}},model:{value:e.form.pid,callback:function(t){e.$set(e.form,"pid",t)},expression:"form.pid"}})],1),l("el-form-item",{attrs:{label:"菜单状态:"}},[l("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[l("el-radio",{attrs:{label:1}},[e._v("正常")]),l("el-radio",{attrs:{label:2}},[e._v("禁用")])],1)],1),l("el-form-item",{attrs:{label:"排序号:",prop:"sort"}},[l("el-input-number",{staticClass:"ele-fluid ele-text-left",attrs:{"controls-position":"right",min:0,placeholder:"请输入排序号"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1)],1)],1),0==e.form.type?l("el-form-item",{attrs:{label:"权限节点:"}},[l("el-transfer",{attrs:{data:e.permissionList,titles:["全部节点","已赋予节点"]},model:{value:e.form.checkedList,callback:function(t){e.$set(e.form,"checkedList",t)},expression:"form.checkedList"}})],1):e._e(),l("el-form-item",{attrs:{label:"备注:"}},[l("el-input",{attrs:{placeholder:"请输入备注",rows:3,type:"textarea"},model:{value:e.form.note,callback:function(t){e.$set(e.form,"note",t)},expression:"form.note"}})],1)],1),l("div",{attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.showEdit=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)},r=[],o=(l("c740"),l("4160"),l("a434"),l("159b"),l("5530")),i=l("ca17"),n=l.n(i),s=(l("542c"),l("2f62")),c={name:"SysMenu",components:{Treeselect:n.a},data:function(){return{loading:!0,data:[],where:{},showEdit:!1,form:{},rules:{title:[{required:!0,message:"请输入菜单名称",trigger:"blur"}],sort:[{required:!0,message:"请输入排序号",trigger:"blur"}]},permissionList:[{key:1,label:"查询"},{key:5,label:"添加"},{key:10,label:"修改"},{key:15,label:"删除"},{key:20,label:"状态"},{key:25,label:"批量删除"},{key:30,label:"全部展开"},{key:35,label:"全部折叠"},{key:40,label:"添加子级"},{key:45,label:"导出数据"},{key:50,label:"导入数据"},{key:55,label:"分配权限"}],menuList:[]}},computed:Object(o["a"])({},Object(s["b"])(["permission"])),mounted:function(){this.query(),this.getMenuAll()},methods:{query:function(){var e=this;this.loading=!0,this.$http.get("/menu/index",{params:this.where}).then((function(t){e.loading=!1,0===t.data.code?e.data=e.$util.toTreeData(t.data.data,"id","pid"):e.$message.error(t.data.msg||"获取数据失败")})).catch((function(t){e.loading=!1,e.$message.error(t.message)}))},getMenuAll:function(){var e=this;this.loading=!0,this.$http.get("/menu/getMenuAll",{}).then((function(t){e.loading=!1,0===t.data.code?e.menuList=e.$util.toTreeData(t.data.data,"id","pid"):e.$message.error(t.data.msg||"获取数据失败")})).catch((function(t){e.loading=!1,e.$message.error(t.message)}))},load:function(e,t,l){var a=this;this.where["pid"]=e.id,this.$http.get("/menu/index",{params:this.where}).then((function(t){0===t.data.code?(a.$util.eachTreeData(a.data,(function(l){if(l.id===e.id)return l.children=t.data.data,!1})),l(t.data.data)):a.$message.error(t.data.msg)})).catch((function(e){a.$message.error(e.message)}))},add:function(e){this.form={type:0,status:1,pid:e?e.id:null,target:"_blank"},this.showEdit=!0},edit:function(e){var t=this;this.$http.get("/menu/info/"+e.id).then((function(e){0===e.data.code?(t.form=e.data.data,t.showEdit=!0):t.$message.error(e.data.msg)})).catch((function(e){t.$message.error(e.message)}))},save:function(){var e=this;this.$refs["editForm"].validate((function(t){if(!t)return!1;var l=e.$loading({lock:!0});e.$http[e.form.id?"put":"post"](e.form.id?"/menu/edit":"/menu/add",Object.assign({},e.form,{pid:e.form.pid||0})).then((function(t){l.close(),0===t.data.code?(e.showEdit=!1,e.$message({type:"success",message:t.data.msg}),e.form.id?e.$util.eachTreeData(e.data,(function(t){if(t.id===e.form.id)return Object.assign(t,e.form),!1})):e.query()):e.$message.error(t.data.msg)})).catch((function(t){l.close(),e.$message.error(t.message)}))}))},remove:function(e){var t=this;if(e.children&&e.children.length>0)return this.$message.error("请先删除子节点");var l=this.$loading({lock:!0});this.$http.delete("/menu/delete/"+e.id).then((function(a){if(l.close(),0===a.data.code){if(t.$message({type:"success",message:a.data.msg}),0===e.pid)return void t.data.splice(t.data.findIndex((function(t){return t.id==e.id})),1);t.$util.eachTreeData(t.data,(function(t){if(t.id===e.pid)return t.children.splice(t.children.findIndex((function(t){return t.id===e.id})),1),!1}))}else t.$message.error(a.data.msg)})).catch((function(e){l.close(),t.$message.error(e.message)}))},expendAll:function(){var e=this;this.data.forEach((function(t){e.$refs.table.toggleRowExpansion(t,!0)}))},foldAll:function(){var e=this;this.data.forEach((function(t){e.$refs.table.toggleRowExpansion(t,!1)}))}}},d=c,u=l("0c7c"),m=Object(u["a"])(d,a,r,!1,null,"2e94293e",null);t["default"]=m.exports}}]);