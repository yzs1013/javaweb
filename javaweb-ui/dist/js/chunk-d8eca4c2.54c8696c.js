(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8eca4c2"],{"282a":function(t,e,a){"use strict";a("7cb8")},"7cb8":function(t,e,a){},"99c0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ele-body"},[a("el-card",{attrs:{shadow:"never","body-style":"padding:0;"}},[a("div",{staticClass:"ele-cell ele-cell-align-top ele-user-message"},[a("el-menu",{attrs:{"default-active":t.active,mode:t.mode},on:{select:t.query}},[a("el-menu-item",{attrs:{index:"0"}},[a("span",[t._v("全部消息")]),t.allUnReadNum?a("el-badge",{staticClass:"ele-badge-static",attrs:{value:t.allUnReadNum}}):t._e()],1),a("el-menu-item",{attrs:{index:"1"}},[a("span",[t._v("系统通知")]),t.unReadNum1?a("el-badge",{staticClass:"ele-badge-static",attrs:{value:t.unReadNum1}}):t._e()],1),a("el-menu-item",{attrs:{index:"2"}},[a("span",[t._v("用户私信")]),t.unReadNum2?a("el-badge",{staticClass:"ele-badge-static",attrs:{value:t.unReadNum2}}):t._e()],1),a("el-menu-item",{attrs:{index:"3"}},[a("span",[t._v("代办事项")]),t.unReadNum3?a("el-badge",{staticClass:"ele-badge-static",attrs:{value:t.unReadNum3}}):t._e()],1)],1),a("div",{staticClass:"ele-cell-content"},[a("div",{staticClass:"ele-table-tool"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:t.read}},[t._v("标记已读")]),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:t.readAll}},[t._v("全部已读")]),a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(e){return t.remove()}}},[t._v("删除消息")])],1),a("ele-data-table",{ref:"table",attrs:{data:t.data,choose:t.choose,height:"calc(100vh - 265px)",border:!1},on:{"update:choose":function(e){t.choose=e}},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.index;return[a("el-table-column",{attrs:{type:"selection",width:"45",align:"center",fixed:"left"}}),a("el-table-column",{attrs:{type:"index",index:i,width:"45",align:"center",fixed:"left","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"title",label:"标题内容","show-overflow-tooltip":"","min-width":"110"}}),a("el-table-column",{attrs:{prop:"time",label:"时间","show-overflow-tooltip":"",width:"140px",align:"center"}}),a("el-table-column",{attrs:{label:"状态",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",{class:["ele-text-danger","ele-text-info"][i.state]},[t._v(t._s(["未读","已读"][i.state]))])]}}],null,!0)}),a("el-table-column",{attrs:{label:"操作",width:"140px",align:"center",resizable:!1,fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-link",{attrs:{icon:"el-icon-view",type:"primary",underline:!1},on:{click:function(e){return t.view(i)}}},[t._v("查看")]),a("el-popconfirm",{staticClass:"ele-action",attrs:{title:"确定要删除此消息吗？"},on:{onConfirm:function(e){return t.remove(i)}}},[a("el-link",{attrs:{slot:"reference",icon:"el-icon-delete",type:"danger",underline:!1},slot:"reference"},[t._v("删除")])],1)]}}],null,!0)})]}}])})],1)],1)])],1)},n=[],l=(a("4de4"),a("4160"),a("c975"),a("a434"),a("159b"),{name:"UserMessage",data:function(){return{active:"0",data:[],choose:[],allData:[{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:0},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:0},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:0},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:0},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"你有两条任务待完成，不要忘了哦~",type:3,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:0},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:0},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:0},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"Jasmine给你发来了一条私信",type:2,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:0},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:0},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1},{title:"JavaWeb新版本发布，欢迎体验",type:1,time:"2020-07-24 11:35",state:1}]}},computed:{mode:function(){return this.$store.state.theme.screenWidth<768?"horizontal":"vertical"},allUnReadNum:function(){return this.allData.filter((function(t){return 0===t.state})).length},unReadNum1:function(){return this.allData.filter((function(t){return 0===t.state&&1===t.type})).length},unReadNum2:function(){return this.allData.filter((function(t){return 0===t.state&&2===t.type})).length},unReadNum3:function(){return this.allData.filter((function(t){return 0===t.state&&3===t.type})).length}},mounted:function(){this.query()},methods:{query:function(t){var e=this;this.active=t||"0","0"===this.active?this.data=this.allData:this.data=this.allData.filter((function(t){return String(t.type)===e.active}))},view:function(t){console.log(t),this.$message("点击了查看")},remove:function(t){var e=this;if(t)this.data.splice(this.data.indexOf(t),1),this.$message({type:"success",message:"删除成功"});else{if(0===this.choose.length)return this.$message.error("请至少选择一条数据");this.$confirm("确定要删除选中的消息吗?","提示",{type:"warning"}).then((function(){e.choose.forEach((function(t){e.data.splice(e.data.indexOf(t),1)})),e.$message({type:"success",message:"删除成功"})})).catch((function(){return 0}))}},read:function(){var t=this;if(0===this.choose.length)return this.$message.error("请至少选择一条数据");this.choose.forEach((function(e){t.data[t.data.indexOf(e)].state=1}))},readAll:function(){this.data.forEach((function(t){t.state=1}))}}}),s=l,r=(a("282a"),a("0c7c")),o=Object(r["a"])(s,i,n,!1,null,"a281314a",null);e["default"]=o.exports}}]);