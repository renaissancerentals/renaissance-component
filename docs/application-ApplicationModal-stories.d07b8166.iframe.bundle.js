"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[5422],{"./src/application/ApplicationModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ApplicationModal_stories});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),ApplicationSection=__webpack_require__("./src/application/ApplicationSection.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ApplicationModal_ApplicationModal=_ref=>{let{showApplicationModal,applicationModalCloseHandler,propertyName,propertyEmail,contactClickHandler}=_ref;return(0,jsx_runtime.jsx)("div",{className:"div-contact--modal",children:(0,jsx_runtime.jsxs)(lib.Modal,{show:showApplicationModal,setShow:applicationModalCloseHandler,children:[(0,jsx_runtime.jsx)("div",{className:"close",onClick:applicationModalCloseHandler,children:(0,jsx_runtime.jsx)(lib.Icon,{name:"close",size:"medium"})}),(0,jsx_runtime.jsx)(ApplicationSection.R,{contactClickHandler,propertyEmail,propertyName})]})})};try{ApplicationModal_ApplicationModal.displayName="ApplicationModal",ApplicationModal_ApplicationModal.__docgenInfo={description:"",displayName:"ApplicationModal",props:{showApplicationModal:{defaultValue:null,description:"",name:"showApplicationModal",required:!0,type:{name:"boolean"}},applicationModalCloseHandler:{defaultValue:null,description:"",name:"applicationModalCloseHandler",required:!0,type:{name:"() => void"}},propertyName:{defaultValue:null,description:"",name:"propertyName",required:!1,type:{name:"string"}},propertyEmail:{defaultValue:null,description:"",name:"propertyEmail",required:!1,type:{name:"string"}},contactClickHandler:{defaultValue:null,description:"",name:"contactClickHandler",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/application/ApplicationModal.tsx#ApplicationModal"]={docgenInfo:ApplicationModal_ApplicationModal.__docgenInfo,name:"ApplicationModal",path:"src/application/ApplicationModal.tsx#ApplicationModal"})}catch(__react_docgen_typescript_loader_error){}const ApplicationModal_stories={title:"Section/Application Modal",component:ApplicationModal_ApplicationModal},Default=(args=>{const[showApplicationModal,setShowApplicationModal]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ApplicationModal_ApplicationModal,{showApplicationModal,applicationModalCloseHandler:()=>setShowApplicationModal(!1),contactClickHandler:()=>console.log("contact clicked")}),(0,jsx_runtime.jsx)(lib.Button,{onClick:()=>{setShowApplicationModal(!0)},children:"Application"})]})}).bind({});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  const [showApplicationModal, setShowApplicationModal] = useState(false);\n  return <>\n            <ApplicationModal showApplicationModal={showApplicationModal} applicationModalCloseHandler={() => setShowApplicationModal(false)} contactClickHandler={() => console.log("contact clicked")} />\n            <Button onClick={() => {\n      setShowApplicationModal(true);\n    }}>Application</Button>\n        </>;\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/application/ApplicationSection.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>ApplicationSection_ApplicationSection});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),Captcha=__webpack_require__("./src/input/Captcha.tsx"),Api=__webpack_require__("./src/service/Api.ts");var Property=__webpack_require__("./src/property/data/Property.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ApplicationSection_ApplicationSection=_ref=>{let{contactClickHandler,propertyName,propertyEmail}=_ref;const[submissionState,setSubmissionState]=(0,react.useState)("init"),[errorMessage,setErrorMessage]=(0,react.useState)(""),[rentalApplication,setRentalApplication]=(0,react.useState)({subject:"Rental Application Request",property:propertyName||""}),isEmpty=field=>null==field||""===field;return(0,jsx_runtime.jsx)("section",{className:"section-application",children:(0,jsx_runtime.jsxs)("div",{className:"container",children:[(0,jsx_runtime.jsxs)("div",{className:"application-heading",children:[(0,jsx_runtime.jsx)("h2",{className:"heading",children:(0,jsx_runtime.jsx)("span",{className:"emphasized",children:"Rental Application Request Form"})}),(0,jsx_runtime.jsx)("p",{children:"If you are ready to apply for your next apartment, please fill out the short form below (Applications are always FREE)."}),(0,jsx_runtime.jsxs)("p",{children:["If you have general inquiries or would like more information about our apartments, please use our ",(0,jsx_runtime.jsx)(lib.Button,{variant:"transparent",onClick:contactClickHandler,children:"CONTACT FORM"}),"."]})]}),(0,jsx_runtime.jsxs)("form",{onSubmit:event=>{var message;event.preventDefault(),event.stopPropagation(),setSubmissionState("start"),null!=rentalApplication.captchaResponse&&null!=rentalApplication.property&&null!=rentalApplication.email&&null!=rentalApplication.name?(setSubmissionState("submitting"),(message={...rentalApplication,currentPage:window.location.href},Api.Z.post("mail/application",message).then((response=>response.data))).then((response=>{setSubmissionState("complete")})).catch((e=>{e.response&&e.response.data?setErrorMessage(e.response.data.message):setErrorMessage("Rental Application Request Failed!"),setSubmissionState("submissionError")}))):(setSubmissionState("formInvalid"),setErrorMessage("Fill all the required fields"))},children:[(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Name",name:"fullName",icon:"user",onChange:e=>{setRentalApplication({...rentalApplication,name:e.target.value})},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.name)?"Please provide Name":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Email",name:"email",icon:"mail",type:"email",onChange:e=>{setRentalApplication({...rentalApplication,email:e.target.value})},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.name)?"Please provide Email":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Phone",name:"phone",type:"number",icon:"phone",onChange:e=>{setRentalApplication({...rentalApplication,phone:e.target.value})}})}),propertyEmail?"":(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Select,{name:"neighborhood",options:Object.keys(Property.h3),label:"Community where you would like to apply",onChange:e=>{setRentalApplication({...rentalApplication,property:e.target.value})},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.property)?"Please select Neighborhood":"",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Address or Floor plan you are applying for",name:"address",icon:"map",onChange:e=>{setRentalApplication({...rentalApplication,address:e.target.value})}})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Textarea,{label:"Additional Information or Questions",name:"question",onChange:e=>{setRentalApplication({...rentalApplication,questions:e.target.value})}})}),(0,jsx_runtime.jsx)(Captcha.U,{setCaptchaResponse:token=>{setRentalApplication({...rentalApplication,captchaResponse:token})},error:"formInvalid"===submissionState&&isEmpty(rentalApplication.captchaResponse)?"Please check the captcha":""}),(0,jsx_runtime.jsxs)("div",{className:"form-element",children:["complete"===submissionState?(0,jsx_runtime.jsx)("p",{className:"text-success message",children:"Rental Application Request Complete!"}):"","submissionError"===submissionState||"formInvalid"===submissionState?(0,jsx_runtime.jsx)("p",{className:"text-danger message",children:errorMessage}):""]}),(0,jsx_runtime.jsxs)("div",{className:"form-element form-submit",children:[(0,jsx_runtime.jsx)(lib.Button,{variant:"primary",size:"large",type:"submit",disabled:"complete"===submissionState,children:"Submit"}),"submitting"===submissionState?(0,jsx_runtime.jsx)(lib.Spinner,{size:"small"}):""]})]})]})})};try{ApplicationSection_ApplicationSection.displayName="ApplicationSection",ApplicationSection_ApplicationSection.__docgenInfo={description:"",displayName:"ApplicationSection",props:{propertyName:{defaultValue:null,description:"",name:"propertyName",required:!1,type:{name:"string"}},propertyEmail:{defaultValue:null,description:"",name:"propertyEmail",required:!1,type:{name:"string"}},contactClickHandler:{defaultValue:null,description:"",name:"contactClickHandler",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/application/ApplicationSection.tsx#ApplicationSection"]={docgenInfo:ApplicationSection_ApplicationSection.__docgenInfo,name:"ApplicationSection",path:"src/application/ApplicationSection.tsx#ApplicationSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/input/Captcha.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>Captcha});var react=__webpack_require__("./node_modules/react/index.js"),esm=__webpack_require__("./node_modules/react-google-recaptcha/lib/esm/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Captcha=_ref=>{let{setCaptchaResponse,error}=_ref;const[isCaptchaValid,setIsCaptchaValid]=(0,react.useState)(!0);return(0,jsx_runtime.jsxs)("div",{className:"captcha form-element",children:[(0,jsx_runtime.jsx)(esm.Z,{sitekey:"6LfibLwZAAAAALSCyZLLwPk-0hV5wmjCjE2F1MCZ",onChange:value=>{setIsCaptchaValid(!1),null!==value&&(setIsCaptchaValid(!0),setCaptchaResponse(value))}}),(0,jsx_runtime.jsx)("p",{className:"text-danger",hidden:isCaptchaValid,children:"Please check the captcha"}),error&&""!==error?(0,jsx_runtime.jsx)("p",{className:"text-danger",children:error}):""]})};try{Captcha.displayName="Captcha",Captcha.__docgenInfo={description:"",displayName:"Captcha",props:{setCaptchaResponse:{defaultValue:null,description:"method to set captcha response token to compare with server side integration\n@param token :  a valid captcha response token",name:"setCaptchaResponse",required:!0,type:{name:"(token: string) => void"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/input/Captcha.tsx#Captcha"]={docgenInfo:Captcha.__docgenInfo,name:"Captcha",path:"src/input/Captcha.tsx#Captcha"})}catch(__react_docgen_typescript_loader_error){}},"./src/property/data/Property.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h3:()=>PropertiesEmail,vx:()=>LeasingOfficeType});let LeasingOfficeType=function(LeasingOfficeType){return LeasingOfficeType.OFF_SITE="OFF_SITE",LeasingOfficeType.ON_SITE="ON_SITE",LeasingOfficeType}({});const PropertiesEmail={"Covenanter Hill":"covenanterhill@renaissancerentals.com",HighGrove:"meadowcreek@renaissancerentals.com","Huntington Gardens":"covenanterhill@renaissancerentals.com","Scholar's Quad":"quad@renaissancerentals.com","Scholar's Rock":"scholars@renaissancerentals.com","Scholar's Rooftop":"scholars@renaissancerentals.com","SummerHouse at Indiana":"summerhouse@renaissancerentals.com","Townhomes At MeadowCreek":"meadowcreek@renaissancerentals.com","Verona Park":"veronapark@renaissancerentals.com",Other:"inquiries@renaissancerentals.com"}},"./src/service/Api.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>RENAISSANCE_BASE_URL});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const RENAISSANCE_BASE_URL="http://localhost:8084/",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})}}]);