"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[3146],{"./src/application/ApplicationSection.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},WithProperty:function(){return WithProperty},__namedExportsOrder:function(){return __namedExportsOrder}});var _Default$parameters,_Default$parameters2,_Default$parameters2$,_WithProperty$paramet,_WithProperty$paramet2,_WithProperty$paramet3,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_ApplicationSection__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/application/ApplicationSection.tsx")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Section/Application",component:_ApplicationSection__WEBPACK_IMPORTED_MODULE_1__.R};var Template=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ApplicationSection__WEBPACK_IMPORTED_MODULE_1__.R,(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},args))},Default=Template.bind({});Default.args={contactClickHandler:function contactClickHandler(){console.log("clicked")}};var WithProperty=Template.bind({});WithProperty.args=(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},Default.args),{},{propertyName:"Scholar's Quad",propertyEmail:"mail@renaissancerentals.com"}),Default.parameters=(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},Default.parameters),{},{docs:(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({originalSource:"args => <ApplicationSection {...args} />"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})}),WithProperty.parameters=(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},WithProperty.parameters),{},{docs:(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},null===(_WithProperty$paramet=WithProperty.parameters)||void 0===_WithProperty$paramet?void 0:_WithProperty$paramet.docs),{},{source:(0,_Users_asik_Renaissance_renaissance_component_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({originalSource:"args => <ApplicationSection {...args} />"},null===(_WithProperty$paramet2=WithProperty.parameters)||void 0===_WithProperty$paramet2||null===(_WithProperty$paramet3=_WithProperty$paramet2.docs)||void 0===_WithProperty$paramet3?void 0:_WithProperty$paramet3.source)})});var __namedExportsOrder=["Default","WithProperty"]},"./src/application/ApplicationSection.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{R:function(){return ApplicationSection_ApplicationSection}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),Captcha=__webpack_require__("./src/input/Captcha.tsx"),Api=__webpack_require__("./src/service/Api.ts"),Property=__webpack_require__("./src/property/data/Property.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ApplicationSection_ApplicationSection=function ApplicationSection(_ref){var contactClickHandler=_ref.contactClickHandler,propertyName=_ref.propertyName,propertyEmail=_ref.propertyEmail,_useState=(0,react.useState)("init"),_useState2=(0,slicedToArray.Z)(_useState,2),submissionState=_useState2[0],setSubmissionState=_useState2[1],_useState3=(0,react.useState)(""),_useState4=(0,slicedToArray.Z)(_useState3,2),errorMessage=_useState4[0],setErrorMessage=_useState4[1],_useState5=(0,react.useState)({subject:"Rental Application Request",property:propertyName||""}),_useState6=(0,slicedToArray.Z)(_useState5,2),rentalApplication=_useState6[0],setRentalApplication=_useState6[1],isEmpty=function isEmpty(field){return null==field||""===field};return(0,jsx_runtime.jsx)("section",{className:"section-application",children:(0,jsx_runtime.jsxs)("div",{className:"container",children:[(0,jsx_runtime.jsxs)("div",{className:"application-heading",children:[(0,jsx_runtime.jsx)("h2",{className:"heading",children:(0,jsx_runtime.jsx)("span",{className:"emphasized",children:"Rental Application Request Form"})}),(0,jsx_runtime.jsx)("p",{children:"If you have spoken to our team and are ready to apply, please submit a request for an application below. We'll email you a link to our free online application shortly."}),(0,jsx_runtime.jsxs)("p",{children:["If this is your first time contacting us, we recommend submitting an inquiry on our ",(0,jsx_runtime.jsx)(lib.Button,{variant:"transparent",onClick:contactClickHandler,children:"contact page"})," first."]})]}),(0,jsx_runtime.jsxs)("form",{onSubmit:function handleSubmit(event){event.preventDefault(),event.stopPropagation(),setSubmissionState("start"),!function isFormValid(){return null!=rentalApplication.captchaResponse&&null!=rentalApplication.property&&null!=rentalApplication.email&&null!=rentalApplication.name}()?(setSubmissionState("formInvalid"),setErrorMessage("Fill all the required fields")):(setSubmissionState("submitting"),function sendRentalApplicationRequest(message){return Api.Z.post("mail/application",message).then((function(response){return response.data}))}((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{to:propertyEmail||Property.h3[rentalApplication.property]})).then((function(response){setSubmissionState("complete")})).catch((function(e){e.response&&e.response.data?setErrorMessage(e.response.data.message):setErrorMessage("Rental Application Request Failed!"),setSubmissionState("submissionError")})))},children:[(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Name",name:"fullName",icon:"user",onChange:function onChange(e){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{name:e.target.value}))},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.name)?"Please provide Name":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Email",name:"email",icon:"mail",type:"email",onChange:function onChange(e){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{email:e.target.value}))},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.name)?"Please provide Email":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Phone",name:"phone",type:"number",icon:"phone",onChange:function onChange(e){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{phone:e.target.value}))}})}),propertyEmail?"":(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Select,{name:"neighborhood",options:Object.keys(Property.h3),label:"Community where you would like to apply",onChange:function onChange(e){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{property:e.target.value}))},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.property)?"Please select Neighborhood":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Textarea,{label:"Questions",name:"question",onChange:function onChange(e){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{questions:e.target.value}))}})}),(0,jsx_runtime.jsx)(Captcha.U,{setCaptchaResponse:function setCaptchaResponse(token){setRentalApplication((0,objectSpread2.Z)((0,objectSpread2.Z)({},rentalApplication),{},{captchaResponse:token}))},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.captchaResponse)?"Please check the captcha":""}),(0,jsx_runtime.jsxs)("div",{className:"form-element",children:["complete"===submissionState?(0,jsx_runtime.jsx)("p",{className:"text-success message",children:"Rental Application Request Complete!"}):"","submissionError"===submissionState||"formInvalid"===submissionState?(0,jsx_runtime.jsx)("p",{className:"text-danger message",children:errorMessage}):""]}),(0,jsx_runtime.jsxs)("div",{className:"form-element form-submit",children:[(0,jsx_runtime.jsx)(lib.Button,{variant:"primary",size:"large",type:"submit",disabled:"complete"===submissionState,children:"Submit"}),"submitting"===submissionState?(0,jsx_runtime.jsx)(lib.Spinner,{size:"small"}):""]})]})]})})};try{ApplicationSection_ApplicationSection.displayName="ApplicationSection",ApplicationSection_ApplicationSection.__docgenInfo={description:"",displayName:"ApplicationSection",props:{propertyName:{defaultValue:null,description:"",name:"propertyName",required:!1,type:{name:"string"}},propertyEmail:{defaultValue:null,description:"",name:"propertyEmail",required:!1,type:{name:"string"}},contactClickHandler:{defaultValue:null,description:"",name:"contactClickHandler",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/application/ApplicationSection.tsx#ApplicationSection"]={docgenInfo:ApplicationSection_ApplicationSection.__docgenInfo,name:"ApplicationSection",path:"src/application/ApplicationSection.tsx#ApplicationSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/input/Captcha.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{U:function(){return Captcha}});var slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),esm=__webpack_require__("./node_modules/react-google-recaptcha/lib/esm/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Captcha=function Captcha(_ref){var setCaptchaResponse=_ref.setCaptchaResponse,error=_ref.error,_useState=(0,react.useState)(!0),_useState2=(0,slicedToArray.Z)(_useState,2),isCaptchaValid=_useState2[0],setIsCaptchaValid=_useState2[1];return(0,jsx_runtime.jsxs)("div",{className:"captcha form-element",children:[(0,jsx_runtime.jsx)(esm.Z,{sitekey:"6LfibLwZAAAAALSCyZLLwPk-0hV5wmjCjE2F1MCZ",onChange:function handleCaptchaChange(value){setIsCaptchaValid(!1),null!==value&&(setIsCaptchaValid(!0),setCaptchaResponse(value))}}),(0,jsx_runtime.jsx)("p",{className:"text-danger",hidden:isCaptchaValid,children:"Please check the captcha"}),error&&""!==error?(0,jsx_runtime.jsx)("p",{className:"text-danger",children:error}):""]})};try{Captcha.displayName="Captcha",Captcha.__docgenInfo={description:"",displayName:"Captcha",props:{setCaptchaResponse:{defaultValue:null,description:"method to set captcha response token to compare with server side integration\n@param token :  a valid captcha response token",name:"setCaptchaResponse",required:!0,type:{name:"(token: string) => void"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/input/Captcha.tsx#Captcha"]={docgenInfo:Captcha.__docgenInfo,name:"Captcha",path:"src/input/Captcha.tsx#Captcha"})}catch(__react_docgen_typescript_loader_error){}},"./src/property/data/Property.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h3:function(){return PropertiesEmail},vx:function(){return LeasingOfficeType}});var LeasingOfficeType=function(LeasingOfficeType){return LeasingOfficeType.OFF_SITE="OFF_SITE",LeasingOfficeType.ON_SITE="ON_SITE",LeasingOfficeType}({}),PropertiesEmail={"Covenanter Hill":"covenanterhill@renaissancerentals.com",HighGrove:"meadowcreek@renaissancerentals.com","Huntington Gardens":"covenanterhill@renaissancerentals.com","Scholar's Quad":"quad@renaissancerentals.com","Scholar's Rock":"scholars@renaissancerentals.com","Scholar's Rooftop":"scholars@renaissancerentals.com","SummerHouse at Indiana":"summerhouse@renaissancerentals.com","Verona Park":"veronapark@renaissancerentals.com","Porto Flats":"veronapark@renaissancerentals.com","Cape Dutch Villas":"veronapark@renaissancerentals.com","Courtyard Villas":"veronapark@renaissancerentals.com"}},"./src/service/Api.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{f:function(){return RENAISSANCE_BASE_URL}});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js"),RENAISSANCE_BASE_URL="https://www.renaissancerentals.com/";__webpack_exports__.Z=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})}}]);