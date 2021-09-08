(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8cbb6fa"],{"5ff3":function(e,t,l){"use strict";l("e3aa")},b4d8:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"ele-body"},[l("el-card",{attrs:{shadow:"never"}},[l("el-form",{staticClass:"ele-form-search",attrs:{model:e.table.where,"label-width":"77px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$refs.table.reload()},submit:function(e){e.preventDefault()}}},[l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{md:6,sm:12}},[l("el-form-item",{attrs:{label:"会员手机:"}},[l("el-input",{attrs:{placeholder:"请输入会员手机",clearable:""},model:{value:e.table.where.mobile,callback:function(t){e.$set(e.table.where,"mobile",t)},expression:"table.where.mobile"}})],1)],1),l("el-col",{attrs:{md:9,sm:12}},[l("div",{staticClass:"ele-form-actions"},[l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.$refs.table.reload()}}},[e._v("查询 ")]),l("el-button",{on:{click:function(t){(e.table.where={})&&e.$refs.table.reload()}}},[e._v("重置")]),e.permission.includes("sys:member:add")?l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.showEdit=!0}}},[e._v("添加")]):e._e(),e.permission.includes("sys:member:dall")?l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"danger",icon:"el-icon-delete"},on:{click:function(t){return e.remove()}}},[e._v("批量删除")]):e._e()],1)])],1)],1),l("ele-data-table",{ref:"table",attrs:{config:e.table,choose:e.choose,height:"calc(100vh - 265px)","highlight-current-row":""},on:{"update:choose":function(t){e.choose=t}},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.index;return[l("el-table-column",{attrs:{type:"selection",width:"45",align:"center",fixed:"left"}}),l("el-table-column",{attrs:{type:"index",index:a,label:"编号",width:"60",align:"center",fixed:"left","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"mobile",label:"会员手机",sortable:"custom","show-overflow-tooltip":"","min-width":"130"}}),l("el-table-column",{attrs:{prop:"nickname",label:"会员昵称",sortable:"custom","show-overflow-tooltip":"","min-width":"120"}}),l("el-table-column",{attrs:{label:"性别","min-width":"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-tag",{attrs:{type:["primary","success","warning"][a.gender-1],size:"mini"}},[e._v(e._s(["男","女","保密"][a.gender-1]))])]}}],null,!0)}),l("el-table-column",{attrs:{label:"头像","min-width":"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[l("el-avatar",{attrs:{shape:"square",size:35,src:t.avatar}})]}}],null,!0)}),l("el-table-column",{attrs:{label:"设备来源","min-width":"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-tag",{attrs:{type:["primary","success","warning","danger","info"][a.device-1],size:"mini"}},[e._v(e._s(["苹果","安卓","WAP站","PC站","后台"][a.device-1]))])]}}],null,!0)}),l("el-table-column",{attrs:{label:"会员来源","min-width":"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-tag",{attrs:{type:["primary","success"][a.source-1],size:"mini"}},[e._v(e._s(["APP客户端","后台添加"][a.source-1]))])]}}],null,!0)}),l("el-table-column",{attrs:{prop:"status",label:"会员状态",sortable:"custom",resizable:!1,"min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-switch",{attrs:{"active-value":1,"inactive-value":2},on:{change:function(t){return e.editStatus(a)}},model:{value:a.status,callback:function(t){e.$set(a,"status",t)},expression:"row.status"}})]}}],null,!0)}),l("el-table-column",{attrs:{label:"注册时间",sortable:"custom","show-overflow-tooltip":"","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e._v(e._s(e._f("toDateString")(l.createTime)))]}}],null,!0)}),l("el-table-column",{attrs:{label:"最近登录时间",sortable:"custom","show-overflow-tooltip":"","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e._v(e._s(e._f("toDateString")(l.loginTime)))]}}],null,!0)}),l("el-table-column",{attrs:{prop:"loginCount",label:"登录次数",sortable:"custom","show-overflow-tooltip":"","min-width":"120"}}),l("el-table-column",{attrs:{label:"操作",width:"130px",align:"center",resizable:!1,fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e.permission.includes("sys:member:edit")?l("el-link",{attrs:{icon:"el-icon-edit",type:"primary",underline:!1},on:{click:function(t){return e.edit(a)}}},[e._v("修改")]):e._e(),l("el-popconfirm",{staticClass:"ele-action",attrs:{title:"确定要删除此会员吗？"},on:{confirm:function(t){return e.remove(a)}}},[e.permission.includes("sys:member:delete")?l("el-link",{attrs:{slot:"reference",icon:"el-icon-delete",type:"danger",underline:!1},slot:"reference"},[e._v("删除")]):e._e()],1)]}}],null,!0)})]}}])})],1),l("el-dialog",{attrs:{title:e.editForm.id?"修改会员":"添加会员",visible:e.showEdit,width:"800px","destroy-on-close":!0,"custom-class":"ele-dialog-form","lock-scroll":!1},on:{"update:visible":function(t){e.showEdit=t},closed:function(t){e.editForm={}}}},[l("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.editRules,"label-width":"100px"}},[l("el-form-item",{attrs:{label:"会员头像:"}},[l("uploadImage",{attrs:{limit:1,updDir:e.updDir},model:{value:e.editForm.avatar,callback:function(t){e.$set(e.editForm,"avatar",t)},expression:"editForm.avatar"}})],1),l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"会员姓名:",prop:"realname"}},[l("el-input",{attrs:{placeholder:"请输入会员姓名",clearable:""},model:{value:e.editForm.realname,callback:function(t){e.$set(e.editForm,"realname",t)},expression:"editForm.realname"}})],1),l("el-form-item",{attrs:{label:"手机号码:",prop:"mobile"}},[l("el-input",{attrs:{placeholder:"请输入手机号码",clearable:""},model:{value:e.editForm.mobile,callback:function(t){e.$set(e.editForm,"mobile",t)},expression:"editForm.mobile"}})],1),l("el-form-item",{attrs:{label:"性别:",prop:"gender"}},[l("el-select",{staticClass:"ele-block",attrs:{placeholder:"请选择性别",clearable:""},model:{value:e.editForm.gender,callback:function(t){e.$set(e.editForm,"gender",t)},expression:"editForm.gender"}},[l("el-option",{attrs:{label:"男",value:1}}),l("el-option",{attrs:{label:"女",value:2}})],1)],1),l("el-form-item",{attrs:{label:"设备类型:",prop:"device"}},[l("el-select",{staticClass:"ele-block",attrs:{placeholder:"请选择设备类型",clearable:""},model:{value:e.editForm.device,callback:function(t){e.$set(e.editForm,"device",t)},expression:"editForm.device"}},[l("el-option",{attrs:{label:"苹果",value:1}}),l("el-option",{attrs:{label:"安卓",value:2}}),l("el-option",{attrs:{label:"WAP站",value:3}}),l("el-option",{attrs:{label:"PC站",value:4}}),l("el-option",{attrs:{label:"后台",value:5}})],1)],1),l("el-form-item",{attrs:{label:"所在城市:",prop:"city"}},[l("el-cascader",{staticClass:"ele-block",attrs:{options:e.cityData.cityData,clearable:"","popper-class":"ele-pop-wrap-higher"},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}})],1),l("el-form-item",{attrs:{label:"状态:"}},[l("el-radio-group",{model:{value:e.editForm.status,callback:function(t){e.$set(e.editForm,"status",t)},expression:"editForm.status"}},[l("el-radio",{attrs:{label:1}},[e._v("正常")]),l("el-radio",{attrs:{label:2}},[e._v("禁用")])],1)],1)],1),l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"会员昵称:",prop:"nickname"}},[l("el-input",{attrs:{placeholder:"请输入会员昵称",clearable:""},model:{value:e.editForm.nickname,callback:function(t){e.$set(e.editForm,"nickname",t)},expression:"editForm.nickname"}})],1),l("el-form-item",{attrs:{label:"会员等级",prop:"memberLevel",rules:{required:!0,message:"所属会员等级不能为空",trigger:"change"}}},[l("el-select",{staticClass:"ele-block",attrs:{filterable:"",clearable:"",size:"small",placeholder:"-请选择会员等级-"},model:{value:e.editForm.memberLevel,callback:function(t){e.$set(e.editForm,"memberLevel",t)},expression:"editForm.memberLevel"}},e._l(e.memberLevelList,(function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),l("el-form-item",{attrs:{label:"出生日期:",prop:"birthday"}},[l("el-date-picker",{attrs:{type:"date",placeholder:"选择出生日期",size:"small","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd"},model:{value:e.editForm.birthday,callback:function(t){e.$set(e.editForm,"birthday",t)},expression:"editForm.birthday"}})],1),l("el-form-item",{attrs:{label:"会员来源:",prop:"source"}},[l("el-select",{staticClass:"ele-block",attrs:{placeholder:"请选择会员来源",clearable:""},model:{value:e.editForm.source,callback:function(t){e.$set(e.editForm,"source",t)},expression:"editForm.source"}},[l("el-option",{attrs:{label:"APP客户端",value:1}}),l("el-option",{attrs:{label:"后台添加",value:2}})],1)],1),l("el-form-item",{attrs:{label:"详细地址:",prop:"address"}},[l("el-input",{attrs:{placeholder:"请输入详细地址",clearable:""},model:{value:e.editForm.address,callback:function(t){e.$set(e.editForm,"address",t)},expression:"editForm.address"}})],1)],1)],1),l("el-form-item",{attrs:{label:"个人简介:"}},[l("el-input",{attrs:{placeholder:"请输入个人简介",rows:2,type:"textarea"},model:{value:e.editForm.intro,callback:function(t){e.$set(e.editForm,"intro",t)},expression:"editForm.intro"}})],1),l("el-form-item",{attrs:{label:"个人签名:"}},[l("el-input",{attrs:{placeholder:"请输入个人签名",rows:2,type:"textarea"},model:{value:e.editForm.signature,callback:function(t){e.$set(e.editForm,"signature",t)},expression:"editForm.signature"}})],1)],1),l("div",{attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.showEdit=!1}}},[e._v("取消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)},r=[],o=(l("d81d"),l("5530")),s=l("3b86"),i=l("cbc3"),n=l("2f62"),c={name:"SysMember",data:function(){return{cityData:s["a"],city:[],provinceCity:[],province:[],table:{url:"/member/index",where:{}},choose:[],showEdit:!1,editForm:{},editRules:{name:[{required:!0,message:"请输入会员名称",trigger:"blur"}],sort:[{required:!0,message:"请输入排序",trigger:"blur"}]},updDir:"member",memberLevelList:[]}},computed:Object(o["a"])({},Object(n["b"])(["permission"])),components:{uploadImage:i["a"]},mounted:function(){this.getMemberLevelList()},methods:{edit:function(e){this.editForm=Object.assign({},e),this.showEdit=!0,this.city=e.city},save:function(){var e=this;this.$refs["editForm"].validate((function(t){if(!t)return!1;var l=e.$loading({lock:!0});e.editForm=Object.assign({},e.editForm,{city:e.city}),e.$http[e.editForm.id?"put":"post"](e.editForm.id?"/member/edit":"/member/add",e.editForm).then((function(t){l.close(),0===t.data.code?(e.showEdit=!1,e.$message({type:"success",message:t.data.msg}),e.$refs.table.reload()):e.$message.error(t.data.msg)})).catch((function(t){l.close(),e.$message.error(t.message)}))}))},remove:function(e){var t=this;if(e){var l=this.$loading({lock:!0});this.$http.delete("/member/delete/"+[e.id]).then((function(e){l.close(),0===e.data.code?(t.$message({type:"success",message:e.data.msg}),t.$refs.table.reload()):t.$message.error(e.data.msg)})).catch((function(e){l.close(),t.$message.error(e.message)}))}else{if(0===this.choose.length)return this.$message.error("请至少选择一条数据");var a=this.choose.map((function(e){return e.id}));this.$confirm("确定要删除选中的会员吗?","提示",{type:"warning"}).then((function(){var e=t.$loading({lock:!0});t.$http.delete("/member/delete/"+a).then((function(l){e.close(),0===l.data.code?(t.$message({type:"success",message:l.data.msg}),t.$refs.table.reload()):t.$message.error(l.data.msg)})).catch((function(l){e.close(),t.$message.error(l.message)}))})).catch((function(){return 0}))}},editStatus:function(e){var t=this,l=this.$loading({lock:!0}),a=Object.assign({},e);this.$http.put("/member/status",a).then((function(a){l.close(),0===a.data.code?t.$message({type:"success",message:a.data.msg}):(e.status=e.status?1:2,t.$message.error(a.data.msg))})).catch((function(e){l.close(),t.$message.error(e.message)}))},getMemberLevelList:function(){var e=this;this.$http.get("/memberlevel/getMemberLevelList").then((function(t){0===t.data.code?e.memberLevelList=t.data.data:e.$message.error(t.data.msg)})).catch((function(t){e.$message.error(t.message)}))}}},m=c,d=(l("5ff3"),l("0c7c")),u=Object(d["a"])(m,a,r,!1,null,"2d62eff7",null);t["default"]=u.exports},e3aa:function(e,t,l){}}]);