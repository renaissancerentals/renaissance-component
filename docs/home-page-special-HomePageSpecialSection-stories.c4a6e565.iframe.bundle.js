"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[6974],{"./src/home-page-special/HomePageSpecialSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>HomePageSpecialSection_stories});var react=__webpack_require__("./node_modules/react/index.js"),RoundRobin=(__webpack_require__("./src/home-page-special/assets/HomePageSpecialModal.scss"),__webpack_require__("./src/service/RoundRobin.ts"));const getHomeHomePageSpecials=async propertyId=>await(async()=>{let response=await(0,RoundRobin.U)("homePageSpecials/filter");return await response.data})().then((data=>((homePageSpecials,propertyId)=>homePageSpecials.filter((homePageSpecial=>homePageSpecial.properties.includes(propertyId))))(data.map((homePageSpecialData=>(homePageSpecialData=>({...homePageSpecialData,properties:homePageSpecialData.properties?homePageSpecialData.properties.split(","):[]}))(homePageSpecialData))).sort(((a,b)=>a.startDate<b.startDate?-1:a.startDate>b.startDate?1:0)),propertyId)));var home_page_special_HomePageSpecialModal=__webpack_require__("./src/home-page-special/HomePageSpecialModal.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const HomePageSpecialSection=_ref=>{let{propertyId}=_ref;const[homePageSpecials,setHomePageSpecials]=(0,react.useState)([]);return(0,react.useEffect)((()=>{getHomeHomePageSpecials(propertyId).then((data=>{setHomePageSpecials(data)}))}),[propertyId]),(0,jsx_runtime.jsx)("section",{className:"section-home-page-specials",children:(0,jsx_runtime.jsx)(home_page_special_HomePageSpecialModal.t,{homePageSpecials,propertyId})})};try{HomePageSpecialSection.displayName="HomePageSpecialSection",HomePageSpecialSection.__docgenInfo={description:"",displayName:"HomePageSpecialSection",props:{propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"enum",value:[{value:'"cov-affordable"'},{value:'"covenanter-hill"'},{value:'"high-grove"'},{value:'"huntington-gardens"'},{value:'"sh-garages"'},{value:'"scholars-quad"'},{value:'"scholars-rock"'},{value:'"scholars-rooftop"'},{value:'"summer-house"'},{value:'"summer-house-short-term"'},{value:'"verona-park"'},{value:'"renaissance-rentals"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/home-page-special/HomePageSpecialSection.tsx#HomePageSpecialSection"]={docgenInfo:HomePageSpecialSection.__docgenInfo,name:"HomePageSpecialSection",path:"src/home-page-special/HomePageSpecialSection.tsx#HomePageSpecialSection"})}catch(__react_docgen_typescript_loader_error){}const HomePageSpecialSection_stories={component:HomePageSpecialSection,title:"Section/Home Page Special",render:args=>(0,jsx_runtime.jsx)(HomePageSpecialSection,{...args})},Default={args:{propertyId:"renaissance-rentals"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    propertyId: "renaissance-rentals"\n  }\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/home-page-special/assets/HomePageSpecialModal.scss":()=>{},"./src/asset/service/AssetService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T9:()=>getAssetsFrom,Vh:()=>getAssetUrl,pz:()=>assetUrlFrom});var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/Utils.ts"),_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/service/AssetApi.ts");const getAssetUrl=(imageUrl,assetGatewayId)=>(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.tQ)(imageUrl)?propertyIdToDomain(assetGatewayId)+"api/asset/download/"+(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.K3)(imageUrl):imageUrl,assetUrlFrom=(id,assetGatewayId)=>{return propertyIdToDomain((propertyId=assetGatewayId)?propertyId+"/":"")+"api/asset/download/"+id;var propertyId},getAssetsFrom=folderId=>_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__.ZP.get("assets/"+folderId).then((response=>response.data._embedded?response.data._embedded.assets.sort(((a,b)=>parseInt(a.name)-parseInt(b.name))):[])).catch((reason=>{console.log(reason)})),propertyIdToDomain=propertyId=>{const assetDomains=["https://verona-park.herokuapp.com/","https://covenanter-hill.herokuapp.com/","https://high-grove.herokuapp.com/","https://scholars-quad.herokuapp.com/","https://summer-house.herokuapp.com/","https://verona-park.herokuapp.com/"],random=Math.ceil(6*Math.random())-1;return random<0||random>assetDomains.length-1?assetDomains[0]:assetDomains[random]}},"./src/home-page-special/HomePageSpecialCard.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>HomePageSpecialCard_HomePageSpecialCard});__webpack_require__("./node_modules/react/index.js");var AssetService=__webpack_require__("./src/asset/service/AssetService.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const HomePageSpecialCard_HomePageSpecialCard=_ref=>{let{homePageSpecial,propertyId}=_ref;return(0,jsx_runtime.jsxs)("section",{className:"special-card",children:[(0,jsx_runtime.jsx)("h2",{children:homePageSpecial.title}),(0,jsx_runtime.jsxs)("div",{className:"special-card-body",children:[(0,jsx_runtime.jsxs)("div",{className:"body-left",children:[(0,jsx_runtime.jsx)("p",{children:homePageSpecial.description}),(0,jsx_runtime.jsxs)("ul",{children:[homePageSpecial.information1?(0,jsx_runtime.jsx)("li",{children:homePageSpecial.information1}):"",homePageSpecial.information2?(0,jsx_runtime.jsx)("li",{children:homePageSpecial.information2}):"",homePageSpecial.information3?(0,jsx_runtime.jsx)("li",{children:homePageSpecial.information3}):""]})]}),(0,jsx_runtime.jsx)("div",{className:"body-right",children:(0,jsx_runtime.jsx)("img",{src:(0,AssetService.Vh)(homePageSpecial.image,propertyId),alt:"special image"})})]})]})};try{HomePageSpecialCard_HomePageSpecialCard.displayName="HomePageSpecialCard",HomePageSpecialCard_HomePageSpecialCard.__docgenInfo={description:"",displayName:"HomePageSpecialCard",props:{homePageSpecial:{defaultValue:null,description:"",name:"homePageSpecial",required:!0,type:{name:"HomePageSpecial"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"enum",value:[{value:'"cov-affordable"'},{value:'"covenanter-hill"'},{value:'"high-grove"'},{value:'"huntington-gardens"'},{value:'"sh-garages"'},{value:'"scholars-quad"'},{value:'"scholars-rock"'},{value:'"scholars-rooftop"'},{value:'"summer-house"'},{value:'"summer-house-short-term"'},{value:'"verona-park"'},{value:'"renaissance-rentals"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/home-page-special/HomePageSpecialCard.tsx#HomePageSpecialCard"]={docgenInfo:HomePageSpecialCard_HomePageSpecialCard.__docgenInfo,name:"HomePageSpecialCard",path:"src/home-page-special/HomePageSpecialCard.tsx#HomePageSpecialCard"})}catch(__react_docgen_typescript_loader_error){}},"./src/home-page-special/HomePageSpecialModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>HomePageSpecialModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),_HomePageSpecialCard__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/home-page-special/assets/HomePageSpecialModal.scss"),__webpack_require__("./src/home-page-special/HomePageSpecialCard.tsx")),react_cookie__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-cookie/esm/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const HomePageSpecialModal=_ref=>{let{homePageSpecials,propertyId}=_ref;const[translate,setTranslate]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),[currentIndex,setCurrentIndex]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),[cookies,setCookie]=(0,react_cookie__WEBPACK_IMPORTED_MODULE_5__.fP)(["renaissanceSpecialModalClosed"]),[showModal,setShowModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),modalCloseHandler=()=>{setShowModal(!1);setCookie("renaissanceSpecialModalClosed",!0,{path:"/",maxAge:432e3})};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{homePageSpecials.length>0&&cookies.renaissanceSpecialModalClosed&&setShowModal(!1)}),[cookies.renaissanceSpecialModalClosed]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"home-page-special-modal",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Modal,{show:showModal,setShow:modalCloseHandler,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"close",onClick:modalCloseHandler,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Button,{variant:"transparent",onClick:modalCloseHandler,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"close",size:"medium",weight:2})})}),homePageSpecials.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"left",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Button,{variant:"transparent",onClick:()=>{0===currentIndex?(setTranslate(100*-(homePageSpecials.length-1)),setCurrentIndex(homePageSpecials.length-1)):(setTranslate(translate+100),setCurrentIndex(currentIndex-1))},disabled:0===currentIndex,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"arrow-left",size:"medium",weight:2})})}):"",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"slider",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"slider-container",style:{width:"".concat(100*homePageSpecials.length,"%")},children:homePageSpecials.map(((homePageSpecial,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"slider-item",style:{transform:"translateX(".concat(translate,"%)")},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_HomePageSpecialCard__WEBPACK_IMPORTED_MODULE_3__.J,{homePageSpecial,propertyId})},"slider-item"+index)))})}),homePageSpecials.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"right",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Button,{variant:"transparent",onClick:()=>{currentIndex===homePageSpecials.length-1?(setCurrentIndex(0),setTranslate(0)):(setTranslate(translate-100),setCurrentIndex(currentIndex+1))},disabled:currentIndex===homePageSpecials.length-1,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"arrow-right",size:"medium",weight:2})})}):""]})})};try{HomePageSpecialModal.displayName="HomePageSpecialModal",HomePageSpecialModal.__docgenInfo={description:"",displayName:"HomePageSpecialModal",props:{homePageSpecials:{defaultValue:null,description:"",name:"homePageSpecials",required:!0,type:{name:"HomePageSpecial[]"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"enum",value:[{value:'"cov-affordable"'},{value:'"covenanter-hill"'},{value:'"high-grove"'},{value:'"huntington-gardens"'},{value:'"sh-garages"'},{value:'"scholars-quad"'},{value:'"scholars-rock"'},{value:'"scholars-rooftop"'},{value:'"summer-house"'},{value:'"summer-house-short-term"'},{value:'"verona-park"'},{value:'"renaissance-rentals"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/home-page-special/HomePageSpecialModal.tsx#HomePageSpecialModal"]={docgenInfo:HomePageSpecialModal.__docgenInfo,name:"HomePageSpecialModal",path:"src/home-page-special/HomePageSpecialModal.tsx#HomePageSpecialModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/service/Api.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>RENAISSANCE_BASE_URL});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const RENAISSANCE_BASE_URL="http://localhost:8084/",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})},"./src/service/AssetApi.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{TL:()=>DEFAULT_IMAGE_URL,ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/axios/lib/axios.js");const DEFAULT_IMAGE_URL=__webpack_require__("./src/service/Api.ts").f+"img/default.png",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_1__.Z.create({baseURL:"https://verona-park.herokuapp.com/api/"})},"./src/service/RoundRobin.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>get});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const REACT_APP_DATA_BASE_URLS="https://scholars-rooftop.herokuapp.com/,https://renaissancerentals.herokuapp.com/".split(",");let currentIndex=0;const get=url=>axios__WEBPACK_IMPORTED_MODULE_0__.Z.get((currentIndex=currentIndex>=REACT_APP_DATA_BASE_URLS.length-1?0:currentIndex+1,REACT_APP_DATA_BASE_URLS[currentIndex]+"api/data/"+url))},"./src/utils/Utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G_:()=>momentToDate,Jx:()=>decode,K3:()=>extractIdFrom,Nb:()=>addressToGoogleMapLink,Rt:()=>rangeFrom,ZG:()=>addressToGoogleMap,fH:()=>floorplanAddressToGoogleMap,fm:()=>capitalizeFirstLetter,gq:()=>enumToString,hm:()=>youtubeUrlToEmbedUrl,iA:()=>dateToMoment,mh:()=>minimumMaximum,p6:()=>formatDate,tF:()=>toUSD,tQ:()=>isGoogleDriveImage,tS:()=>isZipcodeValid,un:()=>formatPhoneNumber});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__),moment__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/moment/moment.js"),moment__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__),html_entities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-entities/lib/index.js");const formatPhoneNumber=phone=>{if(!phone)return"";const match=phone.toString().match(/^(\d{3})(\d{3})(\d{4})$/);return match?"("+match[1]+")-"+match[2]+"-"+match[3]:phone},cleanAddressForGoogle=address=>address?address.replace(/apt. /gi,""):"",addressToGoogleMapLink=(address,zipcode)=>"https://maps.google.com/?q="+cleanAddressForGoogle(address)+","+zipcode,addressToGoogleMap=(address,zipcode)=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(address)+","+zipcode,floorplanAddressToGoogleMap=floorplanAddress=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(floorplanAddress.address)+", "+floorplanAddress.city+", "+floorplanAddress.state+" "+floorplanAddress.zipcode,enumToString=value=>{return value&&((object=value)&&!lodash__WEBPACK_IMPORTED_MODULE_0___default().isEmpty(object))?value.replaceAll("_"," ").toLowerCase():"";var object},capitalizeFirstLetter=value=>{if(value){let lowerCased=value.toLowerCase();return lowerCased.charAt(0).toUpperCase()+lowerCased.slice(1)}return value},toUSD=num=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}).format(num),youtubeUrlToEmbedUrl=youtubeUrl=>"https://www.youtube.com/embed/"+youtubeUrl.split("/").pop()+"?rel=0",isGoogleDriveImage=imageUrl=>imageUrl&&imageUrl.includes("drive.google.com"),extractIdFrom=imageUrl=>{if(imageUrl){const paramString=imageUrl.split("?")[1],id=new URLSearchParams(paramString).get("id");return null===id?"":id}return""},minimumMaximum=(arr,field)=>{try{const sorted=arr.filter((value=>!value.active||value.active)).sort(((a,b)=>a[field]&&b[field]?a[field]-b[field]:0));return{min:sorted[0][field],max:sorted[sorted.length-1][field]}}catch(e){return{min:0,max:0}}},rangeFrom=(arr,field)=>{if(arr&&arr.length>0){const minMax=minimumMaximum(arr,field);return minMax.min===minMax.max?minMax.min.toString():minMax.min+" - "+minMax.max}return"-"},dateToMoment=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD"),momentToDate=date=>date.format("YYYY-MM-DD"),decode=content=>(0,html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntity)(content),formatDate=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD").format("MMM DD, YYYY"),isZipcodeValid=zipcode=>{if(!zipcode)return!0;return/^\d{5}$/.test(zipcode)}}}]);