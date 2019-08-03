webpackJsonp([0],{AFXX:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("fZjL"),n=i.n(s),a=i("woOf"),l=i.n(a),o={name:"FieldField",props:{field:{type:Object,default:function(){}},editable:{type:Boolean,default:!1}},computed:{fieldPrep:function(){return void 0!==this.field?this.field:{}},documentTypes:function(){if(0!==this.$store.getters.GET_LIST.length)return this.$store.getters.GET_DD_DocumentTypes},locations:function(){if("undefined"!==this.$store.getters.GET_LIST)return this.$store.getters.GET_DD_Locations},divCodes:function(){if("undefined"!==this.$store.getters.GET_LIST)return this.$store.getters.GET_DD_DivCodes}},methods:{clearAction:function(){this.$store.dispatch("MUTATE_FIELD_RESET"),this.$store.dispatch("mutateNewUnid","@id@")},saveAction:function(e){var t,i=this,s=this.$store.getters.getCurrentUnid;t=l()({id:s},e),this.$store.dispatch("MUTATE_FIELD_SAVE",t).then(function(e){i.$store.dispatch("LOAD_DOCUMENTS",{PARAM:"Document",PARAM2:"Document_Data",PARAM3:"Document_SingleData",id:e})})}}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("Основная информация")]),e._v(" "),i("div",{staticClass:"field-container",attrs:{id:"RegInfo"}},[i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block field-block_half"},[i("div",{staticClass:"FiCon"},[i("input",{staticClass:"button",attrs:{id:"clear",type:"button",name:"clear",value:"Новый документ"},on:{click:function(t){return e.clearAction()}}})])]),e._v(" "),i("div",{staticClass:"field-block field-block_full"},[i("div",{staticClass:"field-block__wrapper align-right "},[i("span",[e._v("Начало работы: "),i("span"),e._v(e._s(e.fieldPrep.RegInfo))]),i("br"),e._v(" "),i("span",[e._v("Последние изменения:"),i("span"),e._v(e._s(e.fieldPrep.LastChangeInfo))]),i("br")])])]),e._v(" "),i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block"},[i("div",{staticClass:"field-block__wrapper"},[i("input",{staticClass:"field-block__wrapper_item boldIt",attrs:{id:"DocumentNum",type:"text",name:"DocumentNumField",readonly:""},domProps:{value:e.fieldPrep.DocNum}}),e._v(" "),i("div",{staticClass:"likePlaceholder likeLabel",attrs:{id:"FixTransform_DocumentNum"}},[e._v("\n            Номер документа\n          ")])])]),e._v(" "),i("div",{staticClass:"field-block"},[i("date-picker",{attrs:{required:!0,"date-format":"dd/mm/yy","rus-desc":"Дата создания","input-id":"DocumentDate"},on:{"update-date":function(t){return e.updateDate(t)}},model:{value:e.fieldPrep.DocumentDate,callback:function(t){e.$set(e.fieldPrep,"DocumentDate",t)},expression:"fieldPrep.DocumentDate"}})],1),e._v(" "),i("div",{staticClass:"field-block"},[i("select-block",{attrs:{"item-types":e.locations,required:!0,"rus-desc":"Локация","select-id":"Location"},model:{value:e.fieldPrep.Location,callback:function(t){e.$set(e.fieldPrep,"Location",t)},expression:"fieldPrep.Location"}})],1)]),e._v(" "),i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block"},[i("select-block",{attrs:{"item-types":e.divCodes,required:!0,"rus-desc":"DivCode","select-id":"DivCode"},model:{value:e.fieldPrep.DivCode,callback:function(t){e.$set(e.fieldPrep,"DivCode",t)},expression:"fieldPrep.DivCode"}})],1),e._v(" "),i("div",{staticClass:"field-block field-block_half"},[i("select-block",{attrs:{"item-types":e.documentTypes,required:!0,"rus-desc":"Вид документа","select-id":"DocumentType"},model:{value:e.fieldPrep.DocumentType,callback:function(t){e.$set(e.fieldPrep,"DocumentType",t)},expression:"fieldPrep.DocumentType"}})],1)]),e._v(" "),i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block field-block_full"},[i("fld-textarea",{attrs:{required:!0,"rus-desc":"Краткое содержание документа","input-id":"DocumentDescribe"},model:{value:e.fieldPrep.DocumentDescribe,callback:function(t){e.$set(e.fieldPrep,"DocumentDescribe",t)},expression:"fieldPrep.DocumentDescribe"}})],1)]),e._v(" "),i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block field-block_full"},[i("fld-textarea",{attrs:{"rus-desc":"Примечания","input-id":"Note"},model:{value:e.fieldPrep.Note,callback:function(t){e.$set(e.fieldPrep,"Note",t)},expression:"fieldPrep.Note"}})],1)]),e._v(" "),e.editable?i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block field-block_full"},[i("input",{staticClass:"button align-right",attrs:{type:"button",value:"сохранить"},on:{click:function(t){return e.saveAction(e.fieldPrep)}}})])]):i("div",{staticClass:"field-row "},[i("p",{staticClass:"align-right error"},[e._v("К сожалению, у вас недостаточно прав для этой операции")])])])])},staticRenderFns:[]},d=i("VU/8")(o,r,!1,null,null,null).exports,c={name:"FieldUpload",components:{"lds-loader":function(){return i.e(7).then(i.bind(null,"oqGE"))}},props:{dataFiles:{type:Array,default:function(){return[]}},editable:{type:Boolean,default:!1}},computed:{isFilesInDocument:function(){if(void 0!==this.dataFiles)return 0!==this.dataFiles.length}},methods:{uploadFile:function(){var e=this;this.$store.commit("CLEAR_ERROR");var t=document.querySelector("input[type=file]").files;0!==t.length?function(){for(var i=e.$store.getters.getCurrentUnid,s=e.$store.getters.GET_DataFiles,n=function(n){if(-1===(0!==s.length?s.findIndex(function(e){return e.FileName===t[n].name}):-1))try{var a=new FormData;a.append("documentFile",t[n]),a.append("id",i),e.$store.dispatch("MUTATE_FILE_UPLOAD",a).then(function(){e.$store.dispatch("MUTATE_FILE_LOADNEW",i)})}catch(t){e.$store.commit("SET_ERROR","Произошла ошибка "+t)}else e.$store.commit("SET_ERROR",t[n].name+" уже загружен.")},a=0;a<t.length;a++)n(a);t.value=""}():this.$store.commit("SET_INFO","Нет файлов для загрузки")},delDataFile:function(e){this.$store.commit("CLEAR_ERROR");var t=this.$store.getters.getCurrentUnid;this.$store.dispatch("MUTATE_FILE_DELETE",{id:e.target.id,documentId:t})}}},u={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("Вложения")]),e._v(" "),e.editable?i("div",{staticClass:"field-row"},[i("div",{staticClass:"field-block_full"},[i("div",{staticClass:"field-block__wrapper"},[i("input",{staticClass:"fileUpload field-block__wrapper_item",attrs:{type:"file",name:"documentFile",multiple:"multiple"}}),i("br"),e._v(" "),i("input",{staticClass:"button",attrs:{type:"button",name:"load__btnDeleteFile",value:"Загрузить файл"},on:{click:function(t){return e.uploadFile()}}})])]),e._v(" "),i("div",{staticClass:"field-block"}),e._v(" "),i("div",{staticClass:"field-block"})]):e._e(),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isFilesInDocument,expression:"isFilesInDocument"}],staticClass:"field-row"},[i("h3",[e._v("Загруженные файлы")]),e._v(" "),i("div",{staticClass:"tbl-container"},[e._m(0),e._v(" "),e._l(e.dataFiles,function(t,s){return i("div",{key:s,staticClass:"tbl-row"},[i("div",{staticClass:"tbl-3Block tbl-noCenterBlock"},[i("a",{staticClass:"myLink nowrapWhiteSpace",attrs:{href:t.linkToDoc}},[e._v(" "+e._s(t.FileName)+" ")])]),e._v(" "),i("div",{staticClass:"tbl-3Block",domProps:{textContent:e._s(t.UploadedInfo)}}),e._v(" "),i("div",{staticClass:"tbl-3Block "},["true"===t.onAction?[i("lds-loader")]:[i("input",{staticClass:"button",attrs:{disabled:"true"===t.IsDisabledBtnDel,id:t.DocFileId,type:"button",name:"load__btnDeleteFile",value:"Х",title:"Удалить"},on:{click:function(t){return e.delDataFile(t)}}})]],2)])})],2)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tbl-header"},[t("div",{staticClass:"tbl-3Block"},[this._v("Наименование документа")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Загружен")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Удалить")])])}]},v=i("VU/8")(c,u,!1,null,null,null).exports,f=i("7t+N"),_=i.n(f),p=(i("zOT7"),i("lbth")),m=i("i7p7");window.jQuery=_.a,window.$=_.a;var b={name:"FieldOnboarding",components:{"lds-loader":function(){return i.e(7).then(i.bind(null,"oqGE"))}},props:{onboardingPersons:{type:Array,default:function(){return[]}},editable:{type:Boolean,default:!1}},computed:{isOnboardingInDocument:function(){if(!this.$store.getters.isFieldLoading)return 0!==this.onboardingPersons.length},onboardingWhoChecked:{get:function(){return this.$store.getters.GET_ONBOARDING_CHECKED},set:function(e){this.$emit("input",e)}}},mounted:function(){var e=this;_()("#EmployeeToOnboarding").autocomplete({minLength:3,source:function(e,t){var i=Object(m.e)(e.term.toLowerCase());Object(p.a)("EmployeeEmail",i).then(function(e){t(_.a.map(e,function(e){var t=e.split(":");return{label:t[0],value:t[0],data:e}}))})},select:function(t,i){e.$store.dispatch("CLEAR_ERROR");var s=i.item.data.split(":");if(console.log("TCL: mounted -> employee",s[0]),-1===e.$store.getters.GET_Onboadring.findIndex(function(e){return e.PersonName===s[0]})){var n=e.$store.getters.getCurrentUnid;e.$store.dispatch("MUTATE_ONBOARDING_ADD",{PARAM3:"Document_Onboarding_Add",EmployeeName:s[0],EmployeeMail:s[1],documentId:n})}else e.$store.dispatch("SET_ERROR","Уже выбран для ознакомления");return _()(this).val(""),!1}})},methods:{check:function(e,t){var i=this.$store.getters.getCurrentUnid;this.$store.dispatch("MUTATE_ONBOARDING_UPDATE",{PARAM3:"Document_Onboarding_UpdateState",id:e.target.value,documentId:i,EmployeeName:t.PersonName})},delOnboardingPerson:function(e){var t=this.$store.getters.getCurrentUnid;this.$store.dispatch("MUTATE_ONBOARDING_DELETE",{PARAM:"Document",PARAM2:"Document_Onboarding_Change",PARAM3:"Document_Onboarding_Delete",id:e.target.id,documentId:t})}}},h={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("Ознакомление с документом")]),e._v(" "),i("div",{staticClass:"field-container"},[i("div",{staticClass:"field-row"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.editable,expression:"editable"}],staticClass:"field-block"},[i("div",{staticClass:"field-block__wrapper htooltip"},[i("input",{staticClass:"field-block__wrapper_item",attrs:{id:"EmployeeToOnboarding",type:"text",name:"EmployeeToOnboardingField",placeholder:"Поиск на англ/русском среди пользователей"}}),e._v(" "),i("br"),e._v(" "),i("span",[e._v("Вы можете добавить любое количество коллег в случае, когда им требуется ознакомиться с документом.")]),e._v(" "),i("div",{staticClass:"likePlaceholder likeLabel",attrs:{id:"fixTransform_EmployeeToOnboarding"}},[e._v(" "+e._s(e.isOnboardingInDocument?"Изменить список":"Добавить для ознакомпления")+" ")]),e._v(" "),i("div",{staticClass:"borderPseudo"}),e._v(" "),i("div",{attrs:{id:"line_EmployeeToOnboarding",name:"lineItTo"}})]),e._v(" "),i("br"),e._v(" "),i("br")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isOnboardingInDocument,expression:"isOnboardingInDocument"}],staticClass:"tbl-container"},[e._m(0),e._v(" "),e._l(e.onboardingPersons,function(t,s){return i("div",{key:s,staticClass:"tbl-row"},[i("div",{staticClass:"tbl-3Block tbl-noCenterBlock",domProps:{textContent:e._s(t.PersonName)}}),e._v(" "),i("div",{staticClass:"tbl-3Block tbl-noCenter"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.onboardingWhoChecked,expression:"onboardingWhoChecked"}],attrs:{disabled:"true"===t.IsDisabledChb,type:"checkbox",name:"chbApproverCheck"},domProps:{value:t.id,checked:Array.isArray(e.onboardingWhoChecked)?e._i(e.onboardingWhoChecked,t.id)>-1:e.onboardingWhoChecked},on:{click:function(i){return e.check(i,t)},change:function(i){var s=e.onboardingWhoChecked,n=i.target,a=!!n.checked;if(Array.isArray(s)){var l=t.id,o=e._i(s,l);n.checked?o<0&&(e.onboardingWhoChecked=s.concat([l])):o>-1&&(e.onboardingWhoChecked=s.slice(0,o).concat(s.slice(o+1)))}else e.onboardingWhoChecked=a}}}),e._v(" "+e._s(t.LastChanged)+"\n          ")]),e._v(" "),i("div",{staticClass:"tbl-3Block"},["true"===t.onAction?[i("lds-loader")]:[i("input",{staticClass:"tbl-3Block button",class:{disabled:"true"===t.IsDisabledBtnDel},attrs:{disabled:"true"===t.IsDisabledBtnDel,id:t.id,value:"Х",type:"button",name:"load__btnDeleteOnboardingPerson",title:"Удалить"},on:{click:function(t){return e.delOnboardingPerson(t)}}})]],2)])})],2)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tbl-header"},[t("div",{staticClass:"tbl-3Block"},[this._v("Имя")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Отметка об ознакомлении")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Удалить")])])}]},C=i("VU/8")(b,h,!1,null,null,null).exports;window.jQuery=_.a,window.$=_.a;var g={name:"FieldSigner",components:{"lds-loader":function(){return i.e(7).then(i.bind(null,"oqGE"))}},props:{signers:{type:Array,default:function(){return[]}},editable:{type:Boolean,default:!1}},computed:{isSignersInDocument:function(){if(!this.$store.getters.isFieldLoading)return 0!==this.signers.length}},mounted:function(){var e=this;_()("#SearchNewSigner").autocomplete({minLength:3,source:function(e,t){Object(p.a)("Employee",e.term).then(function(e){t(_.a.map(e,function(e){var t=e.split("-");return{label:t[0],value:t[0],data:e}}))})},select:function(t,i){e.$store.dispatch("CLEAR_ERROR");var s=i.item.data.split(":");if(console.log("TCL: mounted -> employee",s[0]),-1===e.$store.getters.GET_Signers.findIndex(function(e){return e.SignerName===s[0]})){var n=e.$store.getters.getCurrentUnid;e.$store.dispatch("MUTATE_SIGNER_ADD",{EmployeeName:s[0],documentId:n})}else e.$store.dispatch("SET_ERROR","Подписант уже выбран");return _()(this).val(""),!1}})},methods:{delSigner:function(e){var t=this.$store.getters.getCurrentUnid;this.$store.dispatch("MUTATE_SIGNER_DELETE",{id:e.target.id,documentId:t})}}},D={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("Подписант\n    "),e.isSignersInDocument?e._e():i("span",{staticClass:"error"},[e._v("\n      - Обязательно для заполнения\n    ")])]),e._v(" "),i("div",{staticClass:"field-container"},[i("div",{staticClass:"field-row"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.editable,expression:"editable"}],staticClass:"field-block"},[i("div",{staticClass:"field-block__wrapper htooltip"},[i("input",{staticClass:"field-block__wrapper_item",attrs:{id:"SearchNewSigner",type:"text",name:"SearchNewSignerField",placeholder:"Поиск на русском среди пользователей"}}),e._v(" "),i("br"),e._v(" "),i("span",[e._v("Вы можете добавить любое количество коллег в случае, когда их подпись требуется на документе.")]),e._v(" "),i("div",{staticClass:"likePlaceholder likeLabel",attrs:{id:"fixTransform_SearchNewSigner"}},[e._v(" "+e._s(e.isSignersInDocument?"Редактировать список":"Добавить утверждающих")+" ")]),e._v(" "),i("div",{staticClass:"borderPseudo"}),e._v(" "),i("div",{attrs:{id:"line_SearchNewSigner",name:"lineItTo"}})]),e._v(" "),i("br"),e._v(" "),i("br")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isSignersInDocument,expression:"isSignersInDocument"}],staticClass:"tbl-container"},[e._m(0),e._v(" "),e._l(e.signers,function(t,s){return i("div",{key:s,staticClass:"tbl-row"},[i("div",{staticClass:"tbl-3Block tbl-noCenterBlock",domProps:{textContent:e._s(t.SignerName)}}),e._v(" "),i("div",{staticClass:"tbl-3Block",domProps:{textContent:e._s(t.AddBy)}}),e._v(" "),i("div",{staticClass:"tbl-3Block"},["true"===t.onAction?[i("lds-loader")]:[i("input",{staticClass:"button",class:{disabled:"false"===t.IsNotDisabledBtnDel},attrs:{disabled:"false"===t.IsNotDisabledBtnDel,id:t.id,type:"button",name:"load__btnDeleteOrderTracker",value:"Х",title:"Удалить"},on:{click:function(t){return e.delSigner(t)}}})]],2)])})],2)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tbl-header"},[t("div",{staticClass:"tbl-3Block"},[this._v("ФИО")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Внесено")]),this._v(" "),t("div",{staticClass:"tbl-3Block"},[this._v("Удалить")])])}]},k={name:"FieldMain",components:{"field-field":d,"field-uploader":v,"field-onboadring":C,"field-signer":i("VU/8")(g,D,!1,null,null,null).exports},computed:{fieldPrep:function(){return this.$store.getters.isFieldLoading?this.$store.getters.defaultInfo:0===n()(this.$store.getters.documentInfo).length?this.$store.getters.defaultInfo:this.$store.getters.documentInfo},loading:function(){return this.$store.getters.isFieldLoading},isANewDoc:function(){return this.$store.getters.isANewDoc},canIEdit:function(){var e=void 0;if(!this.$store.getters.isFieldLoading)return e=this.$store.getters.documentInfo.Document.Field.CanIEditDocument,0===n()(this.$store.getters.documentInfo).length&&(e=this.$store.getters.defaultInfo.Document.defaultInfoField.CanIEditDocument),"true"===e}},created:function(){var e=this.$store.getters.getCurrentUnid;this.$store.dispatch("LOAD_DD_LIST"),this.$store.dispatch("LOAD_DOCUMENT_INFO",e)}},E={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"field-wrapper"},[e.loading?i("div",{staticClass:"bar-wrapper"},[i("div",{staticClass:"bar"})]):e._e(),e._v(" "),i("div",{class:{"field-wrapper__disabled":e.loading}}),e._v(" "),i("field-field",{attrs:{field:e.fieldPrep.Document.Field,editable:e.canIEdit}}),e._v(" "),e.isANewDoc?e._e():i("section",[i("field-uploader",{attrs:{"data-files":e.fieldPrep.DataFiles,editable:e.canIEdit}}),e._v(" "),i("field-signer",{attrs:{signers:e.fieldPrep.SignerData,editable:e.canIEdit}}),e._v(" "),i("field-onboadring",{attrs:{"onboarding-persons":e.fieldPrep.OnboardingData,editable:e.canIEdit}})],1)],1)},staticRenderFns:[]},$=i("VU/8")(k,E,!1,null,null,null);t.default=$.exports},Cdx3:function(e,t,i){var s=i("sB3e"),n=i("lktj");i("uqUo")("keys",function(){return function(e){return n(s(e))}})},fZjL:function(e,t,i){e.exports={default:i("jFbC"),__esModule:!0}},jFbC:function(e,t,i){i("Cdx3"),e.exports=i("FeBl").Object.keys},uqUo:function(e,t,i){var s=i("kM2E"),n=i("FeBl"),a=i("S82l");e.exports=function(e,t){var i=(n.Object||{})[e]||Object[e],l={};l[e]=t(i),s(s.S+s.F*a(function(){i(1)}),"Object",l)}}});
//# sourceMappingURL=0.843fbb71572eb6eb6e5b.js.map