"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[482],{"./src/gallery/DriveGallery.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GridGallery:()=>GridGallery,SimpleGallery:()=>SimpleGallery,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DriveGallery_stories});var react=__webpack_require__("./node_modules/react/index.js"),Gallery=__webpack_require__("./src/gallery/Gallery.tsx"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),AssetService=__webpack_require__("./src/asset/service/AssetService.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DriveGallery_DriveGallery=_ref=>{let{driveId,type,initialSize,showName,propertyId}=_ref;const[isLoading,setIsLoading]=(0,react.useState)(!0),[images,setImages]=(0,react.useState)([]),[currentImages,setCurrentImages]=(0,react.useState)([]),[showButton,setShowButton]=(0,react.useState)(!0);(0,react.useEffect)((()=>{driveId?(0,AssetService.T9)(driveId).then((galleryImages=>{setImages(galleryImages),initialSize&&initialSize<galleryImages.length?setCurrentImages(galleryImages.slice(0,initialSize)):setCurrentImages(galleryImages)})).catch((()=>{console.log("Invalid driveId",driveId)})).finally((()=>{setIsLoading(!1)})):setIsLoading(!1)}),[driveId,initialSize]);return(0,jsx_runtime.jsxs)("div",{className:"drive-gallery",children:[(0,jsx_runtime.jsx)(Gallery.r,{allImages:images,images:currentImages,isLoading,type,showName,propertyId}),showButton?(0,jsx_runtime.jsx)(lib.Button,{variant:"secondary",onClick:()=>{setShowButton(!1),setCurrentImages(images)},children:"More Pictures »"}):""]})};DriveGallery_DriveGallery.defaultProps={type:"simple",showName:!0};try{DriveGallery_DriveGallery.displayName="DriveGallery",DriveGallery_DriveGallery.__docgenInfo={description:"",displayName:"DriveGallery",props:{driveId:{defaultValue:null,description:"",name:"driveId",required:!0,type:{name:"string"}},type:{defaultValue:{value:"simple"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"grid"'},{value:'"simple"'}]}},initialSize:{defaultValue:null,description:"",name:"initialSize",required:!1,type:{name:"number"}},showName:{defaultValue:{value:"true"},description:"",name:"showName",required:!1,type:{name:"boolean"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery/DriveGallery.tsx#DriveGallery"]={docgenInfo:DriveGallery_DriveGallery.__docgenInfo,name:"DriveGallery",path:"src/gallery/DriveGallery.tsx#DriveGallery"})}catch(__react_docgen_typescript_loader_error){}const DriveGallery_stories={title:"Section/Drive Gallery",component:DriveGallery_DriveGallery},Template=args=>(0,jsx_runtime.jsx)(DriveGallery_DriveGallery,{...args}),GridGallery=Template.bind({});GridGallery.args={driveId:"1zGKGw9EBbQCvLkZqK-grYp8sul5lXJqF",type:"grid",initialSize:9,propertyId:"verona-park"};const SimpleGallery=Template.bind({});SimpleGallery.args={...GridGallery.args,type:"simple"},GridGallery.parameters={...GridGallery.parameters,docs:{...GridGallery.parameters?.docs,source:{originalSource:"args => {\n  return <DriveGallery {...args} />;\n}",...GridGallery.parameters?.docs?.source}}},SimpleGallery.parameters={...SimpleGallery.parameters,docs:{...SimpleGallery.parameters?.docs,source:{originalSource:"args => {\n  return <DriveGallery {...args} />;\n}",...SimpleGallery.parameters?.docs?.source}}};const __namedExportsOrder=["GridGallery","SimpleGallery"]},"./node_modules/react-loading-skeleton/dist/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const SkeletonThemeContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({}),defaultEnableAnimation=!0;function styleOptionsToCssProperties({baseColor,highlightColor,width,height,borderRadius,circle,direction,duration,enableAnimation=defaultEnableAnimation}){const style={};return"rtl"===direction&&(style["--animation-direction"]="reverse"),"number"==typeof duration&&(style["--animation-duration"]=`${duration}s`),enableAnimation||(style["--pseudo-element-display"]="none"),"string"!=typeof width&&"number"!=typeof width||(style.width=width),"string"!=typeof height&&"number"!=typeof height||(style.height=height),"string"!=typeof borderRadius&&"number"!=typeof borderRadius||(style.borderRadius=borderRadius),circle&&(style.borderRadius="50%"),void 0!==baseColor&&(style["--base-color"]=baseColor),void 0!==highlightColor&&(style["--highlight-color"]=highlightColor),style}function Skeleton({count=1,wrapper:Wrapper,className:customClassName,containerClassName,containerTestId,circle=!1,style:styleProp,...originalPropsStyleOptions}){var _a,_b,_c;const contextStyleOptions=react__WEBPACK_IMPORTED_MODULE_0__.useContext(SkeletonThemeContext),propsStyleOptions={...originalPropsStyleOptions};for(const[key,value]of Object.entries(originalPropsStyleOptions))void 0===value&&delete propsStyleOptions[key];const styleOptions={...contextStyleOptions,...propsStyleOptions,circle},style={...styleProp,...styleOptionsToCssProperties(styleOptions)};let className="react-loading-skeleton";customClassName&&(className+=` ${customClassName}`);const inline=null!==(_a=styleOptions.inline)&&void 0!==_a&&_a,elements=[],countCeil=Math.ceil(count);for(let i=0;i<countCeil;i++){let thisStyle=style;if(countCeil>count&&i===countCeil-1){const width=null!==(_b=thisStyle.width)&&void 0!==_b?_b:"100%",fractionalPart=count%1,fractionalWidth="number"==typeof width?width*fractionalPart:`calc(${width} * ${fractionalPart})`;thisStyle={...thisStyle,width:fractionalWidth}}const skeletonSpan=react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className,style:thisStyle,key:i},"‌");inline?elements.push(skeletonSpan):elements.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{key:i},skeletonSpan,react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null)))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:containerClassName,"data-testid":containerTestId,"aria-live":"polite","aria-busy":null!==(_c=styleOptions.enableAnimation)&&void 0!==_c?_c:defaultEnableAnimation},Wrapper?elements.map(((el,i)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper,{key:i},el))):elements)}},"./src/asset/service/AssetService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T9:()=>getAssetsFrom,Vh:()=>getAssetUrl,pz:()=>assetUrlFrom});var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/Utils.ts"),_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/service/AssetApi.ts");const propertyFragment=propertyId=>propertyId?propertyId+"/":"",getAssetUrl=(imageUrl,assetGatewayId)=>(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.tQ)(imageUrl)?propertyIdToDomain(propertyFragment(assetGatewayId))+"api/asset/download/"+(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.K3)(imageUrl):imageUrl,assetUrlFrom=(id,assetGatewayId)=>propertyIdToDomain(propertyFragment(assetGatewayId))+"api/asset/download/"+id,getAssetsFrom=folderId=>_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__.ZP.get("assets/"+folderId).then((response=>response.data._embedded?response.data._embedded.assets.sort(((a,b)=>parseInt(a.name)-parseInt(b.name))):[])).catch((reason=>{console.log(reason)})),propertyIdToDomain=propertyId=>{switch(propertyId){case"verona-park":return"https://verona-park.herokuapp.com/";case"cov-affordable":case"covenanter-hill":return"https://covenanter-hill.herokuapp.com/";case"high-grove":case"meadow-creek":return"https://high-grove.herokuapp.com/";case"scholars-quad":case"huntington-gardens":return"https://scholars-quad.herokuapp.com/";case"scholars-rock":case"scholars-rooftop":return"https://scholars-rooftop.herokuapp.com/";case"sh-garages":case"summer-house":return"https://summer-house.herokuapp.com/";default:return"https://renaissancerentals.herokuapp.com/"}}},"./src/gallery/Gallery.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>Gallery_Gallery});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),AssetService=__webpack_require__("./src/asset/service/AssetService.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageCard_ImageCard=_ref=>{let{image,onClick,propertyId}=_ref;return(0,jsx_runtime.jsxs)("div",{className:"image-card",onClick,children:[(0,jsx_runtime.jsx)("img",{src:(0,AssetService.pz)(image.id,propertyId),alt:image.name}),(0,jsx_runtime.jsx)("div",{className:"image-card--footer",children:(0,jsx_runtime.jsx)("p",{children:image.name})})]})};try{ImageCard_ImageCard.displayName="ImageCard",ImageCard_ImageCard.__docgenInfo={description:"",displayName:"ImageCard",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"Asset"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery/ImageCard.tsx#ImageCard"]={docgenInfo:ImageCard_ImageCard.__docgenInfo,name:"ImageCard",path:"src/gallery/ImageCard.tsx#ImageCard"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.js");const ImageCardSkeleton=_ref=>{let{width,height}=_ref;return(0,jsx_runtime.jsx)(dist.Z,{width,height})};try{ImageCardSkeleton.displayName="ImageCardSkeleton",ImageCardSkeleton.__docgenInfo={description:"",displayName:"ImageCardSkeleton",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery/ImageCardSkeleton.tsx#ImageCardSkeleton"]={docgenInfo:ImageCardSkeleton.__docgenInfo,name:"ImageCardSkeleton",path:"src/gallery/ImageCardSkeleton.tsx#ImageCardSkeleton"})}catch(__react_docgen_typescript_loader_error){}const Gallery_Gallery=_ref=>{let{type,images,isLoading,showName,allImages,propertyId}=_ref;const[showModal,setShowModal]=(0,react.useState)(!1),[imageInFocus,setImageInFocus]=(0,react.useState)({}),[imageIndex,setImageIndex]=(0,react.useState)(-1),[sliderImageLoaded,setSliderImageLoaded]=(0,react.useState)(!1),imageClickedHandler=(image,index)=>{setShowModal(!0),setImageInFocus(image),setImageIndex(index)},modalCloseHandler=()=>{setShowModal(!1),setImageInFocus({})};return(0,jsx_runtime.jsxs)("div",{className:"div-gallery",children:[(0,jsx_runtime.jsx)(lib.Modal,{show:showModal,setShow:modalCloseHandler,children:(0,jsx_runtime.jsxs)("div",{className:"image-slider",children:[(0,jsx_runtime.jsx)("div",{className:"close",onClick:modalCloseHandler,children:(0,jsx_runtime.jsx)(lib.Icon,{name:"close",size:"large"})}),(0,jsx_runtime.jsx)("div",{className:"left",onClick:()=>{setSliderImageLoaded(!1);let currentIndex=imageIndex-1;currentIndex=allImages?currentIndex<0?allImages.length-1:currentIndex:currentIndex<0?images.length-1:currentIndex,setImageIndex(currentIndex),setImageInFocus(allImages?allImages[currentIndex]:images[currentIndex])},children:(0,jsx_runtime.jsx)(lib.Icon,{name:"arrow-left",size:"large"})}),sliderImageLoaded?"":(0,jsx_runtime.jsx)(lib.Spinner,{}),imageInFocus.id?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("img",{src:(0,AssetService.pz)(imageInFocus.id,propertyId),alt:imageInFocus.name,onLoad:()=>{setSliderImageLoaded(!0)}}),showName?(0,jsx_runtime.jsx)("p",{children:imageInFocus.name}):""]}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{}),(0,jsx_runtime.jsx)("div",{className:"right",onClick:()=>{setSliderImageLoaded(!1);let currentIndex=imageIndex+1;currentIndex=allImages?currentIndex>=allImages.length?0:currentIndex:currentIndex>=images.length?0:currentIndex,setImageIndex(currentIndex),setImageInFocus(allImages?allImages[currentIndex]:images[currentIndex])},children:(0,jsx_runtime.jsx)(lib.Icon,{name:"arrow-right",size:"large"})})]})}),"grid"===type?(0,jsx_runtime.jsx)("div",{className:"gallery--grid",children:isLoading?[...Array(20)].map(((_,i)=>(0,jsx_runtime.jsx)(ImageCardSkeleton,{width:150,height:200},i))):images.map(((image,index)=>(0,jsx_runtime.jsx)(ImageCard_ImageCard,{image,onClick:()=>imageClickedHandler(image,index),propertyId},index)))}):(0,jsx_runtime.jsx)("div",{className:"gallery",children:(0,jsx_runtime.jsx)("figure",{children:isLoading?[...Array(6)].map(((_,i)=>(0,jsx_runtime.jsx)("span",{className:"gallery--image",children:(0,jsx_runtime.jsx)(ImageCardSkeleton,{width:300,height:200})},i))):images.map(((image,index)=>(0,jsx_runtime.jsx)("img",{src:(0,AssetService.pz)(image.id,propertyId),alt:image.name,className:"gallery--image",onClick:()=>imageClickedHandler(image,index)},image.name)))})})]})};Gallery_Gallery.defaultProps={type:"simple",isLoading:!1,showName:!0};try{Gallery_Gallery.displayName="Gallery",Gallery_Gallery.__docgenInfo={description:"",displayName:"Gallery",props:{type:{defaultValue:{value:"simple"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"grid"'},{value:'"simple"'}]}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"Asset[]"}},allImages:{defaultValue:null,description:"",name:"allImages",required:!1,type:{name:"Asset[]"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},showName:{defaultValue:{value:"true"},description:"",name:"showName",required:!1,type:{name:"boolean"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery/Gallery.tsx#Gallery"]={docgenInfo:Gallery_Gallery.__docgenInfo,name:"Gallery",path:"src/gallery/Gallery.tsx#Gallery"})}catch(__react_docgen_typescript_loader_error){}},"./src/service/Api.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>RENAISSANCE_BASE_URL});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const RENAISSANCE_BASE_URL="http://localhost:8084/",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})},"./src/service/AssetApi.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{TL:()=>DEFAULT_IMAGE_URL,ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/axios/lib/axios.js");const DEFAULT_IMAGE_URL=__webpack_require__("./src/service/Api.ts").f+"img/default.png",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_1__.Z.create({baseURL:"https://verona-park.herokuapp.com/api/"})},"./src/utils/Utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Hr:()=>minumMaximum,Jx:()=>decode,K3:()=>extractIdFrom,Nb:()=>addressToGoogleMapLink,Rt:()=>rangeFrom,ZG:()=>addressToGoogleMap,fm:()=>capitalizeFirstLetter,gq:()=>enumToString,hm:()=>youtubeUrlToEmbedUrl,iA:()=>dateToMoment,p6:()=>formatDate,tF:()=>toUSD,tQ:()=>isGoogleDriveImage,tS:()=>isZipcodeValid,un:()=>formatPhoneNumber});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__),moment__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/moment/moment.js"),moment__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__),html_entities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-entities/lib/index.js");const formatPhoneNumber=phone=>{if(!phone)return"";const match=phone.toString().match(/^(\d{3})(\d{3})(\d{4})$/);return match?"("+match[1]+")-"+match[2]+"-"+match[3]:phone},cleanAddressForGoogle=address=>address?address.replace(/apt. /gi,""):"",addressToGoogleMapLink=(address,zipcode)=>"https://maps.google.com/?q="+cleanAddressForGoogle(address)+","+zipcode,addressToGoogleMap=(address,zipcode)=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(address)+","+zipcode,enumToString=value=>{return value&&((object=value)&&!lodash__WEBPACK_IMPORTED_MODULE_0___default().isEmpty(object))?value.replaceAll("_"," ").toLowerCase():"";var object},capitalizeFirstLetter=value=>{if(value){let lowerCased=value.toLowerCase();return lowerCased.charAt(0).toUpperCase()+lowerCased.slice(1)}return value},toUSD=num=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(num),youtubeUrlToEmbedUrl=youtubeUrl=>"https://www.youtube.com/embed/"+youtubeUrl.split("/").pop(),isGoogleDriveImage=imageUrl=>imageUrl&&imageUrl.includes("drive.google.com"),extractIdFrom=imageUrl=>{if(imageUrl){const paramString=imageUrl.split("?")[1],id=new URLSearchParams(paramString).get("id");return null===id?"":id}return""},minumMaximum=(arr,field)=>{try{const sorted=arr.filter((value=>!value.active||value.active)).sort(((a,b)=>a[field]&&b[field]?a[field]-b[field]:0));return{min:sorted[0][field],max:sorted[sorted.length-1][field]}}catch(e){return{min:0,max:0}}},rangeFrom=(arr,field)=>{if(arr&&arr.length>0){const minMax=minumMaximum(arr,field);return minMax.min===minMax.max?minMax.min.toString():minMax.min+" - "+minMax.max}return"-"},dateToMoment=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD"),decode=content=>(0,html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntity)(content),formatDate=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD").format("MMM DD, YYYY"),isZipcodeValid=zipcode=>{if(!zipcode)return!0;return/^\d{5}$/.test(zipcode)}}}]);