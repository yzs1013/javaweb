(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d238646"],{fed5:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"ele-body"},[l("el-card",{attrs:{shadow:"never"}},[l("el-form",{staticClass:"ele-form-search",attrs:{model:e.table.where,"label-width":"77px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$refs.table.reload()},submit:function(e){e.preventDefault()}}},[l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{md:6,sm:12}},[l("el-form-item",{attrs:{label:"用户账号:"}},[l("el-input",{attrs:{placeholder:"请输入用户账号",clearable:""},model:{value:e.table.where.operName,callback:function(t){e.$set(e.table.where,"operName",t)},expression:"table.where.operName"}})],1)],1),l("el-col",{attrs:{md:6,sm:12}},[l("el-form-item",{attrs:{label:"模块名称:"}},[l("el-input",{attrs:{placeholder:"请输入模块名称",clearable:""},model:{value:e.table.where.title,callback:function(t){e.$set(e.table.where,"title",t)},expression:"table.where.title"}})],1)],1),l("el-col",{attrs:{md:6,sm:12}},[l("div",{staticClass:"ele-form-actions"},[l("el-button",{staticClass:"ele-btn-icon",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.$refs.table.reload()}}},[e._v("查询 ")]),l("el-button",{on:{click:e.reload}},[e._v("重置")])],1)])],1)],1),l("ele-data-table",{ref:"table",attrs:{config:e.table,height:"calc(100vh - 260px)","highlight-current-row":""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.index;return[l("el-table-column",{attrs:{type:"index",index:a,label:"编号",width:"60",align:"center",fixed:"left","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"title",label:"操作模块","min-width":"110","show-overflow-tooltip":"",align:"center"}}),l("el-table-column",{attrs:{prop:"logType",label:"操作类型","min-width":"110","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[0===a.logType?l("el-tag",{attrs:{type:"",size:"small"}},[e._v("其他")]):e._e(),1===a.logType?l("el-tag",{attrs:{type:"",size:"small"}},[e._v("新增")]):e._e(),2===a.logType?l("el-tag",{attrs:{type:"success",size:"small"}},[e._v("修改")]):e._e(),3===a.logType?l("el-tag",{attrs:{type:"warning",size:"small"}},[e._v("删除")]):e._e(),5===a.logType?l("el-tag",{attrs:{type:"danger",size:"small"}},[e._v("导出数据")]):e._e(),6===a.logType?l("el-tag",{attrs:{type:"info",size:"small"}},[e._v("导入模板")]):e._e(),7===a.logType?l("el-tag",{attrs:{type:"success",size:"small"}},[e._v("强退")]):e._e(),8===a.logType?l("el-tag",{attrs:{type:"warning",size:"small"}},[e._v("生成代码")]):e._e(),9===a.logType?l("el-tag",{attrs:{type:"danger",size:"small"}},[e._v("清空数据")]):e._e(),10===a.logType?l("el-tag",{attrs:{type:"info",size:"small"}},[e._v("设置状态")]):e._e()]}}],null,!0)}),l("el-table-column",{attrs:{prop:"operName",label:"操作人",align:"center","show-overflow-tooltip":"","min-width":"110"}}),l("el-table-column",{attrs:{prop:"operUrl",label:"请求URL",align:"center","min-width":"200","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"operIp",label:"请求IP",align:"center","min-width":"110","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"operLocation",label:"请求地址",align:"center","min-width":"110","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"requestMethod",label:"请求方式",align:"center","min-width":"110","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"note",label:"备注",align:"center","min-width":"200","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"status",label:"状态",sortable:"",align:"center","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[l("ele-dot",{attrs:{type:["success","danger"][t.status],ripple:0===t.status,text:["正常","禁用"][t.status]}})]}}],null,!0)}),l("el-table-column",{attrs:{prop:"spendTime",label:"耗时",sortable:"custom","min-width":"100","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e._v(e._s(l.spendTime/1e3)+"s")]}}],null,!0)}),l("el-table-column",{attrs:{prop:"createTime",label:"操作时间",sortable:"custom","min-width":"160","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[e._v(e._s(e._f("toDateString")(l.createTime)))]}}],null,!0)}),l("el-table-column",{attrs:{label:"操作",width:"90px",align:"center",resizable:!1,fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[l("el-link",{attrs:{icon:"el-icon-view",type:"primary",underline:!1},on:{click:function(t){return e.view(a)}}},[e._v("详情")])]}}],null,!0)})]}}])})],1),l("el-dialog",{attrs:{title:"详情",visible:e.showView,width:"600px","destroy-on-close":!0,"lock-scroll":!1},on:{"update:visible":function(t){e.showView=t}}},[l("el-form",{staticClass:"ele-form-detail",attrs:{"label-width":"82px",size:"mini"}},[l("el-row",{attrs:{gutter:15}},[l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"操作人:",prop:"operName"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operName)+"("+e._s(e.viewForm.username)+")")])]),l("el-form-item",{attrs:{label:"操作模块:",prop:"operModel"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operModel))])]),l("el-form-item",{attrs:{label:"操作时间:",prop:"createTime"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e._f("toDateString")(e.viewForm.createTime)))])]),l("el-form-item",{attrs:{label:"请求方式:",prop:"requestMethod"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.requestMethod))])])],1),l("el-col",{attrs:{sm:12}},[l("el-form-item",{attrs:{label:"IP地址:",prop:"ip"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operIp))])]),l("el-form-item",{attrs:{label:"操作功能:",prop:"operType"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operType))])]),l("el-form-item",{attrs:{label:"请求耗时:",prop:"spendTime"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.spendTime/1e3)+"s")])]),l("el-form-item",{attrs:{label:"请求状态:",prop:"status"}},[l("el-tag",{attrs:{type:["success","danger"][e.viewForm.status],size:"mini"}},[e._v(" "+e._s(["正常","异常"][e.viewForm.status])+" ")])],1)],1)],1),l("div",{staticStyle:{margin:"12px 0"}},[l("el-divider")],1),l("el-form-item",{attrs:{label:"请求地址:",prop:"url"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.url))])]),l("el-form-item",{attrs:{label:"调用方法:",prop:"operMethod"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operMethod))])]),l("el-form-item",{attrs:{label:"请求参数:",prop:"operParam"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.operParam))])]),l("el-form-item",{attrs:{label:"返回结果:",prop:"jsonResult"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.jsonResult))])]),l("el-form-item",{attrs:{label:"备注:",prop:"note"}},[l("div",{staticClass:"ele-text-secondary"},[e._v(e._s(e.viewForm.note))])])],1),l("div",{attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.showView=!1}}},[e._v("关闭")])],1)],1)],1)},r=[],o=l("5530"),s=l("2f62"),i={name:"SysOperRecord",data:function(){return{table:{url:"/operlog/index",where:{}},showView:!1,viewForm:{},daterange:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,l=new Date;l.setTime(l.getTime()-6048e5),e.$emit("pick",[l,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,l=new Date;l.setTime(l.getTime()-2592e6),e.$emit("pick",[l,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,l=new Date;l.setTime(l.getTime()-7776e6),e.$emit("pick",[l,t])}}]}}},computed:Object(o["a"])({},Object(s["b"])(["permission"])),methods:{view:function(e){this.viewForm=Object.assign({},e),this.showView=!0},onDateRangeChoose:function(){this.daterange?(this.table.where.createTimeStart=this.daterange[0],this.table.where.createTimeEnd=this.daterange[1]):(this.table.where.createTimeStart=null,this.table.where.createTimeEnd=null)},reload:function(){this.daterange=null,this.table.where={},this.$refs.table.reload()}}},n=i,c=l("0c7c"),p=Object(c["a"])(n,a,r,!1,null,"32f6c3e0",null);t["default"]=p.exports}}]);