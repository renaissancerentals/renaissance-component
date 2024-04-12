"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[201],{"./src/contact/ContactSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Long:()=>Long,WithContactNumber:()=>WithContactNumber,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _ContactSection__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contact/ContactSection.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Section/Contact",component:_ContactSection__WEBPACK_IMPORTED_MODULE_1__.U},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ContactSection__WEBPACK_IMPORTED_MODULE_1__.U,{...args}),Default=Template.bind({});Default.args={subject:"Test email from ui.renaissancerentals.com"};const WithContactNumber=Template.bind({});WithContactNumber.args={...Default.args,contactNumber:"8123456789"};const Long=Template.bind({});Long.args={subject:"Test email from ui.renaissancerentals.com",variant:"long"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  return <ContactSectionV1 {...args} />;\n}",...Default.parameters?.docs?.source}}},WithContactNumber.parameters={...WithContactNumber.parameters,docs:{...WithContactNumber.parameters?.docs,source:{originalSource:"args => {\n  return <ContactSectionV1 {...args} />;\n}",...WithContactNumber.parameters?.docs?.source}}},Long.parameters={...Long.parameters,docs:{...Long.parameters?.docs,source:{originalSource:"args => {\n  return <ContactSectionV1 {...args} />;\n}",...Long.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithContactNumber","Long"]},"./node_modules/ga-gtag/lib/index.js":(__unused_webpack_module,exports)=>{exports.N9=exports.ZP=void 0;exports.N9=function install(trackingId){var additionalConfigInfo=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!document.getElementById("ga-gtag")){var head=document.head,script=document.createElement("script");script.id="ga-gtag",script.async=!0,script.src="https://www.googletagmanager.com/gtag/js?id=".concat(trackingId),head.insertBefore(script,head.firstChild),window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config",trackingId,additionalConfigInfo)}};var gtag=function gtag(){window.dataLayer.push(arguments)};var _default=gtag;exports.ZP=_default},"./src/contact/ContactSection.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>ContactSection});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),Floorplan=__webpack_require__("./src/floorplan/data/Floorplan.ts"),Captcha=__webpack_require__("./src/input/Captcha.tsx"),Api=__webpack_require__("./src/service/Api.ts"),ga_gtag_lib=__webpack_require__("./node_modules/ga-gtag/lib/index.js");const sendToConversionTracking=trackingId=>{(0,ga_gtag_lib.N9)("UA-142676339-1");try{console.log("sending tracking id to google:"+trackingId),(0,ga_gtag_lib.ZP)("event","conversion",{send_to:trackingId})}catch(error){console.log("Error from the trackerPageView => ",error)}};var Utils=__webpack_require__("./src/utils/Utils.ts"),Property=__webpack_require__("./src/property/data/Property.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ContactSection=_ref=>{let{subject,to,conversionTrackingId1,conversionTrackingId2,contactNumber,variant}=_ref;const[submitted,setSubmitted]=(0,react.useState)(!1),[additionalInfoClicked,setAdditionalInfoClicked]=(0,react.useState)(!1),[isSubmitting,setIsSubmitting]=(0,react.useState)(!1),[submissionError,setSubmissionError]=(0,react.useState)(!1),[submissionErrorMessage,setSubmissionErrorMessage]=(0,react.useState)("Message Failed!"),[submissionComplete,setSubmissionComplete]=(0,react.useState)(!1),[captchaResponse,setCaptchaResponse]=(0,react.useState)(""),[lowerRent,setLowerRent]=(0,react.useState)(0),[upperRent,setUpperRent]=(0,react.useState)(4e3);return(0,jsx_runtime.jsx)("section",{className:"section-contact",children:(0,jsx_runtime.jsxs)("div",{className:"container",children:[(0,jsx_runtime.jsx)("h2",{className:"heading",children:(0,jsx_runtime.jsx)("span",{className:"emphasized",children:"Contact Us"})}),contactNumber?(0,jsx_runtime.jsxs)("p",{className:"information",children:["Text or call us at ",(0,jsx_runtime.jsx)("a",{href:"tel:"+contactNumber,children:(0,Utils.un)(contactNumber)})]}):"",(0,jsx_runtime.jsx)("p",{className:"information",children:"Fill the form below to get in touch with a member of our professional leasing team. We can't wait to meet you!"}),(0,jsx_runtime.jsxs)("form",{onSubmit:event=>{const form=event.currentTarget;if(event.preventDefault(),event.stopPropagation(),form.checkValidity()&&""!==captchaResponse){setSubmitted(!0);const mailObject={to,subject,captchaResponse,name:form.fullName.value,phone:form.phone.value,email:form.email.value,emailPreferred:form.emailPreferred.checked,phonePreferred:form.phonePreferred.checked,textPreferred:form.textPreferred.checked,question:form.question.value,currentPage:window.location.href,communities:Object.keys(Property.h3).filter((value=>form[value]&&form[value].checked)).join(", ")},mailWithAddition={...mailObject,additionalInfo:{bedrooms:form.bedrooms?form.bedrooms.value:null,moveInDate:form.moveInDate?form.moveInDate.value:null,amenities:form.amenities?form.amenities.value:null,pets:form.pets?form.pets.value:null,floorPlan:form.floorPlan?form.floorPlan.value:null,hearAboutUs:form.hearAboutUs?form.hearAboutUs.value:null,lowerRent,upperRent}};setIsSubmitting(!0),(message=additionalInfoClicked?mailWithAddition:mailObject,Api.Z.post("mail/contact",message).then((response=>response.data))).then((()=>{setSubmissionComplete(!0)})).catch((e=>{e.response&&e.response.data&&setSubmissionErrorMessage(e.response.data.message),setSubmissionError(!0)})).finally((()=>{conversionTrackingId1&&sendToConversionTracking(conversionTrackingId1),conversionTrackingId2&&sendToConversionTracking(conversionTrackingId2),setIsSubmitting(!1)}))}var message},children:[(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Name",name:"fullName",icon:"user",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Email",name:"email",icon:"mail",type:"email",required:!0})}),(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Phone",name:"phone",type:"number",icon:"phone",required:!0})}),(0,jsx_runtime.jsxs)("div",{className:"checkboxes form-element",children:[(0,jsx_runtime.jsx)(lib.Checkbox,{label:"Phone OK",name:"phonePreferred"}),(0,jsx_runtime.jsx)(lib.Checkbox,{label:"Text OK",name:"textPreferred"}),(0,jsx_runtime.jsx)(lib.Checkbox,{label:"Email OK",name:"emailPreferred",checked:!0})]}),"long"===variant?(0,jsx_runtime.jsxs)("div",{className:"checkboxes form-element",children:[(0,jsx_runtime.jsx)("label",{children:"Which community are you interested in?"}),Object.keys(Property.h3).map((value=>(0,jsx_runtime.jsx)(lib.Checkbox,{label:value,name:value},value)))]}):"","long"===variant?(0,jsx_runtime.jsxs)("p",{className:"additional-info form-element",onClick:()=>{setAdditionalInfoClicked(!additionalInfoClicked)},children:[(0,jsx_runtime.jsxs)("b",{children:[additionalInfoClicked?(0,jsx_runtime.jsx)(lib.Icon,{name:"minus"}):(0,jsx_runtime.jsx)(lib.Icon,{name:"plus"})," Tap here to provide additional information about what you are looking for in your home."]})," (This info is very helpful to us, but not required.)"]}):"",additionalInfoClicked?(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Bedrooms Requested",name:"bedrooms",icon:"inbox",type:"number"})}),(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Desired Move-In Date",name:"moveInDate",icon:"calendar",type:"date",placeholder:"format: mm/dd/yyyy"})}),(0,jsx_runtime.jsxs)("div",{className:"form-element optional price-range",children:[(0,jsx_runtime.jsx)("label",{children:"Desired Price Range"}),(0,jsx_runtime.jsx)(lib.RangeSlider,{min:Floorplan.xt,max:Floorplan.Dp,minValue:lowerRent,maxValue:upperRent,setMinValue:setLowerRent,setMaxValue:setUpperRent,children:(0,jsx_runtime.jsx)("i",{children:"click and drag to adjust price range"})})]}),(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Which amenities and features are most important to you in your next home?",name:"amenities",icon:"type"})}),(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Please list any pets that will be living with you",name:"pets",icon:"type"})}),(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"Is there a particular floor plan style that you are most interested in? (Please list all that apply)",name:"floorPlan",icon:"type"})}),(0,jsx_runtime.jsx)("div",{className:"form-element optional",children:(0,jsx_runtime.jsx)(lib.Input,{label:"How did you hear about us?",name:"hearAboutUs",icon:"type"})})]}):"",(0,jsx_runtime.jsx)("div",{className:"form-element",children:(0,jsx_runtime.jsx)(lib.Textarea,{label:"Question",name:"question",required:!0})}),(0,jsx_runtime.jsx)(Captcha.U,{setCaptchaResponse}),(0,jsx_runtime.jsxs)("div",{className:"form-element",children:[submissionComplete?(0,jsx_runtime.jsx)("p",{className:"text-success message",children:"Message Sent!"}):"",submissionError?(0,jsx_runtime.jsx)("p",{className:"text-danger message",children:submissionErrorMessage}):""]}),(0,jsx_runtime.jsxs)("div",{className:"form-element form-submit",children:[(0,jsx_runtime.jsx)(lib.Button,{variant:"primary",size:"large",type:"submit",disabled:submitted,children:"Submit"}),isSubmitting?(0,jsx_runtime.jsx)(lib.Spinner,{size:"small"}):""]})]})]})})};try{ContactSection.displayName="ContactSection",ContactSection.__docgenInfo={description:"",displayName:"ContactSection",props:{subject:{defaultValue:null,description:"",name:"subject",required:!1,type:{name:"string"}},to:{defaultValue:null,description:"",name:"to",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"long"'}]}},contactNumber:{defaultValue:null,description:"",name:"contactNumber",required:!1,type:{name:"string"}},conversionTrackingId1:{defaultValue:null,description:"",name:"conversionTrackingId1",required:!1,type:{name:"string"}},conversionTrackingId2:{defaultValue:null,description:"",name:"conversionTrackingId2",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contact/ContactSection.tsx#ContactSection"]={docgenInfo:ContactSection.__docgenInfo,name:"ContactSection",path:"src/contact/ContactSection.tsx#ContactSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/floorplan/data/Floorplan.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Dp:()=>MAX_RENT,Nb:()=>FloorplanStyle,U2:()=>UtilityType,xt:()=>MIN_RENT});const MIN_RENT=0,MAX_RENT=4e3;let FloorplanStyle=function(FloorplanStyle){return FloorplanStyle.STUDIO="STUDIO",FloorplanStyle.APARTMENT="APARTMENT",FloorplanStyle.TOWN_HOME="TOWN_HOME",FloorplanStyle.SINGLE_FAMILY="SINGLE_FAMILY",FloorplanStyle.GARAGE="GARAGE",FloorplanStyle}({}),UtilityType=function(UtilityType){return UtilityType.RESIDENT_UTILITY="RESIDENT_UTILITY",UtilityType.INCLUDED_UTILITY="INCLUDED_UTILITY",UtilityType}({})},"./src/input/Captcha.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>Captcha});var react=__webpack_require__("./node_modules/react/index.js"),esm=__webpack_require__("./node_modules/react-google-recaptcha/lib/esm/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Captcha=_ref=>{let{setCaptchaResponse,error}=_ref;const[isCaptchaValid,setIsCaptchaValid]=(0,react.useState)(!0);return(0,jsx_runtime.jsxs)("div",{className:"captcha form-element",children:[(0,jsx_runtime.jsx)(esm.Z,{sitekey:"6LfibLwZAAAAALSCyZLLwPk-0hV5wmjCjE2F1MCZ",onChange:value=>{setIsCaptchaValid(!1),null!==value&&(setIsCaptchaValid(!0),setCaptchaResponse(value))}}),(0,jsx_runtime.jsx)("p",{className:"text-danger",hidden:isCaptchaValid,children:"Please check the captcha"}),error&&""!==error?(0,jsx_runtime.jsx)("p",{className:"text-danger",children:error}):""]})};try{Captcha.displayName="Captcha",Captcha.__docgenInfo={description:"",displayName:"Captcha",props:{setCaptchaResponse:{defaultValue:null,description:"method to set captcha response token to compare with server side integration\n@param token :  a valid captcha response token",name:"setCaptchaResponse",required:!0,type:{name:"(token: string) => void"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/input/Captcha.tsx#Captcha"]={docgenInfo:Captcha.__docgenInfo,name:"Captcha",path:"src/input/Captcha.tsx#Captcha"})}catch(__react_docgen_typescript_loader_error){}},"./src/property/data/Property.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h3:()=>PropertiesEmail,vx:()=>LeasingOfficeType});let LeasingOfficeType=function(LeasingOfficeType){return LeasingOfficeType.OFF_SITE="OFF_SITE",LeasingOfficeType.ON_SITE="ON_SITE",LeasingOfficeType}({});const PropertiesEmail={"Covenanter Hill":"covenanterhill@renaissancerentals.com",HighGrove:"meadowcreek@renaissancerentals.com","Huntington Gardens":"covenanterhill@renaissancerentals.com","Scholar's Quad":"quad@renaissancerentals.com","Scholar's Rock":"scholars@renaissancerentals.com","Scholar's Rooftop":"scholars@renaissancerentals.com","SummerHouse at Indiana":"summerhouse@renaissancerentals.com","Townhomes At MeadowCreek":"meadowcreek@renaissancerentals.com","Verona Park":"veronapark@renaissancerentals.com",Other:"inquiries@renaissancerentals.com"}},"./src/service/Api.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>RENAISSANCE_BASE_URL});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const RENAISSANCE_BASE_URL="http://localhost:8084/",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})},"./src/utils/Utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Hr:()=>minumMaximum,Jx:()=>decode,K3:()=>extractIdFrom,Nb:()=>addressToGoogleMapLink,Rt:()=>rangeFrom,ZG:()=>addressToGoogleMap,fH:()=>floorplanAddressToGoogleMap,fm:()=>capitalizeFirstLetter,gq:()=>enumToString,hm:()=>youtubeUrlToEmbedUrl,iA:()=>dateToMoment,p6:()=>formatDate,tF:()=>toUSD,tQ:()=>isGoogleDriveImage,tS:()=>isZipcodeValid,un:()=>formatPhoneNumber});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__),moment__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/moment/moment.js"),moment__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__),html_entities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-entities/lib/index.js");const formatPhoneNumber=phone=>{if(!phone)return"";const match=phone.toString().match(/^(\d{3})(\d{3})(\d{4})$/);return match?"("+match[1]+")-"+match[2]+"-"+match[3]:phone},cleanAddressForGoogle=address=>address?address.replace(/apt. /gi,""):"",addressToGoogleMapLink=(address,zipcode)=>"https://maps.google.com/?q="+cleanAddressForGoogle(address)+","+zipcode,addressToGoogleMap=(address,zipcode)=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(address)+","+zipcode,floorplanAddressToGoogleMap=floorplanAddress=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(floorplanAddress.address)+", "+floorplanAddress.city+", "+floorplanAddress.state+" "+floorplanAddress.zipcode,enumToString=value=>{return value&&((object=value)&&!lodash__WEBPACK_IMPORTED_MODULE_0___default().isEmpty(object))?value.replaceAll("_"," ").toLowerCase():"";var object},capitalizeFirstLetter=value=>{if(value){let lowerCased=value.toLowerCase();return lowerCased.charAt(0).toUpperCase()+lowerCased.slice(1)}return value},toUSD=num=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(num),youtubeUrlToEmbedUrl=youtubeUrl=>"https://www.youtube.com/embed/"+youtubeUrl.split("/").pop()+"?rel=0",isGoogleDriveImage=imageUrl=>imageUrl&&imageUrl.includes("drive.google.com"),extractIdFrom=imageUrl=>{if(imageUrl){const paramString=imageUrl.split("?")[1],id=new URLSearchParams(paramString).get("id");return null===id?"":id}return""},minumMaximum=(arr,field)=>{try{const sorted=arr.filter((value=>!value.active||value.active)).sort(((a,b)=>a[field]&&b[field]?a[field]-b[field]:0));return{min:sorted[0][field],max:sorted[sorted.length-1][field]}}catch(e){return{min:0,max:0}}},rangeFrom=(arr,field)=>{if(arr&&arr.length>0){const minMax=minumMaximum(arr,field);return minMax.min===minMax.max?minMax.min.toString():minMax.min+" - "+minMax.max}return"-"},dateToMoment=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD"),decode=content=>(0,html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntity)(content),formatDate=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD").format("MMM DD, YYYY"),isZipcodeValid=zipcode=>{if(!zipcode)return!0;return/^\d{5}$/.test(zipcode)}}}]);