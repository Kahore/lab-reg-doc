webpackJsonp([6],{JZtl:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),i={name:"App",components:{"modal-info":function(){return n.e(2).then(n.bind(null,"VnEc"))},"how-to-use":function(){return n.e(4).then(n.bind(null,"8haG"))},"field-main":function(){return n.e(0).then(n.bind(null,"AFXX"))},"table-main":function(){return n.e(1).then(n.bind(null,"MPLU"))},"modal-error":function(){return n.e(3).then(n.bind(null,"14nA"))}}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container",attrs:{id:"container"}},[e("div",{attrs:{id:"center"}},[e("div",{attrs:{id:"content"}},[e("span",{attrs:{id:"ctl00_Content_ctl00_PageText"}},[e("modal-info"),this._v(" "),this._m(0),this._v(" "),e("how-to-use"),this._v(" "),e("field-main"),this._v(" "),e("table-main"),this._v(" "),e("modal-error")],1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"liftUp",attrs:{onclick:"$(window).scrollTop(0)"}},[e("span",{staticClass:"liftUp-msg"},[this._v("Go up!")])])}]};var r=n("VU/8")(i,a,!1,function(t){n("JZtl")},null,null).exports,u=n("wtEF"),c=n("7t+N"),s=n.n(c);n("zOT7");function l(){for(var t=document.getElementsByTagName("textarea"),e=0;e<t.length;e+=1)m(t[e])}function d(t){t.target.nextSibling.nextSibling.classList.add("likeLabel"),""===t.target.value&&"blur"===t.type&&t.target.nextSibling.nextSibling.classList.remove("likeLabel"),l(),t.target.parentNode.lastElementChild.classList.toggle("borderPseudoLine")}function f(t){""!==t.value&&t.nextSibling.nextSibling.classList.add("likeLabel")}function m(t){t.style.height="24px",t.value.length>1&&(t.style.height=t.scrollHeight+"px",0===t.scrollHeight&&(t.style.height="24px"))}window.jQuery=s.a,window.$=s.a;var p={props:{dateFormat:{type:String,default:"dd/mm/yy"},value:{type:[String,Number],default:""},inputId:{type:[String,Number],default:""},rusDesc:{type:String,default:""},required:{type:Boolean,default:!1}},computed:{inputVal:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},mounted:function(){var t=this,e=document.getElementById(t.inputId);s()(e).datepicker({dateFormat:"dd/mm/yy",firstDay:1,changeMonth:!0,changeYear:!0,onSelect:function(n){t.$emit("input",n),""!==n&&f(e)}}),f(e),s()(e).removeClass("hasDatepicker")},updated:function(){f(document.getElementById(this.inputId))},beforeDestroy:function(){s()(this.$el).datepicker("hide").datepicker("destroy")},methods:{toggleLabel:function(t){d(t)}}},D={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-block__wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputVal,expression:"inputVal"}],staticClass:"field-block__wrapper_item",attrs:{id:t.inputId,required:t.required,name:"Field_"+t.inputId,autocomplete:"off"},domProps:{value:t.inputVal},on:{focus:function(e){return t.toggleLabel(e)},blur:function(e){return t.toggleLabel(e)},input:function(e){e.target.composing||(t.inputVal=e.target.value)}}}),t._v(" "),n("div",{staticClass:"likePlaceholder",domProps:{textContent:t._s(t.rusDesc)}}),t._v(" "),n("div",{staticClass:"borderPseudo"})])},staticRenderFns:[]},g=n("VU/8")(p,D,!1,null,null,null).exports,_={props:{rusDesc:{type:String,default:""},value:{type:[String,Number],default:""},inputId:{type:[String,Number],default:""},isReadonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1}},computed:{inputVal:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},created:function(){var t=this;this.handler=function(e){t.$emit("keyup",e)},window.addEventListener("keyup",this.handler)},updated:function(){f(document.getElementById(this.inputId))},mounted:function(){f(document.getElementById(this.inputId))},methods:{toggleLabel:function(t){d(t)},searchData:function(){}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-block__wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputVal,expression:"inputVal"}],staticClass:"field-block__wrapper_item",attrs:{id:t.inputId,readonly:t.isReadonly,required:t.required,name:"Field_"+t.inputId},domProps:{value:t.inputVal},on:{focus:function(e){return t.toggleLabel(e)},blur:function(e){return t.toggleLabel(e)},keyup:function(e){return t.searchData(e)},input:function(e){e.target.composing||(t.inputVal=e.target.value)}}}),t._v(" "),n("div",{staticClass:"likePlaceholder",domProps:{textContent:t._s(t.rusDesc)}}),t._v(" "),n("div",{staticClass:"borderPseudo"})])},staticRenderFns:[]},E=n("VU/8")(_,h,!1,null,null,null).exports,I={props:{rusDesc:{type:String,default:""},value:{type:[String,Number],default:""},inputId:{type:[String,Number],default:""},required:{type:Boolean,default:!1}},computed:{inputVal:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},created:function(){var t=this;this.handler=function(e){t.$emit("keyup",e)},window.addEventListener("keyup",this.handler)},updated:function(){f(document.getElementById(this.inputId)),l()},mounted:function(){f(document.getElementById(this.inputId)),l()},methods:{toggleLabel:function(t){d(t),l()},searchData:function(){}}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-block__wrapper"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.inputVal,expression:"inputVal"}],staticClass:"field-block__wrapper_item",attrs:{id:t.inputId,required:t.required,name:"Field_"+t.inputId,row:"1"},domProps:{value:t.inputVal},on:{focus:function(e){return t.toggleLabel(e)},blur:function(e){return t.toggleLabel(e)},keyup:function(e){return t.searchData(e)},input:function(e){e.target.composing||(t.inputVal=e.target.value)}}}),t._v(" "),n("div",{staticClass:"likePlaceholder ",domProps:{textContent:t._s(t.rusDesc)}}),t._v(" "),n("div",{staticClass:"borderPseudo"})])},staticRenderFns:[]},v=n("VU/8")(I,T,!1,null,null,null).exports,O={props:{rusDesc:{type:String,default:""},value:{type:[String,Number],default:""},selectId:{type:[String,Number],default:""},itemTypes:{type:[String,Array],default:""},required:{type:Boolean,default:!1}},computed:{currentItem:{get:function(){return this.value},set:function(t){void 0!==this.itemTypesPars&&this.$emit("input",t)}},itemTypesPars:function(){if(void 0!==this.itemTypes){var t=this.itemTypes;return t=t.substring(0,t.length-1).split(";")}return""}},updated:function(){f(document.getElementById(this.selectId))},mounted:function(){f(document.getElementById(this.selectId))},methods:{toggleLabel:function(t){d(t)}}},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-block__wrapper"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.currentItem,expression:"currentItem"}],staticClass:"field-block__wrapper_item",attrs:{id:t.selectId,required:t.required,name:"Field_"+t.selectId},on:{focus:function(e){return t.toggleLabel(e)},blur:function(e){return t.toggleLabel(e)},change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.currentItem=e.target.multiple?n:n[0]}}},[t.currentItem?n("option",{domProps:{selected:!0}},[t._v(" "+t._s(t.currentItem)+" ")]):t._e(),t._v(" "),n("option"),t._v(" "),t._l(t.itemTypesPars,function(e,o){return n("option",{key:o,domProps:{value:e}},[t._v("\n      "+t._s(e)+"\n    ")])})],2),t._v(" "),n("div",{staticClass:"likePlaceholder",domProps:{textContent:t._s(t.rusDesc)}}),t._v(" "),n("div",{staticClass:"borderPseudo"})])},staticRenderFns:[]},A=n("VU/8")(O,b,!1,null,null,null).exports;window.jQuery=s.a,window.$=s.a,o.a.config.productionTip=!1,o.a.component("date-picker",g),o.a.component("fld-input",E),o.a.component("fld-textarea",v),o.a.component("select-block",A),new o.a({el:"#app",store:u.a,components:{App:r},template:"<App/>"})},i7p7:function(t,e,n){"use strict";n.d(e,"b",function(){return a}),n.d(e,"a",function(){return r}),e.d=function(t){return t=(t=t.replace(/\u2022/g,"-")).replace(/\t/g,"    "),t=JSON.parse(t)},e.c=function(t){void 0!==t.Document.Field.DocumentDescribe&&(t.Document.Field.DocumentDescribe=t.Document.Field.DocumentDescribe.replace(/\\n/g,"\n"));void 0!==t.Document.Field.Note&&(t.Document.Field.Note=t.Document.Field.Note.replace(/\\n/g,"\n"));void 0===t.DataFiles&&(t.DataFiles=[]);void 0===t.SignerData&&(t.SignerData=[]);void 0===t.OnboardingData&&(t.OnboardingData=[]);void 0===t.OnboardingWhoChecked&&(t.OnboardingWhoChecked=[]);return t},e.e=function(t){for(var e="",n="",o=0;o<t.length;o++)void 0!=u[t[o]]?n==u[t[o]]&&" "===n||(e+=u[t[o]],n=u[t[o]]):(e+=t[o],n=t[o]);var i=e.split(" ")[0];return e=i};var o=n("7t+N"),i=n.n(o),a=0,r=50;window.jQuery=i.a,window.$=i.a;var u={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"kh","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ъ":"","ы":"y","ь":"","э":"e","ю":"u","я":"ya"};i()(function(){i()(".liftUp").fadeOut()}),i()(function(){i()(window).scroll(function(){0!==i()(this).scrollTop()?i()(".liftUp").fadeIn():i()(".liftUp").fadeOut()})})},lbth:function(t,e,n){"use strict";e.a=function(t,e){return console.log("TCL: autocmpl -> term",e),new i.a(function(e){e("EmployeeEmail"===t?["Ammarah_Woodcock:Ammarah.Woodcock@example.com","Cindy_Lott:Cindy.Lott@example.com","Mikey_Simon:Mikey.Simon@example.com","Raheem_Wolf:Raheem.Wolf@example.com","Derek_Redfern:Derek.Redfern@example.com","Stephanie_Corona:Stephanie.Corona@example.com"]:["Elissa Freeman","Ahsan Moran","Fatma Paterson","Killian Medina","Samad Wilks","Aadil Jacobson","Woody Swift","Brendon Riddle","James Gilmore"])})},e.b=function(t,e,n,o){return new i.a(function(i,a){try{c.a.dispatch("CLEAR_ERROR"),l(o),r.a.ajax({url:t,type:e,contentType:"application/json; charset=UTF-8",data:n,complete:function(t){if(0!==t.responseText.length&&null!==t.responseText){var e=Object(s.d)(t.responseText);void 0!==e.ErrorMsg?(c.a.commit("SET_ERROR",e.ErrorMsg),a(e.ErrorMsg),l(o)):(i(e),l(o))}else i(),l(o)},error:function(t){c.a.commit("SET_ERROR",t.statusText),a(t.statusText),l(o)}})}catch(t){c.a.commit("SET_ERROR",t),a(t),l(o)}})},e.c=function(t,e){return new i.a(function(n,o){r.a.ajax({url:t+e,method:"DELETE",success:function(){n()},error:function(t){o(t),c.a.commit("SET_ERROR",t)}})})};var o=n("//Fk"),i=n.n(o),a=n("7t+N"),r=n.n(a),u=n("zOT7"),c=(n.n(u),n("wtEF")),s=n("i7p7");function l(t){void 0!==t&&c.a.commit(t)}window.jQuery=r.a,window.$=r.a},wtEF:function(t,e,n){"use strict";var o=n("7+uW"),i=n("NYxO"),a=n("//Fk"),r=n.n(a),u=n("Dd8w"),c=n.n(u),s=n("mvHQ"),l=n.n(s),d=n("7t+N"),f=n.n(d),m=n("i7p7"),p=n("lbth");function D(){return new Date(Date.now()).toLocaleString().split(",")[0]+new Date(Date.now()).toLocaleString().split(",")[1]}function g(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,function(t){return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)})}var _={state:function(){return{DocumentInfo:{Field:{}},DefaultInfo:{Document:{Field:{id:"@id@",DocNum:"",DocumentDate:"",DocumentType:"",Location:"",DivCode:"",DocumentDescribe:"",Note:"",RegInfo:"",LastChangeInfo:"",CanIEditDocument:"true"}},DataFiles:[],SignerData:[],OnboardingData:[],OnboardingWhoChecked:[]},Lists:[],loadingField:!1,attachmentListOnAction:!1,signerListOnAction:!1}},getters:{documentInfo:function(t){return t.DocumentInfo},defaultInfo:function(t){return t.DefaultInfo},isFieldLoading:function(t){return t.loadingField},GET_DataFiles:function(t){if(void 0!==t.DocumentInfo.DataFiles)return t.DocumentInfo.DataFiles},GET_Signers:function(t){if(void 0!==t.DocumentInfo.SignerData)return t.DocumentInfo.SignerData},GET_Onboadring:function(t){if(void 0!==t.DocumentInfo.OnboardingData)return t.DocumentInfo.OnboardingData},GET_ONBOARDING_CHECKED:function(t){return t.DocumentInfo.OnboardingWhoChecked},GET_LIST:function(t){return t.Lists},GET_DD_DocumentTypes:function(t){if(0!==t.Lists.length)return t.Lists.DocumentTypes},GET_DD_Locations:function(t){if(0!==t.Lists.length)return t.Lists.Locations},GET_DD_DivCodes:function(t){if(0!==t.Lists.length)return t.Lists.DivCodes}},mutations:{MUTATE_FIELD_RESET:function(t){t.DocumentInfo=JSON.parse(l()(t.DefaultInfo)),window.history.pushState("","","/")},InProgress_Field:function(t){t.loadingField=!t.loadingField},OnProgress_Attachment:function(t){t.attachmentListOnAction=!t.attachmentListOnAction},OnProgress_Attachment_Single:function(t,e){var n=t.DocumentInfo.DataFiles.findIndex(function(t){return t.DocFileId===e.DocFileId});"true"===t.DocumentInfo.DataFiles[n].onAction?t.DocumentInfo.DataFiles[n].onAction="false":t.DocumentInfo.DataFiles[n].onAction="true"},OnProgress_Signer:function(t){t.signerListOnAction=!t.signerListOnAction},OnProgress_Signer_Single:function(t,e){var n=t.DocumentInfo.SignerData.findIndex(function(t){return t.id===e.id});-1!==n&&("true"===t.DocumentInfo.SignerData[n].onAction?t.DocumentInfo.SignerData[n].onAction="false":t.DocumentInfo.SignerData[n].onAction="true")},OnProgress_Onboarding_Single:function(t,e){var n=t.DocumentInfo.OnboardingData.findIndex(function(t){return t.ID===e.OnboardingID});-1!==n&&("true"===t.DocumentInfo.OnboardingData[n].onAction?t.DocumentInfo.OnboardingData[n].onAction="false":t.DocumentInfo.OnboardingData[n].onAction="true")},LOAD_DD_LIST:function(t,e){void 0!==e&&(t.Lists=e)},loadField:function(t,e){if(void 0!==e.Document&&(t.DocumentInfo=e,void 0!==e.Document.Field&&void 0!==e.Document.Field.id&&window.history.pushState("","","./?id="+e.Document.Field.id),void 0!==e.OnboardingData))for(var n=0;n<e.OnboardingData.length;n++)"approved"===e.OnboardingData[n].OnboardingState&&(t.DocumentInfo.OnboardingWhoChecked=t.DocumentInfo.OnboardingWhoChecked.concat(e.OnboardingData[n].id))},MUTATE_FIELD_SAVE:function(t,e){if(t.DocumentInfo.Field=c()({},t.DocumentInfo.Field,{LastChangeInfo:e.LastChangeInfo}),void 0===t.DocumentInfo.Field.RegInfo||""===t.DocumentInfo.Field.RegInfo){window.history.pushState("","","./?id="+e.id);var n={RegInfo:e.RegInfo,DocNum:e.DocNum};t.DocumentInfo.Field=c()({},t.DocumentInfo.Field,n)}},MUTATE_FILE_LOADNEW:function(t,e){for(var n=function(n){-1===t.DocumentInfo.DataFiles.findIndex(function(t){return t.DocFileId===e[n].DocFileId})&&t.DocumentInfo.DataFiles.unshift(e[n])},o=0;o<e.length;o++)n(o)},MUTATE_FILE_DELETE:function(t,e){var n=t.DocumentInfo.DataFiles.findIndex(function(t){return t.DocFileId===e.DocFileId});-1!==n&&t.DocumentInfo.DataFiles.splice(n,1)},MUTATE_SIGNER_ADD:function(t,e){t.DocumentInfo.SignerData.unshift(e)},MUTATE_SIGNER_DELETE:function(t,e){var n=t.DocumentInfo.SignerData.findIndex(function(t){return t.id===e.id});-1!==n&&t.DocumentInfo.SignerData.splice(n,1)},MUTATE_ONBOARDING_ADD:function(t,e){t.DocumentInfo.OnboardingData.unshift(e)},MUTATE_ONBOARDING_UPDATE:function(t,e){var n=t.DocumentInfo.OnboardingData.findIndex(function(t){return t.ID===e.ID});if(t.DocumentInfo.OnboardingData.splice(n,1),t.DocumentInfo.OnboardingData.splice(n,0,e),"approved"===e.OnboardingState)t.DocumentInfo.OnboardingWhoChecked.push(e.ID);else{var o=t.DocumentInfo.OnboardingWhoChecked.indexOf(e.ID);t.DocumentInfo.OnboardingWhoChecked.splice(o,1)}},MUTATE_ONBOARDING_DELETE:function(t,e){var n=t.DocumentInfo.OnboardingData.findIndex(function(t){return t.ID===e.OnboardingID});-1!==n&&t.DocumentInfo.OnboardingData.splice(n,1)}},actions:{MUTATE_FIELD_RESET:function(t){(0,t.commit)("MUTATE_FIELD_RESET")},LOAD_DD_LIST:function(t){var e=t.commit;Object(p.b)("http://localhost:3000/ListData","GET","").then(function(t){e("LOAD_DD_LIST",t)})},LOAD_DOCUMENT_INFO:function(t,e){var n=t.commit;n("CLEAR_ERROR");var o="http://localhost:3000/fieldFiller";return"@id@"!==e&&(o="http://localhost:3000/docInfo/"+e),new r.a(function(t){Object(p.b)(o,"GET","","InProgress_Field").then(function(e){var o=e;o=Object(m.c)(o),n("loadField",o),void 0!==o.Document.Field?void 0!==o.Document.Field.id&&(n("mutateNewUnid",o.Document.Field.id),window.history.pushState("","","./?id="+o.Document.Field.id)):n("MUTATE_FIELD_RESET"),t(o)})})},MUTATE_FIELD_SAVE:function(t,e){var n=t.commit;return new r.a(function(t,o){var i="@id@"===e.id,a=i?"POST":"PUT",r=i?"http://localhost:3000/documents/":"http://localhost:3000/documents/"+e.id,u=function(t){if("@id@"===t.id){var e=Math.floor(89*Math.random())+10,n=Math.floor(998*Math.random())+1;t.id=g(),t.DocNum="NK19/RegN"+e+"-"+n,t.RegInfo=D()+" Test User Name_Surn",t.LastChangeInfo=D()+" Test User Name_Surn"}else t.LastChangeInfo=D()+" Test User Name_Surn";return t}(e),s={id:u.id,Document:{Field:c()({},u)}};s=l()(s),f.a.ajax({url:r,type:a,data:s,contentType:"application/json; charset=UTF-8",complete:function(e){var o=JSON.parse(e.responseText);t(o.id),n("mutateNewUnid",o.id),n("MUTATE_FIELD_SAVE",o.Document.Field)},error:function(t){o(),n("SET_ERROR",t.statusText)}})})},MUTATE_FILE_UPLOAD:function(t){(0,t.commit)("SET_INFO","Same action as signer, but with downloading link"),document.querySelector("input[type=file]").value=""},MUTATE_FILE_LOADNEW:function(t,e){var n=t.commit;n("OnProgress_Attachment"),setTimeout(function(){var t={PARAM:"Document",PARAM2:"Document_UploadingFile_Load",id:e};Object(p.b)("@Nav_Backend@","GET",t,"OnProgress_Attachment").then(function(t){n("MUTATE_FILE_LOADNEW",t)},function(t){n("SET_ERROR",t)})},2e3)},MUTATE_FILE_DELETE:function(t,e){var n=t.commit;n("OnProgress_Attachment_Single",e);var o={PARAM:"Document",PARAM2:"Document_UploadingFile_Change",PARAM3:"Document_UploadingFile_Delete",id:e.DocFileId,documentId:e.id};Object(p.b)("@Nav_Backend@","POST",o).then(function(){n("OnProgress_Attachment_Single",e),n("MUTATE_FILE_DELETE",e)},function(t){n("SET_ERROR",t)})},MUTATE_SIGNER_ADD:function(t,e){var n=t.commit,o={id:g(),documentId:e.documentId,SignerName:e.EmployeeName,onAction:"false",AddBy:D()+" Test User Name_Surn"},i=l()(o);Object(p.b)("http://localhost:3000/SignerData","POST",i,"InProgress_Field").then(function(){n("MUTATE_SIGNER_ADD",o)})},MUTATE_SIGNER_DELETE:function(t,e){var n=t.commit;n("OnProgress_Signer_Single",e),setTimeout(function(){Object(p.c)("http://localhost:3000/SignerData/",e.id).then(function(){n("OnProgress_Signer_Single",e),n("MUTATE_SIGNER_DELETE",e)})},2e3)},MUTATE_ONBOARDING_ADD:function(t,e){var n=t.commit,o={id:g(),documentId:e.documentId,PersonName:e.EmployeeName,IsDisabledBtnDel:"false",IsDisabledChb:"false",onAction:"false",OnboardingState:"pendingApproveByUser",LastChanged:""},i=l()(o);Object(p.b)("http://localhost:3000/OnboardingData","POST",i,"InProgress_Field").then(function(){n("MUTATE_ONBOARDING_ADD",o)})},MUTATE_ONBOARDING_UPDATE:function(t,e){var n=t.commit,o={id:e.id,documentId:e.documentId,PersonName:e.EmployeeName,IsDisabledBtnDel:"true",IsDisabledChb:"true",onAction:"false",OnboardingState:"approved",LastChanged:D()+" Test User Name_Surn"},i=l()(o);setTimeout(function(){f.a.ajax({url:"http://localhost:3000/OnboardingData/"+e.id,method:"PUT",contentType:"application/json; charset=UTF-8",data:i,success:function(){n("MUTATE_ONBOARDING_UPDATE",o)}})},2e3)},MUTATE_ONBOARDING_DELETE:function(t,e){var n=t.commit;n("OnProgress_Onboarding_Single",e),setTimeout(function(){Object(p.c)("http://localhost:3000/OnboardingData/",e.id).then(function(){n("OnProgress_Onboarding_Single",e),n("MUTATE_ONBOARDING_DELETE",e)})},2e3)}}},h={state:function(){return{documents:[],loading:!1,allElemIsLoadNow:!1}},getters:{GET_DOCUMENTS:function(t){return t.documents},isTableLoading:function(t){return t.loading},IsAllElemIsLoadNow:function(t){return t.allElemIsLoadNow}},mutations:{LOAD_DOCUMENTS:function(t,e){if("Document_SingleData"===e.blockType){var n=t.documents.findIndex(function(t){return t.id===e.resp[0].id});-1!==n?(t.documents.splice(n,1),t.documents.splice(n,0,e.resp[0])):t.documents.unshift(e.resp[0])}else"Document_MultiData"===e.blockType&&(t.documents=t.documents.concat(e.resp))},InProgress_Table:function(t){t.loading=!t.loading},AllElemIsLoadNow:function(t){t.allElemIsLoadNow=!t.allElemIsLoadNow}},actions:{LOAD_DOCUMENTS:function(t,e){var n=t.commit;n("InProgress_Table");var o="http://localhost:3000/documents?_sort=Document.Field.DocumentDate&_order=desc";"Document_MultiData"!==e.PARAM3&&(o="http://localhost:3000/documents/"+e.id),setTimeout(function(){f.a.ajax({url:o,type:"GET",complete:function(t){var o=Object(m.d)(t.responseText);if(void 0===o[0]){var i=[];i.push(o),o=i}n("LOAD_DOCUMENTS",{blockType:e.PARAM3,resp:o}),n("InProgress_Table"),"Document_MultiData"===e.PARAM3&&o.length<m.a&&n("AllElemIsLoadNow")},error:function(t){n("SET_ERROR",t.statusText),n("InProgress_Table")}})},2e3)}}};var E={state:function(){return{id:(t=new URL(window.location.href).searchParams.get("id"),null===t&&(t="@id@"),t),error_Msg:"",info_Msg:""};var t},getters:{getCurrentUnid:function(t){return t.id},isANewDoc:function(t){return"@id@"===t.id},GET_ERROR:function(t){return null===t.error_Msg?"":t.error_Msg},GET_INFO:function(t){return t.info_Msg}},mutations:{mutateNewUnid:function(t,e){t.id=e},SET_ERROR:function(t,e){t.error_Msg=e},CLEAR_ERROR:function(t){t.error_Msg=null},SET_INFO:function(t,e){t.info_Msg=e,setTimeout(function(){t.info_Msg=""},5e3)},CLEAR_INFO:function(t){t.info_Msg=null}},actions:{mutateNewUnid:function(t,e){(0,t.commit)("mutateNewUnid",e)},SET_ERROR:function(t,e){(0,t.commit)("SET_ERROR",e)},CLEAR_ERROR:function(t){(0,t.commit)("CLEAR_ERROR")},SET_INFO:function(t,e){(0,t.commit)("SET_INFO",e)},CLEAR_INFO:function(t){(0,t.commit)("CLEAR_INFO")}}};n.d(e,"a",function(){return I}),o.a.use(i.a);var I=new i.a.Store({modules:{shared:E,info:_,table:h}})}},["NHnr"]);
//# sourceMappingURL=app.d92437d6758e8c4e5859.js.map