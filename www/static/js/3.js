webpackJsonp([3],{158:function(e,o,t){t(181);var r=t(62)(t(171),t(191),null,null);e.exports=r.exports},159:function(e,o,t){"use strict";o.__esModule=!0;var r=t(160),n=function(e){return e&&e.__esModule?e:{default:e}}(r);o.default=n.default||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}},160:function(e,o,t){e.exports={default:t(161),__esModule:!0}},161:function(e,o,t){t(165),e.exports=t(9).Object.assign},162:function(e,o,t){"use strict";var r=t(65),n=t(163),s=t(164),i=t(66),a=t(64),l=Object.assign;e.exports=!l||t(36)(function(){var e={},o={},t=Symbol(),r="abcdefghijklmnopqrst";return e[t]=7,r.split("").forEach(function(e){o[e]=e}),7!=l({},e)[t]||Object.keys(l({},o)).join("")!=r})?function(e,o){for(var t=i(e),l=arguments.length,c=1,d=n.f,f=s.f;l>c;)for(var p,u=a(arguments[c++]),m=d?r(u).concat(d(u)):r(u),w=m.length,A=0;w>A;)f.call(u,p=m[A++])&&(t[p]=u[p]);return t}:l},163:function(e,o){o.f=Object.getOwnPropertySymbols},164:function(e,o){o.f={}.propertyIsEnumerable},165:function(e,o,t){var r=t(35);r(r.S+r.F,"Object",{assign:t(162)})},166:function(e,o,t){"use strict";var r=t(67),n=t.n(r),s=t(12),i=t.n(s);t.d(o,"a",function(){return a});var a=function(e,o,t){return new n.a(function(r,n){if(301===o.code)return i()({method:"post",url:"/home/public/checklogin",headers:{"x-access-refresh-token":e.getRefreshToken,"x-access-token":e.getToken},type:"json"}).then(function(o){0===o.code?e.setToken({token:o.data.token,refreshToken:o.data.refresh_token}).then(function(){t()}):(302===o.code&&e.$router.replace("/login"),n(o))});n(o)})}},171:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=t(159),n=t.n(r),s=t(63),i=t(166);o.default={name:"SETTING",data:function(){var e=this;return{info:{isNotice:!1,username:"",name:"",mobile:"",address:"",loading:!1,msg:"",type:"error"},password:{isNotice:!1,oldpassword:"",loading:!1,newpassword:"",repassword:"",msg:"",type:"error"},rules1:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},rules2:{oldpassword:[{required:!0,message:"请输入登录密码",trigger:"blur"}],newpassword:[{required:!0,validator:function(o,t,r){""===t?r(new Error("请输入密码")):(""!==e.password.repassword&&e.$refs.newForm.validateField("repassword"),r())},trigger:"blur"}],repassword:[{required:!0,validator:function(o,t,r){""===t?r(new Error("请再次输入密码")):t!==e.password.newpassword?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}]}}},created:function(){this.getSelf()},computed:n()({},t.i(s.b)(["getToken","getRefreshToken"])),watch:{"info.isNotice":function(e){var o=this;e&&(this.info.loading=!1,setTimeout(function(){o.info.isNotice=!1},2e3))},"password.isNotice":function(e){var o=this;e&&(this.password.loading=!1,setTimeout(function(){o.password.isNotice=!1},2e3))}},methods:n()({},t.i(s.c)(["setToken","getSelfInfo","editSelfInfo","resetSelfPassword"]),{getSelf:function(){var e=this;this.getSelfInfo({token:this.getToken}).then(function(o){e.info.username=o.data.username,e.info.name=o.data.name,e.info.mobile=o.data.mobile,e.info.address=o.data.address}).catch(function(o){t.i(i.a)(e,o,e.getSelf)})},handleSubmit1:function(){var e=this;this.$refs.form.validate(function(o){if(!o||e.info.loading!==!1)return console.log("error submit!!"),!1;e.editInfo()})},editInfo:function(){var e=this;this.info.loading=!0,this.editSelfInfo({token:this.getToken,name:this.info.name,address:this.info.address,mobile:this.info.mobile}).then(function(o){e.info.type="success",e.info.isNotice=!0,e.info.msg="修改个人信息成功"}).catch(function(o){t.i(i.a)(e,o,e.editInfo).catch(function(o){e.info.type="error",e.info.isNotice=!0,e.info.msg=o.msg})})},handleSubmit2:function(){var e=this;this.$refs.newForm.validate(function(o){if(!o||e.password.loading!==!1)return console.log("error submit!!"),!1;e.resetpasswd()})},resetpasswd:function(){var e=this;this.password.loading=!0,this.resetSelfPassword({token:this.getToken,password:this.password.oldpassword,repassword:this.password.repassword}).then(function(o){e.password.type="success",e.password.isNotice=!0,e.password.msg="修改密码成功"}).catch(function(o){t.i(i.a)(e,o,e.resetpasswd).catch(function(o){e.info.type="error",e.info.isNotice=!0,e.info.msg=o.msg})})}})}},174:function(e,o,t){o=e.exports=t(153)(),o.push([e.i,".setting{padding:50px 20px}.adderror{line-height:normal;opacity:1}.errorMove-enter-active{-webkit-animation:errorMove-in .5s;animation:errorMove-in .5s}.errorMove-leave-active{-webkit-animation:errorMove-out .5s;animation:errorMove-out .5s}@-webkit-keyframes errorMove-in{0%{opacity:0}to{opacity:1}}@keyframes errorMove-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes errorMove-out{0%{opacity:1}to{opacity:0}}@keyframes errorMove-out{0%{opacity:1}to{opacity:0}}","",{version:3,sources:["E:/Project/thinkjs-vue-spa-admin/webpack/src/components/Setting.vue"],names:[],mappings:"AACA,SACI,iBAAmB,CACtB,AACD,UACI,mBAAoB,AACpB,SAAW,CACd,AACD,wBACI,mCAAoC,AAC5B,0BAA4B,CACvC,AACD,wBACI,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,gCACA,GACQ,SAAW,CAClB,AACD,GACQ,SAAW,CAClB,CACA,AACD,wBACA,GACQ,SAAW,CAClB,AACD,GACQ,SAAW,CAClB,CACA,AACD,iCACA,GACQ,SAAW,CAClB,AACD,GACQ,SAAW,CAClB,CACA,AACD,yBACA,GACQ,SAAW,CAClB,AACD,GACQ,SAAW,CAClB,CACA",file:"Setting.vue",sourcesContent:["\n.setting {\n    padding: 50px 20px;\n}\n.adderror {\n    line-height: normal;\n    opacity: 1;\n}\n.errorMove-enter-active {\n    -webkit-animation: errorMove-in .5s;\n            animation: errorMove-in .5s;\n}\n.errorMove-leave-active {\n    -webkit-animation: errorMove-out .5s;\n            animation: errorMove-out .5s;\n}\n@-webkit-keyframes errorMove-in {\nfrom {\n        opacity: 0;\n}\nto {\n        opacity: 1;\n}\n}\n@keyframes errorMove-in {\nfrom {\n        opacity: 0;\n}\nto {\n        opacity: 1;\n}\n}\n@-webkit-keyframes errorMove-out {\nfrom {\n        opacity: 1;\n}\nto {\n        opacity: 0;\n}\n}\n@keyframes errorMove-out {\nfrom {\n        opacity: 1;\n}\nto {\n        opacity: 0;\n}\n}\n"],sourceRoot:""}])},181:function(e,o,t){var r=t(174);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(154)("6cafcdd8",r,!0)},191:function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"setting"},[t("el-form",{ref:"form",attrs:{model:e.info,"label-width":"100px",rules:e.rules1}},[t("el-form-item",{attrs:{label:"姓名",prop:"name"}},[t("el-input",{model:{value:e.info.name,callback:function(o){e.info.name=o},expression:"info.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{disabled:!0},model:{value:e.info.username,callback:function(o){e.info.username=o},expression:"info.username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系方式"}},[t("el-input",{model:{value:e.info.mobile,callback:function(o){e.info.mobile=o},expression:"info.mobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系地址"}},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:e.info.address,callback:function(o){e.info.address=o},expression:"info.address"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",loading:e.info.loading},on:{click:e.handleSubmit1}},[e._v("修改个人信息")])],1),e._v(" "),t("el-form-item",[t("transition",{attrs:{name:"errorMove"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.info.isNotice,expression:"info.isNotice"}],staticClass:"adderror"},[t("el-alert",{attrs:{title:e.info.msg,closable:!1,type:e.info.type,"show-icon":""}})],1)])],1)],1),e._v(" "),t("el-form",{ref:"newForm",attrs:{model:e.password,"label-width":"100px",rules:e.rules2}},[t("el-form-item",{attrs:{label:"旧密码",prop:"oldpassword"}},[t("el-input",{attrs:{type:"password"},model:{value:e.password.oldpassword,callback:function(o){e.password.oldpassword=o},expression:"password.oldpassword"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新密码",prop:"newpassword"}},[t("el-input",{attrs:{type:"password"},model:{value:e.password.newpassword,callback:function(o){e.password.newpassword=o},expression:"password.newpassword"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"重复密码",prop:"repassword"}},[t("el-input",{attrs:{type:"password"},model:{value:e.password.repassword,callback:function(o){e.password.repassword=o},expression:"password.repassword"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"success",loading:e.password.loading},on:{click:e.handleSubmit2}},[e._v("修改登录密码")])],1),e._v(" "),t("el-form-item",[t("transition",{attrs:{name:"errorMove"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.password.isNotice,expression:"password.isNotice"}],staticClass:"adderror"},[t("el-alert",{attrs:{title:e.password.msg,closable:!1,type:e.password.type,"show-icon":""}})],1)])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=3.js.map